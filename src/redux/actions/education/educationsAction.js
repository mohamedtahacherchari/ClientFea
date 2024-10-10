
import { education } from "../../Axios/education"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {EDUCATION_DETAILS_FAIL, 
  EDUCATION_DETAILS_REQUEST, 
  EDUCATION_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/educationConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showEducation = (education)=>{
    console.log("info to be shown on the modal: ", education )
    return{
        type: "SHOW_EDUCATION",
        payload: education 
    }
}

export const showEducations = (educations)=>{
    
    return{
        type: "SHOW_EDUCATIONS",
        payload: educations
    }
}

export const ShowEducationApi = (id ,token) => async dispatch => {
    const result = await education.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,fonction} = await result.data;
        const convertedEducation  = {
            id: _id,
            isActive,
            title,
            describe,
            imageUrl,
            pdfUrl,
            fonction,
        }
        await dispatch(showEducation (convertedEducation ))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowEducationsApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await education.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(education => {
          return {
              isActive : education.isActive,
              title: education.title,
              id: education._id,
              describe: education.describe,
              fonction: education.fonction,
              imageUrl: education.imageUrl,
              pdfUrl: education.pdfUrl,
              selectedClients: education.selectedClients || [],
          };
      });

      // Dispatch des données converties
      await dispatch(showEducations(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching educations:", error);
      return error;
  }
};





export const deleteEducation = (id)=>{
   return {
       type: "DELETE_EDUCATION",
       payload: id
   }
}

export const deleteEducationApi = (id,token) =>  async dispatch=> {
    const result = await education.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteEducation(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addEducation = (newEducation)=>{
    return{
      type: "ADD_EDUCATION",
      payload: newEducation
    }
}


export const addEducationApi = (values, token) => async (dispatch) => {
    const {
      isActive,
      title,
      selectedClients,
      describe,
      imageUrl,
      pdfUrl,
      fonction,

    } = values;
  
    try {
      const response = await education.post(
        "/",
        {
          isActive,
          title,
          selectedClients,
          describe,
          imageUrl,
          pdfUrl,
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
        dispatch(addEducation(response.data));
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
  




export const listEducationDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: EDUCATION_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/educations/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: EDUCATION_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: EDUCATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateEducationApi2 = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'EDUCATION_UPDATE_REQUEST',
    });

    // Getting the token from the state
    const { token } = getState();

    // Making the API call
    const { data } = await axios.put(
      `/api/educations/${id}/update`,
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
      type: 'EDUCATION_UPDATE_SUCCESS',
      payload: data,
    });
    return "response was successful";
    // Optional: Show a success message using a toast
    toast.success('EDUCATION updated successfully!', {
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
      type: 'EDUCATION_UPDATE_FAIL',
      payload: message,
    });
  }
};

export const updateEducationApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'EDUCATION_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/educations/${id}/update`,
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
      type: 'EDUCATION_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('EDUCATION updated successfully!', {
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
      type: 'EDUCATION_UPDATE_FAIL',
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



export const updateEducationStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/educations/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_EDUCATION_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update education status:', error.response || error);
    dispatch({
      type: 'UPDATE_EDUCATION_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
