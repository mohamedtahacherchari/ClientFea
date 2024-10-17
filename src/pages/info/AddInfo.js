import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addInfoApi } from "../../redux/actions/info/infosActions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";
import {useSelector} from 'react-redux'
import Button from '@mui/material/Button';
import axios from 'axios'
import { FormControl, FormLabel, TextField, CircularProgress } from '@mui/material';
//schema to validate info inputs 
const schema = yup.object({
  title: yup.string().required("Can't Be Empty"),
  start: yup.date().required("Please specify the time to start"),
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),
 // imageUrl: yup.string().url("Veuillez entrer une URL valide pour l'image"),
  //pdfUrl: yup.string().url("Veuillez entrer une URL valide pour le PDF"),
  //googleDriveVideoUrl: yup.string().url("Veuillez entrer une URL valide pour la vidéo Google Drive")
}).required();



const AddInfo = ({addInfoApi, error}) => {
    const token = useSelector(state => state.token)
     const navigate = useNavigate()
     const [rerender, setRerender] = useState(false);
     const [dbError, setError] = useState(false)
     const [firstRender, setFirstRender] = useState(true)
    const [uploading, setUploading] = useState(false)

   
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
   
  /*   const onSubmit = async(values)=>{
      setFirstRender(false)
      console.log(values ,"hello hello hello")
        addInfoApi(values,token)
        .then(()=>{
        setRerender(!rerender)
       

        })
 
       }
*/
   
   
const onSubmit = async (data) => {
  //data.selectedClients = selectedClients; // Ensure selectedClients is part of the data object
  try {
    const result = await addInfoApi(data, token);
console.log(result)
    if (result === "success") {
      navigate("/inv/info2");
    } else {
      setError(true);
      console.error("Failed to add info .");
    }
  } catch (err) {
    setError(true);
    console.error("Failed to add info:", err);
  }
};
 
    const uploadFileHandler = async (info, fileType) => {
      const file = info.target.files[0];
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
                  case 'icone':
                    setValue("iconeUrl", `\\uploads/${data.iconeUrl}`); // Modifiez l'URL de la vidéo pour commencer par '\uploads'
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
      <label htmlFor="title" className="form-label">Titre de l'information</label>
      <input {...register("title")}  type="text" placeholder="title" className="form-control" id="title" aria-describedby="title" />
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
          locale="fr" // Set French locale for react-datepicker
          placeholderText="Select date"
          onChange={(date) => field.onChange(date)}
          selected={field.value}
          value={field.value}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="MMMM d, yyyy h:mm aa"
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
        locale="fr" // Set French locale for react-datepicker
        placeholderText="Select end date"
        onChange={(date) => field.onChange(date)}
        selected={field.value}
        value={field.value}
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect
        className="form-control"
        id="end"
        
      />
    )}
  />
    <p className={`error text-warning position-absolute ${dbError.end?"":"d-none"}`}>{dbError.end?<i className=" bi bi-info-circle me-2"></i>:""}{dbError.end}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="type" className="form-label">
        Type de l'évènement <span className="text-danger small">(optional)</span>
      </label>
      <input {...register("type")}  type="text" placeholder="type of  your info" className="form-control" id="type" aria-describedby="describe" />
    </div>
    <div className="mb-4">
      <label htmlFor="describe" className="form-label">
        Description de l'évènement <span className="text-danger small">(optional)</span>
      </label>
      <input {...register("describe")}  type="text" placeholder="describe your info" className="form-control" id="describe" aria-describedby="describe" />
    </div>

    <div className="mb-4">
        <label htmlFor="youtubeLink" className="form-label">Lien YouTube</label>
        <input {...register("youtubeLink")} type="text" placeholder="Lien YouTube" className="form-control" id="youtubeLink" aria-describedby="youtubeLink" />
        <p className={`error text-warning position-absolute ${errors.youtubeLink ? "active" : ""}`}>{errors.youtubeLink ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.youtubeLink?.message}</p>
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
            Choose Image
        </Button>
    </label>
</FormControl>
<FormControl fullWidth>
    <FormLabel htmlFor='pdf'>PDF</FormLabel>
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
            Choose PDF
        </Button>
    </label>
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
    <input
        accept='video/*' // Spécifiez le type de fichier accepté comme vidéo
        id='video-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'video')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='video-file'>
        <Button variant='contained' component='span'>
            Choose Video
        </Button>
    </label>
    
</FormControl>
<FormControl fullWidth>
    <FormLabel htmlFor='icone'>Icone</FormLabel>
    <TextField
        id='icone'
        type='text'
        placeholder='Enter icone url'
        value={getValues("iconeUrl")} // Utilisation de getValues() pour obtenir la valeur googleDriveVideoUrl
        readOnly={true} // Rendre le champ en lecture seule
       {...register("iconeUrl")}/>
    <input
        accept='image/*' // Spécifiez le type de fichier accepté comme vidéo
        id='icone-file'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => uploadFileHandler(e, 'icone')} // Appeler uploadFileHandler avec le type de fichier approprié
    />
    <label htmlFor='icone-file'>
        <Button variant='contained' component='span'>
            Choose Icone
        </Button>
    </label>
    
</FormControl>
    <Button type="submit" variant="contained" color="success"
  
    >Créer</Button>
  </form>
  )
}


function mapStateToProps({info, error}){
  return{
    error
    // info
  }
}


export default connect(mapStateToProps , {addInfoApi})(AddInfo)