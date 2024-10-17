import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ShowAudiovisuelsApi, updateAudiovisuelApi,listAudiovisuelDetails} from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { connect, useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, TextField, Button, selectClasses } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { fetchAllUsers, dispatchGetAllUsers } from '../../redux/actions/usersAction';
import fr from 'date-fns/locale/fr'; // Import French locale
import { useParams} from "react-router-dom"
import ClientDropdown from "./ClientDropdown ";
import { AUDIOVISUEL_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/audiovisuelConstant';

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

const UpdateAudiovisuel = ({ updateAudiovisuelApi}) => {
  const{id} =useParams()
  //const event = useSelector((state) => state.event);
  const audiovisuels = useSelector((state) => state.audiovisuels);
  const audiovisuelDetails = useSelector((state) => state.audiovisuelDetails)
  const { loading, error,audiovisuel } = audiovisuelDetails
  console.log(audiovisuels)
  const audiovisuelUpdate = useSelector((state) => state.audiovisuelUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = audiovisuelUpdate
 // console.log(event,"looool")
  console.log(id)
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAudiovisuel, setSelectedAudiovisuel] = useState(null);
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
    dispatch({ type: AUDIOVISUEL_UPDATE_RESET})
  }
    if (!audiovisuel.title ||audiovisuel._id !== id){
      dispatch(listAudiovisuelDetails(id));
    } 
    else{
// Initialisation des valeurs par défaut pour le formulaire
     setValue('isActive',audiovisuel.isActive);
     setValue('title', audiovisuel.title || "");
     setValue('fonction', audiovisuel.fonction || "");
     setValue('type', audiovisuel.type || "Aucun type fourni");
     setValue('describe', audiovisuel.describe || "Aucune description fournie");
     setValue('describe2', audiovisuel.describe2 || "Aucune description fournie");
     setValue('youtubeTitre', audiovisuel.youtubeTitre || "");
     setValue('youtubeTitre2', audiovisuel.youtubeTitre2 || "");
     setValue('youtubeLink', audiovisuel.youtubeLink || "");
     setValue('youtubeLink2', audiovisuel.youtubeLink2 || "");
     setValue('imageUrl', audiovisuel.imageUrl || "");
     setValue('pdfUrl', audiovisuel.pdfUrl || "");
     setValue('googleDriveVideoUrl', audiovisuel.googleDriveVideoUrl || "");
     setValue('googleDriveVideoUrl2', audiovisuel.googleDriveVideoUrl2 || "");
     setValue('selectedClients', audiovisuel.selectedClients || []);
     setSelectedClients(audiovisuel.selectedClients || []);
    }
  }, [dispatch, id,audiovisuel,setValue,listAudiovisuelDetails])

   


  useEffect(() => {
    // Mettre à jour les cases à cocher avec les utilisateurs déjà sélectionnés
    setSelectedClients(audiovisuel.selectedClients || []);
  }, [setSelectedClients]);



  const onSubmit = async (data) => {
    data.selectedClients = getValues('selectedClients'); // Synchronisez avec useForm
    data.selectedClients = selectedClients;
    try {
      // Utilisez dispatch pour appeler l'action updateAudiovisuelApi
      dispatch(updateAudiovisuelApi(data, id, token));
     
        navigate("/inv/MyComponentReplay3");
        
    } catch (err) {
      setError(true);
      console.error("Failed to update Audiovisuel:", err);
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
    <div className="mb-4">
      <label htmlFor="type" className="form-label">
      Déscription de plan<span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("type")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>
    <div className="mb-4">
      <label htmlFor="describe" className="form-label">
        Description de montage vidéo <span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("describe")}  type="text" placeholder="describe your info" className="form-control" id="describe" aria-describedby="describe" />
    </div>
    <div className="mb-4">
      <label htmlFor="describe2" className="form-label">
        Description de partenaires <span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("describe2")} 
       type="text" placeholder="describe your info" 
       className="form-control" id="describe" aria-describedby="describe"
       
       />
    </div>
    <div className="mb-4">
      <label htmlFor="youtubeTitre" className="form-label">
      Titre de premiére chaine youtube<span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("youtubeTitre")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>
   <div className="mb-4">
        <label htmlFor="youtubeLink" className="form-label">Ajouter chaine YouTube</label>
        <input {...register("youtubeLink")} type="text" placeholder="Lien YouTube" className="form-control" id="youtubeLink" aria-describedby="youtubeLink" />
        <p className={`error text-warning position-absolute ${errors.youtubeLink ? "active" : ""}`}>{errors.youtubeLink ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.youtubeLink?.message}</p>
      </div>
      <div className="mb-4">
      <label htmlFor="youtubeTitre2" className="form-label">
      Titre de deuxiéme chaine youtube<span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("youtubeTitre2")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>
      <div className="mb-4">
        <label htmlFor="youtubeLink2" className="form-label">Ajouter deuxiéme chaine YouTube</label>
        <input {...register("youtubeLink2")} type="text" placeholder="Lien YouTube" className="form-control" id="youtubeLink" aria-describedby="youtubeLink" />
        <p className={`error text-warning position-absolute ${errors.youtubeLink2 ? "active" : ""}`}>{errors.youtubeLink ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.youtubeLink?.message}</p>
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
    <FormLabel htmlFor='video'>Ajouter un vidéo</FormLabel>
    <TextField
        id='video'
        type='text'
        placeholder='Enter video url'
        value={getValues("googleDriveVideoUrl")} // Utilisation de getValues() pour obtenir la valeur googleDriveVideoUrl
        readOnly={true} // Rendre le champ en lecture seule
       {...register("googleDriveVideoUrl")}/>
    <input
        accept='video/*' // Spécifiez le type de fichier accepté comme vidéo
        id='video-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'video')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='video-file'>
        <Button variant='contained' component='span'>
            Choisissez Video
        </Button>
    </label>
    
</FormControl>
<FormControl fullWidth>
    <FormLabel htmlFor='video2'>Ajouter un deuxiéme vidéo</FormLabel>
    <TextField
        id='video2'
        type='text'
        placeholder='Enter video url'
        value={getValues("googleDriveVideoUrl2")} // Utilisation de getValues() pour obtenir la valeur googleDriveVideoUrl
        readOnly={true} // Rendre le champ en lecture seule
       {...register("googleDriveVideoUrl2")}/>
    <input
        accept='video/*' // Spécifiez le type de fichier accepté comme vidéo
        id='video-file2'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'video2')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='video-file2'>
        <Button variant='contained' component='span'>
            Choisissez Video
        </Button>
    </label>
    
</FormControl>

    <Button type="submit" variant="contained" color="success"
  
    >Créer</Button>
  </form>
  )
}

const mapStateToProps = (state) => ({
  error: state.error,
});
const mapDispatchToProps = {
  ShowAudiovisuelsApi,
  updateAudiovisuelApi
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateAudiovisuel);
