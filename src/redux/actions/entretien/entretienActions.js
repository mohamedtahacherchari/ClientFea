
import { entretien } from "../../Axios/entretien"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {ENTRETIEN_DETAILS_FAIL, 
  ENTRETIEN_DETAILS_REQUEST, 
  ENTRETIEN_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/entretienConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showEntretien = (entretien)=>{
    console.log("info to be shown on the modal: ", entretien)
    return{
        type: "SHOW_ENTRETIEN",
        payload: entretien 
    }
}

export const showEntretiens = (entretiens)=>{
    
    return{
        type: "SHOW_ENTRETIENS",
        payload: entretiens
    }
}

export const ShowEntretienApi = (id ,token) => async dispatch => {
    const result = await entretien.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,fonction} = await result.data;
        const convertedEntretien  = {
            id: _id,
            isActive,
            title,
            describe,
            imageUrl,
            pdfUrl,
            fonction,
        }
        await dispatch(showEntretien (convertedEntretien ))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowEntretiensApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await entretien.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(entretien => {
          return {
              isActive : entretien.isActive,
              title: entretien.title,
              id: entretien._id,
              //describe: entraide.describe,
              fonction: entretien.fonction,
              imageUrl: entretien.imageUrl,
              pdfUrl: entretien.pdfUrl,
              pdfUrl2: entretien.pdfUrl2,
              selectedClients: entretien.selectedClients || [],
          };
      });

      // Dispatch des données converties
      await dispatch(showEntretiens(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching entretiens:", error);
      return error;
  }
};





export const deleteEntretien = (id)=>{
   return {
       type: "DELETE_ENTRETIEN",
       payload: id
   }
}

export const deleteEntretienApi = (id,token) =>  async dispatch=> {
    const result = await entretien.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteEntretien(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addEntretien = (newEntretien)=>{
    return{
      type: "ADD_ENTRETIEN",
      payload: newEntretien
    }
}


export const addEntretienApi = (values, token) => async (dispatch) => {
  const {
    isActive,
    title,
    selectedClients,
    describe,
    imageUrl,
    pdfUrl,
    pdfUrl2,
    fonction,

  } = values;

  try {
    const response = await entretien.post(
      "/",
      {
        isActive,
        title,
        selectedClients,
        describe,
        imageUrl,
        pdfUrl,
        pdfUrl2,
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
      dispatch(addEntretien(response.data));
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
  




export const listEntretienDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: ENTRETIEN_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/entretiens/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: ENTRETIEN_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: ENTRETIEN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const updateEntretienApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'ENTRETIEN_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/entretiens/${id}/update`,
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
      type: 'ENTRETIEN_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('ENTRETIEN updated successfully!', {
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
      type: 'ENTRETIEN_UPDATE_FAIL',
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



export const updateEntretienStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/entretiens/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_ENTRETIEN_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update entretien status:', error.response || error);
    dispatch({
      type: 'UPDATE_ENTRETIEN_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
