
import { entraide } from "../../Axios/entraide"
import axios from 'axios'
import { addError, removeError } from "./errorsActions"
import {ENTRAIDE_DETAILS_FAIL, 
  ENTRAIDE_DETAILS_REQUEST, 
  ENTRAIDE_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/entraideConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showEntraide = (entraide)=>{
    console.log("info to be shown on the modal: ", entraide)
    return{
        type: "SHOW_ENTRAIDE",
        payload: entraide 
    }
}

export const showEntraides = (entraides)=>{
    
    return{
        type: "SHOW_ENTRAIDES",
        payload: entraides
    }
}

export const ShowEntraideApi = (id ,token) => async dispatch => {
    const result = await entraide.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,fonction} = await result.data;
        const convertedEntraide  = {
            id: _id,
            isActive,
            title,
            describe,
            imageUrl,
            pdfUrl,
            fonction,
        }
        await dispatch(showEntraide (convertedEntraide ))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowEntraidesApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await entraide.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(entraide => {
          return {
              isActive : entraide.isActive,
              title: entraide.title,
              id: entraide._id,
              //describe: entraide.describe,
              fonction: entraide.fonction,
              imageUrl: entraide.imageUrl,
              pdfUrl: entraide.pdfUrl,
              pdfUrl2: entraide.pdfUrl2,
              selectedClients: entraide.selectedClients || [],
          };
      });

      // Dispatch des données converties
      await dispatch(showEntraides(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching entraides:", error);
      return error;
  }
};





export const deleteEntraide = (id)=>{
   return {
       type: "DELETE_ENTRAIDE",
       payload: id
   }
}

export const deleteEntraideApi = (id,token) =>  async dispatch=> {
    const result = await entraide.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteEntraide(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addEntraide = (newEntraide)=>{
    return{
      type: "ADD_ENTRAIDE",
      payload: newEntraide
    }
}


export const addEntraideApi = (values, token) => async (dispatch) => {
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
      const response = await entraide.post(
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
        dispatch(addEntraide(response.data));
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
  




export const listEntraideDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: ENTRAIDE_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/entraides/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: ENTRAIDE_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: ENTRAIDE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateEntraideApi2 = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'ENTRAIDE_UPDATE_REQUEST',
    });

    // Getting the token from the state
    const { token } = getState();

    // Making the API call
    const { data } = await axios.put(
      `/api/entraides/${id}/update`,
      {
        isActive: values.isActive,
        title: values.title,
        fonction : values.fonction,
        imageUrl: values.imageUrl,
        pdfUrl: values.pdfUrl,
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
      type: 'ENTRAIDE_UPDATE_SUCCESS',
      payload: data,
    });
    return "response was successful";
    // Optional: Show a success message using a toast
    toast.success('ENTRAIDE updated successfully!', {
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
      type: 'ENTRAIDE_UPDATE_FAIL',
      payload: message,
    });
  }
};

export const updateEntraideApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'ENTRAIDE_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/entraides/${id}/update`,
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
      type: 'ENTRAIDE_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('ENTRAIDE updated successfully!', {
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
      type: 'ENTRAIDE_UPDATE_FAIL',
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



export const updateEntraideStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/entraides/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_ENTRAIDE_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update entraide status:', error.response || error);
    dispatch({
      type: 'UPDATE_ENTRAIDE_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
