
import {sante} from "../../Axios/sante"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {SANTE_DETAILS_FAIL, 
  SANTE_DETAILS_REQUEST, 
  SANTE_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/santeConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSante = (sante)=>{
    console.log("info to be shown on the modal: ",sante)
    return{
        type: "SHOW_SANTE",
        payload: sante 
    }
}

export const showSantes = (santes)=>{
    
    return{
        type: "SHOW_SANTES",
        payload: santes
    }
}

export const ShowSanteApi = (id ,token) => async dispatch => {
    const result = await sante.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,pdfUrl2,pdfUrl3,fonction,youtubeLink } = await result.data;
        const convertedSante  = {
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
        await dispatch(showSante (convertedSante))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowSantesApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await sante.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(sante => {
          return {
              isActive : sante.isActive,
              title: sante.title,
              id: sante._id,
              //describe: entraide.describe,
              fonction: sante.fonction,
              imageUrl: sante.imageUrl,
              pdfUrl: sante.pdfUrl,
              selectedClients: sante.selectedClients || [],
              

          };
      });

      // Dispatch des données converties
      await dispatch(showSantes(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching santes:", error);
      return error;
  }
};





export const deleteSante = (id)=>{
   return {
       type: "DELETE_SANTE",
       payload: id
   }
}

export const deleteSanteApi = (id,token) =>  async dispatch=> {
    const result = await sante.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteSante(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addSante = (newSante)=>{
    return{
      type: "ADD_SANTE",
      payload: newSante
    }
}


export const addSanteApi = (values, token) => async (dispatch) => {
  const {
    isActive,
    title,
    selectedClients,
    describe,
    imageUrl,
    pdfUrl,
    fonction,
    googleDriveVideoUrl,
  

  } = values;

  try {
    const response = await sante.post(
      "/",
      {
        isActive,
        title,
        selectedClients,
        describe,
        imageUrl,
        pdfUrl,
        fonction,
        googleDriveVideoUrl,
        

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
      dispatch(addSante(response.data));
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
  




export const listSanteDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: SANTE_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/santes/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: SANTE_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: SANTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const updateSanteApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'SANTE_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/santes/${id}/update`,
      {
        isActive: values.isActive,
        title: values.title,
        fonction: values.fonction,
        imageUrl: values.imageUrl,
        pdfUrl: values.pdfUrl,
        selectedClients: values.selectedClients,
       

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
      type: 'SANTE_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('SANTE updated successfully!', {
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
      type: 'SANTE_UPDATE_FAIL',
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



export const updateSanteStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/santes/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_SANTE_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update sante status:', error.response || error);
    dispatch({
      type: 'UPDATE_SANTE_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
