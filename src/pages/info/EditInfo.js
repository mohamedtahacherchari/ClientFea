import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ShowInfosApi, updateInfoApi,listInfoDetails } from "../../redux/actions/info/infosActions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate,useParams} from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import { FormControl, FormLabel, TextField, CircularProgress } from '@mui/material';
import axios from 'axios'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { INFO_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/infoConstant';

import fr from 'date-fns/locale/fr'; // Import French locale

const useStyles = makeStyles((theme) => ({
  buttonCustom: {
      textTransform: 'capitalize' // Première lettre de chaque mot en majuscule
  }
}));
//schema to validate event inputs 

const schema = yup.object({
  title: yup.string().required("Can't Be Empty"),
  //start: yup.date().required("Please specify the time to start"),
  //end: yup.date("must be a valid date").required("on update you must specify an end date"),
  youtubeLink: yup.string().url("Veuillez entrer une URL valide pour YouTube"),
}).required();

const UpdateInfo = ({updateInfoApi}) => {
   const{id} =useParams()
   const infos = useSelector((state) => state.infos)
   const infoDetails = useSelector((state) => state.infoDetails)
   const { loading, error, info } = infoDetails
   const eventUpdate = useSelector((state) => state.eventUpdate)
   const dispatch = useDispatch();
   const {
     loading: loadingUpdate,
     error: errorUpdate,
     success: successUpdate,
   } = eventUpdate

    const classes = useStyles();
    const navigate = useNavigate();
    const token = useSelector(state => state.token)
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false)
    const [firstRender, setFirstRender] = useState(true)
    const [uploading, setUploading] = useState(false)
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
      dispatch({ type: INFO_UPDATE_RESET})
    }
      if (!info.title ||info._id !== id){
        dispatch(listInfoDetails(id));
      } 
      else{
  // Initialisation des valeurs par défaut pour le formulaire
       setValue('title', info.title || "");
      // setValue('start', info.start ? new Date(info.start) : null);
       //setValue('end', info.end ? new Date(info.end) : null);
       setValue('type', info.type || "Aucun type fourni");
       setValue('describe', info.describe || "Aucune description fournie");
       setValue('youtubeLink', info.youtubeLink || "");
       setValue('imageUrl', info.imageUrl || "");
       setValue('pdfUrl', info.pdfUrl || "");
       setValue('googleDriveVideoUrl', info.googleDriveVideoUrl || "");
      // setValue('selectedClients', info.selectedClients || []);
      // iconeUrl: values.iconeUrl
      setValue('iconeUrl', info.iconeUrl || "")
      }
    }, [dispatch, id,info,setValue,listInfoDetails])



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
  
    //using form-hook to register event data
 /*   const { register, setValue,getValues,handleSubmit, formState: {errors}, control } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        title: info.title,
       // start: new Date(info.start) ,
       // end: info.end? new Date(info.end) :"",
        type: info.type? info.type : "No type was provided",
        describe: info.describe? info.describe : "No description was provided",
        youtubeLink: info.youtubeLink ? info.youtubeLink : "",
        imageUrl: info.imageUrl ? info.imageUrl : "",
        pdfUrl: info.pdfUrl ? info.pdfUrl : "",
        googleDriveVideoUrl: info.googleDriveVideoUrl ? info.googleDriveVideoUrl : "",
        iconeUrl: info.iconeUrl ? info.iconeUrl : ""

      }
    });*/
   
     /*const onSubmit = async(values)=>{
      // console.log('Start Date:', values.start);
     //  console.log('End Date:', values.end);
       setFirstRender(false)
       updateInfoApi(values, id ,token)
       .then(res=> {
       console.log(res);
       setRerender(!rerender);
       if(res === "response was successful"){
          navigate("/info2")
        }
      })
      
    }*/
      const onSubmit = async (data) => {
      //  data.selectedClients = selectedClients; // **Modification 3: Pour assurer la mise à jour de selectedClients**
      console.log(data,"hello")
       try {
          const response = await updateInfoApi(data,id,token);
          // **Modification 4: Ajout de la Gestion des Erreurs pour les Appels API**
          // Vérifie la réponse de l'API et navigue vers une autre page si l'opération est réussie.
          if (response === "response was successful") {
            navigate("/inv/info2");
          }
        } catch (err) {
          setError(true);
          console.error("Failed to update event:", err);
        }
      };


  return (
    //this form is in bootstrab
    <form onSubmit={handleSubmit(onSubmit)} className=" align-content-center m-5">
    <div className="mb-4">
      <label htmlFor="title" className="form-label">Titre de l'information </label>
      <input {...register("title")}   type="text" placeholder="title" className="form-control" id="title" aria-describedby="title" />
      <p className={`error text-warning position-absolute ${errors.title?"active":""}`}>{errors.title?<i className="bi bi-info-circle me-2"></i>:""}{errors.title?.message}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="type" className="form-label">
        Déscription de l'information <span className="text-danger small">(optional)</span>
      </label>
      <input {...register("type")}   type="text" placeholder="Type of your info" className="form-control" id="type" aria-describedby="describe" />
    </div>
    <div className="mb-4">
      <label htmlFor="describe" className="form-label">
        Description de l'évènement <span className="text-danger small">(optional)</span>
      </label>
      <input {...register("describe")}   type="text" placeholder="describe your info" className="form-control" id="describe" aria-describedby="describe" />
    </div>
    <div className="mb-4">
        <label htmlFor="youtubeLink" className="form-label">Lien YouTube</label>
        <input {...register("youtubeLink")} type="text" placeholder="Lien YouTube" className="form-control" id="youtubeLink" aria-describedby="youtubeLink" />
        <p className={`error text-warning position-absolute ${errors.youtubeLink ? "active" : ""}`}>{errors.youtubeLink ? <i className="bi bi-info-circle me-2"></i> : ""}{errors.youtubeLink?.message}</p>
      </div>
     {/* <div className="mb-4" style={{zIndex: "100"}}>
      <Controller
      control={control}
      name="start"

      render={({ field }) => (
        <DatePicker
        locale="fr" 
          placeholderText="Select date"
          onChange={(date) => field.onChange(date)}
          selected={field.value}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="form-control"
          id="start"
        />
      )}
    />
    
    <p className={`error text-warning position-absolute ${errors.start?"active":""}`}>{errors.start?<i className=" bi bi-info-circle me-2"></i>:""}{errors.start?.message}</p>
    <p className={`error text-warning position-absolute ${dbError.start?"":"d-none"}`}>{dbError.start?<i className=" bi bi-info-circle me-2"></i>:""}{dbError.start}</p>
    </div> */}
  {/*  <div className="mb-4" style={{zIndex: "100"}}>
      <label htmlFor="end" className="form-label">Date de fin</label>
    
      <Controller
    control={control}
    name="end"
    render={({ field }) => (
      <DatePicker
      locale="fr" 
        placeholderText="Select end date"
        onChange={(date) => field.onChange(date)}
        selected={field.value}
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect
        className="form-control"
        id="end"
        
      />
    )}
  />
  
  <p className={`error text-warning position-absolute ${errors.end?"active":""}`}>{errors.end?<i className=" bi bi-info-circle me-2"></i>:""}{errors.end?.message}</p>
  <p className={`error text-warning position-absolute ${dbError.end?"":"d-none"}`}>{dbError.end?<i className=" bi bi-info-circle me-2"></i>:""}{dbError.end}</p>

    </div>*/}
    <FormControl fullWidth>
  <FormLabel htmlFor='image'>Image</FormLabel>
  <TextField
      id='image'
      type='text'
      placeholder='Enter image url'
      value={getValues("imageUrl")}
      {...register("imageUrl")}
      InputProps={{
        readOnly: true,
      }}
  />
  <div style={{ display: 'flex', marginTop: 8 }}>
      <input
          accept='image/*'
          id='image-file'
          type='file'
          style={{ display: 'none' }}
          onChange={(e) => uploadFileHandler(e, 'image')}
      />
      <label htmlFor='image-file'>
          <Button variant='contained' component='span' className={classes.buttonCustom}>
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
      value={getValues("pdfUrl")}
      {...register("pdfUrl")}
      InputProps={{
        readOnly: true,
      }}
  />
  <div style={{ display: 'flex', marginTop: 8 }}>
      <input
          accept='application/pdf'
          id='pdf-file'
          type='file'
          style={{ display: 'none' }}
          onChange={(e) => uploadFileHandler(e, 'pdf')}
      />
      <label htmlFor='pdf-file'>
          <Button variant='contained' component='span' className={classes.buttonCustom}>
            Choisissez un pdf
          </Button>
      </label>
      <Button variant="outlined" color="secondary" onClick={() => setValue('pdfUrl', '')} className={classes.buttonCustom} style={{ marginLeft: 8 }}>
        Supprimer le PDF
      </Button>
  </div>
</FormControl>

<FormControl fullWidth>
  <FormLabel htmlFor='video'>Video</FormLabel>
  <TextField
      id='video'
      type='text'
      placeholder='Enter video url'
      value={getValues("googleDriveVideoUrl")}
      {...register("googleDriveVideoUrl")}
      InputProps={{
        readOnly: true,
      }}
  />
  <div style={{ display: 'flex', marginTop: 8 }}>
      <input
          accept='video/*'
          id='video-file'
          type='file'
          style={{ display: 'none' }}
          onChange={(e) => uploadFileHandler(e, 'video')}
      />
      <label htmlFor='video-file'>
          <Button variant='contained' component='span' className={classes.buttonCustom}>
            Choisissez un video
          </Button>
      </label>
      <Button variant="outlined" color="secondary" onClick={() => setValue('googleDriveVideoUrl', '')} className={classes.buttonCustom} style={{ marginLeft: 8 }}>
        Supprimer la vidéo
      </Button>
  </div>
</FormControl>
<FormControl fullWidth>
  <FormLabel htmlFor='icone'>Icone</FormLabel>
  <TextField
      id='icone'
      type='text'
      placeholder='Enter icon url'
      value={getValues("iconeUrl")}
      {...register("iconeUrl")}
      InputProps={{
        readOnly: true,
      }}
  />
  <div style={{ display: 'flex', marginTop: 8 }}>
      <input
          accept='image/*'  // Changed to accept all types of images
          id='icone-file'
          type='file'
          style={{ display: 'none' }}
          onChange={(e) => uploadFileHandler(e, 'icone')}
      />
      <label htmlFor='icone-file'>
          <Button variant='contained' component='span' className={classes.buttonCustom}>
            Choisissez un icone
          </Button>
      </label>
      <Button variant="outlined" color="secondary" onClick={() => setValue('iconeUrl', '')} className={classes.buttonCustom} style={{ marginLeft: 8 }}>
        Supprimer l'icone
      </Button>
  </div>
</FormControl>
      <Button type="submit" variant="contained" color="success"  className={classes.buttonCustom}> mis à jour</Button>
  </form>
  )
}


function mapStateToProps({info, error}){
  return{
    info,
    error
  }
}

//export default UpdateInfo;
export default connect(mapStateToProps,{updateInfoApi,ShowInfosApi})(UpdateInfo)