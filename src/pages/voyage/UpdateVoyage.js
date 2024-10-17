import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ShowVoyagesApi, updateVoyageApi,listVoyageDetails} from "../../redux/actions/voyage/voyageActions";
import { connect, useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, TextField, Button, selectClasses } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { fetchAllUsers, dispatchGetAllUsers } from '../../redux/actions/usersAction';
import fr from 'date-fns/locale/fr'; // Import French locale
import { useParams} from "react-router-dom"
import ClientDropdown from "./ClientDropdown";
import { VOYAGE_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/voyageConstant';

const useStyles = makeStyles((theme) => ({
  buttonCustom: {
    textTransform: 'capitalize' // Première lettre de chaque mot en majuscule
  }
}));

const schema = yup.object({
  title: yup.string().required("Can't Be Empty"),
 // start: yup.date().required("Please specify the time to start"),
 // end: yup.date("must be a valid date").required("on update you must specify an end date"),
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),
}).required();

const UpdateVoyage = ({ updateVoyageApi}) => {
  const{id} =useParams()
  //const event = useSelector((state) => state.event);
  const voyages = useSelector((state) => state.voyages);
  const voyageDetails = useSelector((state) => state.voyageDetails)
  const { loading, error,voyage } = voyageDetails
  console.log(voyages)
  const voyageUpdate = useSelector((state) => state.voyageUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = voyageUpdate
 // console.log(event,"looool")
  console.log(id)
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedVoyage, setSelectedVoyage] = useState(null);
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);
  const [selectedClients, setSelectedClients] = useState([]);
  const [dbError, setError] = useState(false);
  //let  event = events.find(event => event.id === id);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const refreshPage = () => {
    window.location.reload();
  }; 

  useEffect(() => {
    if (successUpdate) {

      refreshPage()
    dispatch({ type: VOYAGE_UPDATE_RESET})
  }
    if (!voyage.title ||voyage._id !== id){
      dispatch(listVoyageDetails(id));

    } 
    else{
// Initialisation des valeurs par défaut pour le formulaire
     setValue('isActive',voyage.isActive);
     setValue('title', voyage.title || "");
     setValue('fonction', voyage.fonction || "");
   //  setValue('describe', education.describe || "Aucune description fournie");
     setValue('imageUrl', voyage.imageUrl || "");
     setValue('pdfUrl', voyage.pdfUrl || "");
     setValue('pdfUrl2', voyage.pdfUrl2 || "");
     setValue('pdfUrl3', voyage.pdfUrl3 || "");
     setValue('youtubeLink', voyage.youtubeLink || "");
     setValue('selectedClients', voyage.selectedClients || []);
     setSelectedClients(voyage.selectedClients || []);

    }

  }, [dispatch, id,voyage,setValue,listVoyageDetails])

   


  useEffect(() => {
    // Mettre à jour les cases à cocher avec les utilisateurs déjà sélectionnés
    setSelectedClients(voyage.selectedClients || []);
  }, [setSelectedClients]);



  const onSubmit2 = async (data) => {
    data.selectedClients = getValues('selectedClients'); // Synchronisez avec useForm
    data.selectedClients = selectedClients;
    try {
      // Utilisez dispatch pour appeler l'action updateAudiovisuelApi
    await  dispatch(updateVoyageApi(data, id, token));
     
    navigate("/inv/MyComponentReplay12")
    } catch (err) {
      setError(true);
      console.error("Failed to update Investissement:", err);
    }
  };
  const onSubmit = async (data) => {
    data.selectedClients = getValues('selectedClients');
    data.selectedClients = selectedClients;
    try {
      // Utilisez dispatch pour appeler l'action updateAudiovisuelApi
      await updateVoyageApi(data, id, token);
      
      // Remplacer navigate par une redirection avec window.location.href
      window.location.href = "/inv/MyComponentReplay12";
    } catch (err) {
      setError(true);
      console.error("Failed to update voyage:", err);
    }
};

  useEffect(() => {
    fetchAllUsers(token).then(res => {
      dispatch(dispatchGetAllUsers(res));
    });
  }, [token]);


  const uploadFileHandler = async (audiovisuel, fileType) => {
    const file = audiovisuel.target.files[0];
    const formData = new FormData();
    formData.append(fileType, file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      switch (fileType) {
        case 'image':
          setValue("imageUrl", `\\uploads/${data.imageUrl}`);
          break;
        case 'pdf':
          setValue("pdfUrl", `\\uploads/${data.pdfUrl}`);
          break;
        case 'pdf2':
          setValue("pdfUrl2", `\\uploads/${data.pdfUrl2}`);
          break;
          case 'pdf3':
            setValue("pdfUrl3", `\\uploads/${data.pdfUrl3}`);
            break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    //this form is in bootstrab
    <form onSubmit={handleSubmit(onSubmit)} className=" align-content-center m-5">
          <div className="mb-4 form-check form-switch">
  <label htmlFor="isActive" className="form-check-label">
    Activation
  </label>
  <input
    {...register("isActive")}
    type="checkbox"
    className="form-check-input"
    id="typeSwitch"
    aria-describedby="describe"
  />
</div>
    <div className="mb-4">
      <label htmlFor="title" className="form-label">Déscription de l'équipe </label>
      <textarea {...register("title")}  type="text" placeholder="title" className="form-control" id="title" aria-describedby="title" />
      <p className={`error text-warning position-absolute ${errors.title?"active":""}`}>{errors.title?<i className="bi bi-info-circle me-2"></i>:""}{errors.title?.message}</p>
    </div>
    <ClientDropdown users= {users} selectedClients={selectedClients} 
      setSelectedClients={setSelectedClients}/>
           <div className="mb-4">
      <label htmlFor="fonction" className="form-label">
      fonction de chef d'équipe <span className="text-danger small">(optional)</span>
      </label>
      <input {...register("fonction")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>
  
  
 
   <FormControl fullWidth>
    <FormLabel htmlFor='image'>Image</FormLabel>
    <TextField
        id='image'
        type='text'
        placeholder='Enter image url'
        value={getValues("imageUrl")} // Utilisation de getValues() pour obtenir la valeur imageUrl
        readOnly={true} // Rendre le champ en lecture seule
         {...register("imageUrl")}/>
    <input
        accept='image/*' // Spécifiez le type de fichier accepté comme image
        id='image-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'image')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='image-file'>
        <Button variant='contained' component='span'>
            Choisissez Image
        </Button>
    </label>
</FormControl>

<FormControl fullWidth>
    <FormLabel htmlFor='pdf'>Ajouter le plan sous forme pdf</FormLabel>
    <TextField
        id='pdf'
        type='text'
        placeholder='Enter PDF url'
         value={getValues("pdfUrl")} // Utilisation de getValues() pour obtenir la valeur pdfUrl
        readOnly={true} // Rendre le champ en lecture seule
         {...register("pdfUrl")}

    />
    <input
        accept='application/pdf' // Spécifiez le type de fichier accepté comme PDF
        id='pdf-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'pdf')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='pdf-file'>
        <Button variant='contained' component='span'>
            Choisissez PDF
        </Button>
    </label>
</FormControl>

<FormControl fullWidth>
    <FormLabel htmlFor='pdf2'>Modifiez Les 12 pays que nous 
      découvrions ensemble
    </FormLabel>
    <TextField
        id='pdf2'
        type='text'
        placeholder='Enter PDF2 url'
         value={getValues("pdfUrl2")} // Utilisation de getValues() pour obtenir la valeur pdfUrl
        readOnly={true} // Rendre le champ en lecture seule
         {...register("pdfUrl2")}

    />
    <input
        accept='application/pdf' // Spécifiez le type de fichier accepté comme PDF
        id='pdf2-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'pdf2')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='pdf2-file'>
        <Button variant='contained' component='span'>
            Choisissez PDF
        </Button>
    </label>
</FormControl>


<FormControl fullWidth>
    <FormLabel htmlFor='pdf3'>
      Modifiez sites que nous recommandons 
    </FormLabel>
    <TextField
        id='pdf3'
        type='text'
        placeholder='Enter PDF3 url'
         value={getValues("pdfUrl3")} // Utilisation de getValues() pour obtenir la valeur pdfUrl
        readOnly={true} // Rendre le champ en lecture seule
         {...register("pdfUrl3")}

    />
    <input
        accept='application/pdf' // Spécifiez le type de fichier accepté comme PDF
        id='pdf3-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'pdf3')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='pdf3-file'>
        <Button variant='contained' component='span'>
            Choisissez PDF
        </Button>
    </label>
</FormControl>

<Button
  type="submit"
  //onClick={() => navigate("/MyComponentReplay4")}
  variant="contained"
  color="success"
>
  Créer
</Button>
  </form>
  )
}

const mapStateToProps = (state) => ({
  error: state.error,
});
const mapDispatchToProps = {
  ShowVoyagesApi,
  updateVoyageApi
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateVoyage);
