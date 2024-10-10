
import {sadaqa} from "../../Axios/sadaqa"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {SADAQA_DETAILS_FAIL, 
  SADAQA_DETAILS_REQUEST, 
  SADAQA_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/sadaqaConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSadaqa = (sadaqa)=>{
    console.log("info to be shown on the modal: ",sadaqa)
    return{
        type: "SHOW_SADAQA",
        payload: sadaqa 
    }
}

export const showSadaqas = (sadaqas)=>{
    
    return{
        type: "SHOW_SADAQAS",
        payload: sadaqas
    }
}

export const ShowSadaqaApi = (id ,token) => async dispatch => {
    const result = await sadaqa.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,pdfUrl2,pdfUrl3,fonction,youtubeLink } = await result.data;
        const convertedSadaqa  = {
            id: _id,
            isActive,
            title,
            describe,
            imageUrl,
            pdfUrl,
            pdfUrl2,
            pdfUrl3,
            fonction,
            youtubeLink

        }
        await dispatch(showSadaqa (convertedSadaqa))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowSadaqasApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await sadaqa.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(sadaqa => {
          return {
              isActive : sadaqa.isActive,
              title: sadaqa.title,
              id: sadaqa._id,
              //describe: entraide.describe,
              fonction: sadaqa.fonction,
              imageUrl: sadaqa.imageUrl,
              pdfUrl: sadaqa.pdfUrl,
              pdfUrl2: sadaqa.pdfUrl2,
              pdfUrl3: sadaqa.pdfUrl3,
              googleDriveVideoUrl: sadaqa.googleDriveVideoUrl,
              selectedClients: sadaqa.selectedClients || [],
              youtubeLink: sadaqa.youtubeLink

          };
      });

      // Dispatch des données converties
      await dispatch(showSadaqas(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching sadaqas:", error);
      return error;
  }
};





export const deleteSadaqa = (id)=>{
   return {
       type: "DELETE_SADAQA",
       payload: id
   }
}

export const deleteSadaqaApi = (id,token) =>  async dispatch=> {
    const result = await sadaqa.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteSadaqa(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addSadaqa = (newSadaqa)=>{
    return{
      type: "ADD_SADAQA",
      payload: newSadaqa
    }
}


export const addSadaqaApi = (values, token) => async (dispatch) => {
  const {
    isActive,
    title,
    selectedClients,
    describe,
    imageUrl,
    pdfUrl,
    pdfUrl2,
    pdfUrl3,
    fonction,
    googleDriveVideoUrl,
    youtubeLink,

  } = values;

  try {
    const response = await sadaqa.post(
      "/",
      {
        isActive,
        title,
        selectedClients,
        describe,
        imageUrl,
        pdfUrl,
        pdfUrl2,
        pdfUrl3,
        fonction,
        googleDriveVideoUrl,
        youtubeLink

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
      dispatch(addSadaqa(response.data));
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
};;
  




export const listSadaqaDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: SADAQA_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/sadaqas/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: SADAQA_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: SADAQA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const updateSadaqaApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'SADAQA_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/sadaqas/${id}/update`,
      {
        isActive: values.isActive,
        title: values.title,
        fonction: values.fonction,
        imageUrl: values.imageUrl,
        pdfUrl: values.pdfUrl,
        pdfUrl2: values.pdfUrl2,
        pdfUrl3: values.pdfUrl3,
        selectedClients: values.selectedClients,
        youtubeLink : values.youtubeLink

      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // Utilisation du token sans 'Bearer'
        },
      }
    );

    console.log(data);

    // Dispatching the success action
    dispatch({
      type: 'SADAQA_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('SADAQA updated successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return "response was successful";

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.error(message);

    // Dispatching the failure action
    dispatch({
      type: 'SADAQA_UPDATE_FAIL',
      payload: message,
    });

    // Optional: Show error message using a toast
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};



export const updateSadaqaStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/sadaqas/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_SADAQA_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update sadaqa status:', error.response || error);
    dispatch({
      type: 'UPDATE_SADAQA_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
