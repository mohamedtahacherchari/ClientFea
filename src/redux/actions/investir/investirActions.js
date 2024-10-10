
import {investir} from "../../Axios/investir"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {INVESTIR_DETAILS_FAIL, 
  INVESTIR_DETAILS_REQUEST, 
  INVESTIR_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/investirConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showInvestir = (investir)=>{
    console.log("info to be shown on the modal: ", investir)
    return{
        type: "SHOW_INVESTIT",
        payload: investir 
    }
}

export const showInvestirs = (investirs)=>{
    
    return{
        type: "SHOW_INVESTIRS",
        payload: investirs
    }
}

export const ShowInvestirApi = (id ,token) => async dispatch => {
    const result = await investir.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,fonction} = await result.data;
        const convertedInvestir  = {
            id: _id,
            isActive,
            title,
            describe,
            imageUrl,
            pdfUrl,
            fonction,
        }
        await dispatch(showInvestir (convertedInvestir))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowInvestirsApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await investir.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(investir => {
          return {
              isActive : investir.isActive,
              title: investir.title,
              id: investir._id,
              //describe: entraide.describe,
              fonction: investir.fonction,
              imageUrl: investir.imageUrl,
              pdfUrl: investir.pdfUrl,
              pdfUrl2: investir.pdfUrl2,
              selectedClients: investir.selectedClients || [],
          };
      });

      // Dispatch des données converties
      await dispatch(showInvestirs(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching investirs:", error);
      return error;
  }
};





export const deleteInvestir = (id)=>{
   return {
       type: "DELETE_INVESTIR",
       payload: id
   }
}

export const deleteInvestirApi = (id,token) =>  async dispatch=> {
    const result = await investir.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteInvestir(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addInvestir = (newInvestir)=>{
    return{
      type: "ADD_INVESTIR",
      payload: newInvestir
    }
}


export const addInvestirApi = (values, token) => async (dispatch) => {
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
    const response = await investir.post(
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
      dispatch(addInvestir(response.data));
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
  




export const listInvestirDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: INVESTIR_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/investirs/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: INVESTIR_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: INVESTIR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const updateInvestirApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'INVESTIR_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/investirs/${id}/update`,
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
      type: 'INVESTIR_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('INVESTIR updated successfully!', {
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
      type: 'INVESTIR_UPDATE_FAIL',
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



export const updateInvestirStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/investirs/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_INVESTIR_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update investir status:', error.response || error);
    dispatch({
      type: 'UPDATE_INVESTIR_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};