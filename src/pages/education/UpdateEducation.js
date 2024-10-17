import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ShowEducationsApi, updateEducationApi,listEducationDetails} from "../../redux/actions/education/educationsAction";
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
import { EDUCATION_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/educationConstant';

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

const UpdateEducation = ({ updateEducationApi}) => {
  const{id} =useParams()
  //const event = useSelector((state) => state.event);
  const educations = useSelector((state) => state.educations);
  const educationDetails = useSelector((state) => state.educationDetails)
  const { loading, error,education } = educationDetails
  console.log(educations)
  const educationUpdate = useSelector((state) => state.educationUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = educationUpdate
 // console.log(event,"looool")
  console.log(id)
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedEducation, setSelectedEducation] = useState(null);
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
    dispatch({ type: EDUCATION_UPDATE_RESET})
  }
    if (!education.title ||education._id !== id){
      dispatch(listEducationDetails(id));

    } 
    else{
// Initialisation des valeurs par défaut pour le formulaire
     setValue('isActive',education.isActive);
     setValue('title', education.title || "");
     setValue('fonction', education.fonction || "");
   //  setValue('describe', education.describe || "Aucune description fournie");
     setValue('imageUrl', education.imageUrl || "");
     setValue('pdfUrl', education.pdfUrl || "");
     setValue('selectedClients', education.selectedClients || []);
     setSelectedClients(education.selectedClients || []);

    }

  }, [dispatch, id,education,setValue,listEducationDetails])

   


  useEffect(() => {
    // Mettre à jour les cases à cocher avec les utilisateurs déjà sélectionnés
    setSelectedClients(education.selectedClients || []);
  }, [setSelectedClients]);



  const onSubmit2 = async (data) => {
    data.selectedClients = getValues('selectedClients'); // Synchronisez avec useForm
    data.selectedClients = selectedClients;
    try {
      // Utilisez dispatch pour appeler l'action updateAudiovisuelApi
    await  dispatch(updateEducationApi(data, id, token));
     
    navigate("/inv/MyComponentReplay4")
    } catch (err) {
      setError(true);
      console.error("Failed to update Education:", err);
    }
  };
  const onSubmit = async (data) => {
    data.selectedClients = getValues('selectedClients');
    data.selectedClients = selectedClients;
    try {
      // Utilisez dispatch pour appeler l'action updateAudiovisuelApi
      await updateEducationApi(data, id, token);
      
      // Remplacer navigate par une redirection avec window.location.href
      window.location.href = "/inv/MyComponentReplay4";
    } catch (err) {
      setError(true);
      console.error("Failed to update Education:", err);
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
        case 'video':
          setValue("googleDriveVideoUrl", `\\uploads/${data.googleDriveVideoUrl}`);
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
  ShowEducationsApi,
  updateEducationApi
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateEducation);
