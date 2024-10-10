
import {apprendre} from "../../Axios/apprendre"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {APPRENDRE_DETAILS_FAIL, 
  APPRENDRE_DETAILS_REQUEST, 
  APPRENDRE_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/apprendreConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showApprendre = (apprendre)=>{
    console.log("info to be shown on the modal: ", apprendre)
    return{
        type: "SHOW_APPRENDRE",
        payload: apprendre 
    }
}

export const showApprendres = (apprendres)=>{
    
    return{
        type: "SHOW_APPRENDRES",
        payload: apprendres
    }
}

export const ShowApprendreApi = (id ,token) => async dispatch => {
    const result = await apprendre.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,fonction} = await result.data;
        const convertedApprendre  = {
            id: _id,
            isActive,
            title,
            describe,
            imageUrl,
            pdfUrl,
            fonction,
        }
        await dispatch(showApprendre (convertedApprendre))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowApprendresApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await apprendre.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(apprendre => {
          return {
              isActive : apprendre.isActive,
              title: apprendre.title,
              id: apprendre._id,
              //describe: entraide.describe,
              fonction: apprendre.fonction,
              imageUrl: apprendre.imageUrl,
              pdfUrl: apprendre.pdfUrl,
            //  pdfUrl2: investir.pdfUrl2,
              selectedClients: apprendre.selectedClients || [],
          };
      });

      // Dispatch des données converties
      await dispatch(showApprendres(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching apprendres:", error);
      return error;
  }
};





export const deleteApprendre = (id)=>{
   return {
       type: "DELETE_APPRENDRE",
       payload: id
   }
}

export const deleteApprendreApi = (id,token) =>  async dispatch=> {
    const result = await apprendre.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteApprendre(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addApprendre = (newApprendre)=>{
    return{
      type: "ADD_APPRENDRE",
      payload: newApprendre
    }
}


export const addApprendreApi = (values, token) => async (dispatch) => {
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
    const response = await apprendre.post(
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
      dispatch(addApprendre(response.data));
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
  




export const listApprendreDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: APPRENDRE_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/apprendres/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: APPRENDRE_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: APPRENDRE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const updateApprendreApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'APPRENDRE_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/apprendres/${id}/update`,
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
      type: 'APPRENDRE_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('APPRENDRE updated successfully!', {
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
      type: 'APPRENDRE_UPDATE_FAIL',
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



export const updateApprendreStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/apprendres/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_APPRENDRE_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update apprendre status:', error.response || error);
    dispatch({
      type: 'UPDATE_APPRENDRE_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
