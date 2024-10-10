import React, { useEffect, useState } from "react";
import {useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux'
import * as yup from "yup";
import { addPermacultureApi } from "../../redux/actions/permaculture/permacultureActions";
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
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),

}).required();



const AddPermaculture = ({addPermacultureApi, error}) => {
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
  
        /*const onSubmit = async (data) => {
          data.selectedClients = selectedClients; // Ensure selectedClients is part of the data object
          try {
            
            const result = await addInvestirApi(data, token);
            console.log(data)
            if (result === "success") {
              navigate("/MyComponentReplay7");
            } else {
              setError(true);
              console.error("Failed to add event.");
            }
          } catch (err) {
            setError(true);
            console.error("Failed to add event:", err);
          }
        };*/

        const onSubmit = async (data) => {
          console.log("Form data:", data);

          data.selectedClients = selectedClients;
          try {
            const result = await addPermacultureApi(data, token);
            console.log('API response:', result);
            if (result === "success") {
              navigate("/MyComponentReplay9");
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
 
    const uploadFileHandler = async (permaculture, fileType) => {
      const file = permaculture.target.files[0];
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
                    setValue("pdfUrl2", `\\uploads/${data.pdfUrl2}`); // Modifiez l'URL du PDF pour commencer par '\uploads'
                    break;
                  case 'video':
                    setValue("googleDriveVideoUrl", `\\uploads/${data.googleDriveVideoUrl}`); // Modifiez l'URL de la vidéo pour commencer par '\uploads'
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
      <label htmlFor="title" className="form-label">Ajouter une déscription de l'équipe </label>
      <textarea {...register("title")}  type="text" placeholder="title" className="form-control" id="title" aria-describedby="title" />
      <p className={`error text-warning position-absolute ${errors.title?"active":""}`}>{errors.title?<i className="bi bi-info-circle me-2"></i>:""}{errors.title?.message}</p>
    </div>

    <ClientDropdown users= {users} selectedClients={selectedClients} 
      setSelectedClients={setSelectedClients}/>
     <div className="mb-4">
      <label htmlFor="fonction" className="form-label">
      Ajouter la fonction de chef d'équipe <span className="text-danger small">(optional)</span>
      </label>
      <textarea {...register("fonction")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>

   <FormControl fullWidth>
    <FormLabel htmlFor='image'>Ajouter une photo de profil pour le chef d'équipe</FormLabel>
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
    <FormLabel htmlFor='pdf'>Ajouter le plan sous forme de PDF</FormLabel>
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
    <FormLabel htmlFor='pdf2'>Ajouter une capture d'écran du drive du chef d'équipe en format PDF</FormLabel>
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


function mapStateToProps({permaculture, error}){
  return{
    error
    // audiovisuel
  }
}


export default connect(mapStateToProps , {addPermacultureApi})(AddPermaculture)