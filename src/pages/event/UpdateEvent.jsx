import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ShowEventsApi, updateEventApi,listEventDetails} from "../../redux/actions/event/eventsActions";
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
import { EVENT_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/eventConstant';

const useStyles = makeStyles((theme) => ({
  buttonCustom: {
    textTransform: 'capitalize' // Première lettre de chaque mot en majuscule
  }
}));

const schema = yup.object({
  title: yup.string().required("Can't Be Empty"),
  start: yup.date().required("Please specify the time to start"),
  end: yup.date("must be a valid date").required("on update you must specify an end date"),
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),
}).required();

const UpdateEvent = ({ updateEventApi}) => {
  const{id} =useParams()
  //const event = useSelector((state) => state.event);
  const events = useSelector((state) => state.events);
  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event } = eventDetails
  console.log(events)
  const eventUpdate = useSelector((state) => state.eventUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eventUpdate
 // console.log(event,"looool")
  console.log(id)
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
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
    dispatch({ type: EVENT_UPDATE_RESET})
  }
    if (!event.title ||event._id !== id){
      dispatch(listEventDetails(id));
    } 
    else{
// Initialisation des valeurs par défaut pour le formulaire
     setValue('title', event.title || "");
     setValue('start', event.start ? new Date(event.start) : null);
     setValue('end', event.end ? new Date(event.end) : null);
     setValue('type', event.type || "Aucun type fourni");
     setValue('describe', event.describe || "Aucune description fournie");
     setValue('youtubeLink', event.youtubeLink || "");
     setValue('imageUrl', event.imageUrl || "");
     setValue('pdfUrl', event.pdfUrl || "");
     setValue('googleDriveVideoUrl', event.googleDriveVideoUrl || "");
     setValue('selectedClients', event.selectedClients || []);
    }
  }, [dispatch, id,event,setValue,listEventDetails])

   


  useEffect(() => {
    // Mettre à jour les cases à cocher avec les utilisateurs déjà sélectionnés
    setSelectedClients(event.selectedClients || []);
  }, [event.selectedClients,setSelectedClients]);

  const onSubmit = async (data) => {
    data.selectedClients = selectedClients; // **Modification 3: Pour assurer la mise à jour de selectedClients**
    try {
      const response = await updateEventApi(data, id, token);
      // **Modification 4: Ajout de la Gestion des Erreurs pour les Appels API**
      // Vérifie la réponse de l'API et navigue vers une autre page si l'opération est réussie.
      if (response === "response was successful") {
        navigate("/inv/MyComponentReplay");
      }
    } catch (err) {
      setError(true);
      console.error("Failed to update event:", err);
    }
  };
  

  useEffect(() => {
    fetchAllUsers(token).then(res => {
      dispatch(dispatchGetAllUsers(res));
    });
  }, [token]);


  const uploadFileHandler = async (event, fileType) => {
    const file = event.target.files[0];
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
    <div className="mb-4">
      <label htmlFor="title" className="form-label">Titre de l'évènement</label>
      <input {...register("title")}   type="text" placeholder="title" className="form-control" id="title" aria-describedby="title" />
      <p className={`error text-warning position-absolute ${errors.title?"active":""}`}>{errors.title?<i className="bi bi-info-circle me-2"></i>:""}{errors.title?.message}</p>
    </div>
    <div className="mb-4" style={{zIndex: "100"}}>
      <label htmlFor="start" className="form-label">Date de début</label>
      {/* controllers are the way you can wrap and use datePicker inside react form-hook*/}
      {/* start date controller*/}
      <Controller
  control={control}
  name="start"
  render={({ field }) => (
    <DatePicker
      locale="fr"
      placeholderText="Sélectionnez la date"
      onChange={(date) => field.onChange(date)}
      selected={field.value || null} // S'assurer que c'est null si non défini
      showTimeSelect
      timeFormat="HH:mm"
      dateFormat="d MMMM, yyyy h:mm aa"
      className="form-control"
      id="start"
    />
  )}

    />
    {/* error handling */}
    <p className={`error text-warning position-absolute ${errors.start?"active":""}`}>{errors.start?<i className=" bi bi-info-circle me-2"></i>:""}{errors.start?.message}</p>
    <p className={`error text-warning position-absolute ${dbError.start?"":"d-none"}`}>{dbError.start?<i className=" bi bi-info-circle me-2"></i>:""}{dbError.start}</p>
    </div>
    <div className="mb-4" style={{zIndex: "100"}}>
      <label htmlFor="end" className="form-label">Date de fin</label>
      {/* end date controller*/}
      <Controller
  control={control}
  name="end"
  render={({ field }) => (
    <DatePicker
      locale="fr"
      placeholderText="Sélectionnez la date de fin"
      onChange={(date) => field.onChange(date)}
      selected={field.value || null} // S'assurer que c'est null si non défini
      timeFormat="HH:mm"
      dateFormat="d MMMM, yyyy h:mm aa"
      showTimeSelect
      className="form-control"
      id="end"
    />
  )}
/>
   <br/>
  {/* error handling */}
  <h1>Choissisez les intervenants :</h1>
  <br/>
 
     <ClientDropdown users= {users} selectedClients={selectedClients} 
      setSelectedClients={setSelectedClients}/>

  <p className={`error text-warning position-absolute ${errors.end?"active":""}`}>{errors.end?<i className=" bi bi-info-circle me-2"></i>:""}{errors.end?.message}</p>
  <p className={`error text-warning position-absolute ${dbError.end?"":"d-none"}`}>{dbError.end?<i className=" bi bi-info-circle me-2"></i>:""}{dbError.end}</p>

    </div>
    <div className="mb-4">
      <label htmlFor="type" className="form-label">
        Type de l'évènement <span className="text-danger small">(optional)</span>
      </label>
      <input {...register("type")}   type="text" placeholder="Type of your event" className="form-control" id="type" aria-describedby="describe" />
    </div>
    <div className="mb-4">
      <label htmlFor="describe" className="form-label">
        Description de l'évènement <span className="text-danger small">(optional)</span>
      </label>
      <input {...register("describe")}   type="text" placeholder="describe your event" className="form-control" id="describe" aria-describedby="describe" />
    </div>
    <div className="mb-4">
        <label htmlFor="youtubeLink" className="form-label">Lien YouTube</label>
        <input {...register("youtubeLink")} type="text" placeholder="Lien YouTube" className="form-control" id="youtubeLink" aria-describedby="youtubeLink" />
        <p className={`error text-warning position-absolute ${errors.youtubeLink ? "active" : ""}`}>{errors.youtubeLink ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.youtubeLink?.message}</p>
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
           <div style={{ display: 'flex', marginTop: 8 }}>

    <input
        accept='image/*' // Spécifiez le type de fichier accepté comme image
        id='image-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'image')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='image-file'>
        <Button variant='contained' component='span'  className={classes.buttonCustom}>
        Choisissez une image
        </Button>
    </label>
    <Button variant="outlined" color="secondary" onClick={() => setValue('imageUrl', '')} className={classes.buttonCustom} style={{ marginLeft: 8 }}>
        Supprimer l'image
      </Button>
      </div>
</FormControl>
<FormControl fullWidth>
    <FormLabel htmlFor='pdf'>PDF</FormLabel>
    <TextField
        id='pdf'
        type='text'
        placeholder='Enter PDF url'
         value={getValues("pdfUrl")} // Utilisation de getValues() pour obtenir la valeur pdfUrl
        readOnly={true} // Rendre le champ en lecture seule
         {...register("pdfUrl")}/>
           <div style={{ display: 'flex', marginTop: 8 }}>

    <input
        accept='application/pdf' // Spécifiez le type de fichier accepté comme PDF
        id='pdf-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'pdf')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='pdf-file'>
        <Button variant='contained' component='span'  className={classes.buttonCustom}>
        Choisissez un pdf

        </Button>
    </label>
    <Button variant="outlined" color="secondary" onClick={() => setValue('pdfUrl', '')} className={classes.buttonCustom} style={{ marginLeft: 8 }}>
        Supprimer pdf
      </Button>
      </div>
</FormControl>
 <FormControl fullWidth>
    <FormLabel htmlFor='video'>Video</FormLabel>
    <TextField
        id='video'
        type='text'
        placeholder='Enter video url'
        value={getValues("googleDriveVideoUrl")} // Utilisation de getValues() pour obtenir la valeur googleDriveVideoUrl
        readOnly={true} // Rendre le champ en lecture seule
       {...register("googleDriveVideoUrl")}/>
         <div style={{ display: 'flex', marginTop: 8 }}>
        <input
        accept='video/*' // Spécifiez le type de fichier accepté comme vidéo
        id='video-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'video')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='video-file'>
        <Button variant='contained' component='span'  className={classes.buttonCustom}>
            Choisissez un video
        </Button>
    </label>
    <Button variant="outlined" color="secondary" onClick={() => setValue('googleDriveVideoUrl', '')} className={classes.buttonCustom} style={{ marginLeft: 8 }}>
        Supprimer la vidéo
      </Button>
    </div>
</FormControl>
      <Button type="submit" variant="contained" color="success"  className={classes.buttonCustom}> mis à jour</Button>
  </form>
  )
}

const mapStateToProps = (state) => ({
  error: state.error,
});
const mapDispatchToProps = {
  ShowEventsApi,
  updateEventApi
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent);
