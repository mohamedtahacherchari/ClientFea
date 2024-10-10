
import { audiovisuel } from "../../Axios/audiovisuel "
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import { AUDIOVISUEL_DETAILS_FAIL, 
  AUDIOVISUEL_DETAILS_REQUEST, 
  AUDIOVISUEL_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/audiovisuelConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showAudiovisuel = (audiovisuel )=>{
    console.log("info to be shown on the modal: ", audiovisuel )
    return{
        type: "SHOW_AUDIOVISUEL",
        payload: audiovisuel 
    }
}

export const showAudiovisuels = (audiovisuels)=>{
    
    return{
        type: "SHOW_AUDIOVISUELS",
        payload: audiovisuels
    }
}

export const ShowAudiovisuelApi = (id ,token) => async dispatch => {
    const result = await audiovisuel.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,type, describe ,youtubeLink, imageUrl, pdfUrl, googleDriveVideoUrl,googleDriveVideoUrl2} = await result.data;
        const convertedAudiovisuel  = {
            id: _id,
            isActive,
            title,
            type,
            describe,
            describe,
            type,
            youtubeLink,
            imageUrl,
            pdfUrl,
            googleDriveVideoUrl,
            googleDriveVideoUrl2
        }
        await dispatch(showAudiovisuel (convertedAudiovisuel ))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowAudiovisuelsApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await audiovisuel.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(audiovisuel => {
          return {
              isActive : audiovisuel.isActive,
              title: audiovisuel.title,
              id: audiovisuel._id,
              describe: audiovisuel.describe,
              describe2: audiovisuel.describe2,
              fonction: audiovisuel.fonction,
              type: audiovisuel.type,
              youtubeTitre: audiovisuel.youtubeTitre,
              youtubeTitre2: audiovisuel.youtubeTitre2,
              youtubeLink: audiovisuel.youtubeLink,
              youtubeLink2: audiovisuel.youtubeLink2,
              imageUrl: audiovisuel.imageUrl,
              pdfUrl: audiovisuel.pdfUrl,
              googleDriveVideoUrl: audiovisuel.googleDriveVideoUrl,
              googleDriveVideoUrl2: audiovisuel.googleDriveVideoUrl2,
              selectedClients: audiovisuel.selectedClients || [],
          };
      });

      // Dispatch des données converties
      await dispatch(showAudiovisuels(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching audiovisuals:", error);
      return error;
  }
};





export const deleteAudiovisuel= (id)=>{
   return {
       type: "DELETE_AUDIOVISUEL",
       payload: id
   }
}

export const deleteAudiovisuelApi = (id,token) =>  async dispatch=> {
    const result = await audiovisuel.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteAudiovisuel(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addAudiovisuel = (newAudiovisuel)=>{
    return{
      type: "ADD_AUDIOVISUEL",
      payload: newAudiovisuel
    }
}


export const addAudiovisuelApi = (values, token) => async (dispatch) => {
    const {
      isActive,
      title,
      selectedClients,
      describe,
      describe2,
      type,
      youtubeLink,
      youtubeLink2,
      youtubeTitre,
      youtubeTitre2,
      imageUrl,
      pdfUrl,
      googleDriveVideoUrl,
      googleDriveVideoUrl2,
      fonction,
    } = values;
  
    try {
      const response = await audiovisuel.post(
        "/",
        {
          isActive,
          title,
          selectedClients,
          describe,
          describe2,
          type,
          youtubeTitre,
          youtubeTitre2,
          youtubeLink,
          youtubeLink2,
          imageUrl,
          pdfUrl,
          googleDriveVideoUrl,
          googleDriveVideoUrl2,
          fonction,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
  
      if (response && response.data) {
        console.log("info from the API going to the reducer:", response.data);
        dispatch(addAudiovisuel(response.data));
        dispatch(removeError());
        return "success"; // Returning success message
      }
    } catch (error) {
      console.error("API call failed:", error);
  
      // Check if there's an error response from the server
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data);
        dispatch(addError(error.response.data));
      } else {
        console.error("Unexpected error:", error);
        dispatch(addError("Unexpected error occurred"));
      }
  
      return "error"; // Returning error message or a different indication of failure
    }
  };
  




export const listAudiovisuelDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type:AUDIOVISUEL_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/audiovisuels/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: AUDIOVISUEL_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: AUDIOVISUEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAudiovisuelApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'AUDIOVISUEL_UPDATE_REQUEST',
    });

    // Getting the token from the state
    const { token } = getState();

    // Making the API call
    const { data } = await axios.put(
      `/api/audiovisuels/${id}/update`,
      {
        isActive: values.isActive,
        title: values.title,
        fonction : values.fonction,
        describe: values.describe,
        describe2: values.describe2,
        type: values.type,
        describe: values.describe,
        describe2: values.describe2,
        youtubeTitre: values.youtubeTitre,
        youtubeTitre2: values.youtubeTitre2,
        youtubeLink: values.youtubeLink,
        youtubeLink2: values.youtubeLink2,
        imageUrl: values.imageUrl,
        pdfUrl: values.pdfUrl,
        googleDriveVideoUrl: values.googleDriveVideoUrl,
        googleDriveVideoUrl2: values.googleDriveVideoUrl2,
        selectedClients: values.selectedClients,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    console.log(data);

    // Dispatching the success action
    dispatch({
      type: 'AUDIOVISUEL_UPDATE_SUCCESS',
      payload: data,
    });
    return "response was successful";
    // Optional: Show a success message using a toast
    toast.success('Audiovisuel updated successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.error(message);

    // Dispatching the failure action
    dispatch({
      type: 'AUDIOVISUEL_UPDATE_FAIL',
      payload: message,
    });
  }
};


export const updateAudiovisuelStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/audiovisuels/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_AUDIOVISUEL_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update audiovisuel status:', error.response || error);
    dispatch({
      type: 'UPDATE_AUDIOVISUEL_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
