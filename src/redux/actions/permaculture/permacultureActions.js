
import {permaculture} from "../../Axios/permaculture"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {PERMACULTURE_DETAILS_FAIL, 
  PERMACULTURE_DETAILS_REQUEST, 
  PERMACULTURE_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/permacultureConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showPermaculture = (permaculture)=>{
    console.log("info to be shown on the modal: ",permaculture)
    return{
        type: "SHOW_PERMACULTURE",
        payload: permaculture 
    }
}

export const showPermacultures = (permacultures)=>{
    
    return{
        type: "SHOW_PERMACULTURES",
        payload: permacultures
    }
}

export const ShowPermacultureApi = (id ,token) => async dispatch => {
    const result = await permaculture.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,pdfUrl2,fonction} = await result.data;
        const convertedPermaculture  = {
            id: _id,
            isActive,
            title,
            describe,
            imageUrl,
            pdfUrl,
            pdfUrl2,
            fonction
        }
        await dispatch(showPermaculture (convertedPermaculture))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowPermaculturesApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await permaculture.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(permaculture => {
          return {
              isActive : permaculture.isActive,
              title: permaculture.title,
              id: permaculture._id,
              //describe: entraide.describe,
              fonction: permaculture.fonction,
              imageUrl: permaculture.imageUrl,
              pdfUrl: permaculture.pdfUrl,
              pdfUrl2: permaculture.pdfUrl2,
              googleDriveVideoUrl: permaculture.googleDriveVideoUrl,
              selectedClients: permaculture.selectedClients || [],
          };
      });

      // Dispatch des données converties
      await dispatch(showPermacultures(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching permacultures:", error);
      return error;
  }
};





export const deletePermaculture = (id)=>{
   return {
       type: "DELETE_PERMACULTURE",
       payload: id
   }
}

export const deletePermacultureApi = (id,token) =>  async dispatch=> {
    const result = await permaculture.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deletePermaculture(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addPermaculture = (newPermaculture)=>{
    return{
      type: "ADD_PERMACULTURE",
      payload: newPermaculture
    }
}


export const addPermacultureApi = (values, token) => async (dispatch) => {
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
    const response = await permaculture.post(
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
      dispatch(addPermaculture(response.data));
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
  




export const listPermacultureDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: PERMACULTURE_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/permacultures/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: PERMACULTURE_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: PERMACULTURE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const updatePermacultureApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'PERMACULTURE_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/permacultures/${id}/update`,
      {
        isActive: values.isActive,
        title: values.title,
        fonction: values.fonction,
        imageUrl: values.imageUrl,
        pdfUrl: values.pdfUrl,
        pdfUrl2: values.pdfUrl2,
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
      type: 'PERMACULTURE_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('PERMACULTURE updated successfully!', {
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
      type: 'PERMACULTURE_UPDATE_FAIL',
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



export const updatePermacultureStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/permacultures/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_PERMACULTURE_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update permaculture status:', error.response || error);
    dispatch({
      type: 'UPDATE_PERMACULTURE_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
