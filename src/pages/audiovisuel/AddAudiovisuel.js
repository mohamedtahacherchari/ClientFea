import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux'
import * as yup from "yup";
import { addAudiovisuelApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";
import {useSelector} from 'react-redux'
import Button from '@mui/material/Button';
import axios from 'axios'
import {fetchAllUsers, dispatchGetAllUsers,updateUserAccountLocked} from '../../redux/actions/usersAction'
import { FormControl, FormLabel, TextField, CircularProgress } from '@mui/material';
import ClientDropdown from "./ClientDropdown ";

//schema to validate info inputs 
const schema = yup.object({
  title: yup.string().required("Can't Be Empty"),
  //start: yup.date().required("Please specify the time to start"),
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),
 // imageUrl: yup.string().url("Veuillez entrer une URL valide pour l'image"),
  //pdfUrl: yup.string().url("Veuillez entrer une URL valide pour le PDF"),
  //googleDriveVideoUrl: yup.string().url("Veuillez entrer une URL valide pour la vidéo Google Drive")
}).required();



const AddAudiovisuel = ({addAudiovisuelApi, error}) => {
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
     const navigate = useNavigate()
     const [rerender, setRerender] = useState(false);
     const [dbError, setError] = useState(false)
     const [selectedClients, setSelectedClients] = useState([]);
     const [firstRender, setFirstRender] = useState(true)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

     useEffect( ()=>{
      if(error && !firstRender){
        setError(error)
        
      }
        if(!error.start && !error.end && dbError !== false){
          setTimeout(navigate("/inv")) 
        }
     }, [rerender])
    //using form-hook to register info data
    const { register,setValue,getValues , handleSubmit, formState: {errors}, control } = useForm({
      resolver: yupResolver(schema)
    });
   
    /* const onSubmit = async(values)=>{
      setFirstRender(false)
      console.log(values ,"hello hello hello")
        addAudiovisuelApi(values,token)
        .then(()=>{
        setRerender(!rerender)
    
        })
        
       }*/
      console.log(selectedClients,"les clients séléctionnés")
      /*  const onSubmit = async (values) => {
          const selectedClientIds = getValues("selectedClients"); // Retrieve selectedClients from form values
          addAudiovisuelApi({ ...values, selectedClients: selectedClientIds }, token)
            .then(() => {
              // Handle success
              navigate("/");
            })
            .catch((error) => {
              // Handle error
              console.error("Error:", error);
            });
        };*/

        const onSubmit = async (data) => {
          data.selectedClients = selectedClients; // Ensure selectedClients is part of the data object
          try {
            const result = await addAudiovisuelApi(data, token);
        
            if (result === "success") {
              navigate("/inv/MyComponentReplay3");
            } else {
              setError(true);
              console.error("Failed to add event.");
            }
          } catch (err) {
            setError(true);
            console.error("Failed to add event:", err);
          }
        };

   
       useEffect(() => {
      
        fetchAllUsers(token).then(res =>{
            dispatch(dispatchGetAllUsers(res))
        })
    
},[token])
 
    const uploadFileHandler = async (audiovisuel, fileType) => {
      const file = audiovisuel.target.files[0];
      const formData = new FormData();
      formData.append(fileType, file);
      setUploading(true);
  
      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          };
  
          const { data } = await axios.post('/api/upload', formData, config);
          switch (fileType) {
              case 'image':
                  setValue("imageUrl", `\\uploads/${data.imageUrl}`); // Modifiez l'URL de l'image pour commencer par '\uploads'
                  break;
              case 'pdf':
                  setValue("pdfUrl", `\\uploads/${data.pdfUrl}`); // Modifiez l'URL du PDF pour commencer par '\uploads'
                  break;
              case 'video':
                  setValue("googleDriveVideoUrl", `\\uploads/${data.googleDriveVideoUrl}`); // Modifiez l'URL de la vidéo pour commencer par '\uploads'
                  break;
                  case 'video2':
                    setValue("googleDriveVideoUrl2", `\\uploads/${data.googleDriveVideoUrl2}`); // Modifiez l'URL de la vidéo pour commencer par '\uploads'
                    break;
              default:
                  break;
          }
          setUploading(false);
      } catch (error) {
          console.error(error);
          setUploading(false);
      }
  };
  
  return (
    //this form is in bootstrab
    
    <form onSubmit={handleSubmit(onSubmit)} className=" align-content-center m-5">
    <div className="mb-4">
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
      <label htmlFor="title" className="form-label">Déscription de l'équipe </label>
      <textarea {...register("title")}  type="text" placeholder="title" className="form-control" id="title" aria-describedby="title" />
      <p className={`error text-warning position-absolute ${errors.title?"active":""}`}>{errors.title?<i className="bi bi-info-circle me-2"></i>:""}{errors.title?.message}</p>
    </div>
   { /*<div className="mb-4">
      <label htmlFor="type5" className="form-label">
      Activation<span className="text-danger small">(optional)</span>
      </label>
      <input {...register("type")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>*/}

    <ClientDropdown users= {users} selectedClients={selectedClients} 
      setSelectedClients={setSelectedClients}/>
     <div className="mb-4">
      <label htmlFor="fonction" className="form-label">
      fonction de chef d'équipe <span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("fonction")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
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
      <textarea
  {...register("describe2")}
  placeholder="Describe your info"
  className="form-control"
  id="describe"
  aria-describedby="describe"
  style={{ width: '100%', height: '150px' }} // Ajuste la largeur à 100% et donne une hauteur fixe
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
      Titre de deuxiéme chaine youtube <span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("youtubeTitre2")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>
      <div className="mb-4">
        <label htmlFor="youtubeLink2" className="form-label">Ajouter deuxiéme chaine YouTube</label>
        <input {...register("youtubeLink2")} type="text" placeholder="Lien YouTube" className="form-control" id="youtubeLink" aria-describedby="youtubeLink" />
        <p className={`error text-warning position-absolute ${errors.youtubeLink2 ? "active" : ""}`}>{errors.youtubeLink ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.youtubeLink?.message}</p>
      </div>
      {/*<div className="mb-4">
        <label htmlFor="imageUrl" className="form-label">URL de l'image</label>
        <input {...register("imageUrl")} type="text" placeholder="URL de l'image" className="form-control" id="imageUrl" aria-describedby="imageUrl" />
        <p className={`error text-warning position-absolute ${errors.imageUrl ? "active" : ""}`}>{errors.imageUrl ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.imageUrl?.message}</p>
    </div>*/}
      {/*<div className="mb-4">
        <label htmlFor="pdfUrl" className="form-label">URL du PDF</label>
        <input {...register("pdfUrl")} type="text" placeholder="URL du PDF" className="form-control" id="pdfUrl" aria-describedby="pdfUrl" />
        <p className={`error text-warning position-absolute ${errors.pdfUrl ? "active" : ""}`}>{errors.pdfUrl ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.pdfUrl?.message}</p>
    </div>*/}
      {/*<div className="mb-4">
        <label htmlFor="googleDriveVideoUrl" className="form-label">Lien de la vidéo Google Drive</label>
        <input {...register("googleDriveVideoUrl")} type="text" placeholder="Lien de la vidéo Google Drive" className="form-control" id="googleDriveVideoUrl" aria-describedby="googleDriveVideoUrl" />
        <p className={`error text-warning position-absolute ${errors.googleDriveVideoUrl ? "active" : ""}`}>{errors.googleDriveVideoUrl ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.googleDriveVideoUrl?.message}</p>
    </div>*/}


   <FormControl fullWidth>
    <FormLabel htmlFor='image'>Image</FormLabel>
    <TextField
        id='image'
        type='text'
        placeholder='Enter image url'
        value={getValues("imageUrl")} // Utilisation de getValues() pour obtenir la valeur imageUrl
        readOnly={true} // Rendre le champ en lecture seule
         {...register("imageUrl")}/>onSubmit
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


function mapStateToProps({audiovisuel, error}){
  return{
    error
    // audiovisuel
  }
}


export default connect(mapStateToProps , {addAudiovisuelApi})(AddAudiovisuel)