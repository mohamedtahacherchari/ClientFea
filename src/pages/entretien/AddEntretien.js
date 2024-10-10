import React, { useEffect, useState } from "react";
import {useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux'
import * as yup from "yup";
import { addEntretienApi } from "../../redux/actions/entretien/entretienActions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import Button from '@mui/material/Button';
import axios from 'axios'
import {fetchAllUsers, dispatchGetAllUsers} from '../../redux/actions/usersAction'
import { FormControl, FormLabel, TextField} from '@mui/material';
import ClientDropdown from "./ClientDropdown";


const schema = yup.object({
  title: yup.string().required("Can't Be Empty"),
  //start: yup.date().required("Please specify the time to start"),
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),
 // imageUrl: yup.string().url("Veuillez entrer une URL valide pour l'image"),
  //pdfUrl: yup.string().url("Veuillez entrer une URL valide pour le PDF"),
  //googleDriveVideoUrl: yup.string().url("Veuillez entrer une URL valide pour la vidéo Google Drive")
}).required();



const AddEntretien = ({addEntretienApi, error}) => {
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
          setTimeout(navigate("/")) 
        }
     }, [rerender])
    //using form-hook to register info data
    const { register,setValue,getValues , handleSubmit, formState: {errors}, control } = useForm({
      resolver: yupResolver(schema)
    });
   
   
      console.log(selectedClients,"les clients séléctionnés")
  
        const onSubmit = async (data) => {
          data.selectedClients = selectedClients; // Ensure selectedClients is part of the data object
          try {
            const result = await addEntretienApi(data, token);
        
            if (result === "success") {
              navigate("/MyComponentReplay6");
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
 
    const uploadFileHandler = async (entretien, fileType) => {
      const file = entretien.target.files[0];
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
              case 'pdf2':
                  setValue("pdfUrl2", `\\uploads/${data.pdfUrl2}`); // Modifiez l'URL de la vidéo pour commencer par '\uploads'
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

    <ClientDropdown users= {users} selectedClients={selectedClients} 
      setSelectedClients={setSelectedClients}/>
     <div className="mb-4">
      <label htmlFor="fonction" className="form-label">
      fonction de chef d'équipe <span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("fonction")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
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
    <FormLabel htmlFor='pdf2'>Ajouter la liste des intervenants sous forme de pdf </FormLabel>
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



    <Button type="submit" variant="contained" color="success"
  
    >Créer</Button>
  </form>
  )
}


function mapStateToProps({entretien, error}){
  return{
    error
    // audiovisuel
  }
}


export default connect(mapStateToProps , {addEntretienApi})(AddEntretien)