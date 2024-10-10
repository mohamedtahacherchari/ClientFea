
import {voyage} from "../../Axios/voyage"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import {VOYAGE_DETAILS_FAIL, 
  VOYAGE_DETAILS_REQUEST, 
  VOYAGE_DETAILS_SUCCESS }
  from "../servantActions/constant/constantZervant/voyageConstant"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showVoyage = (voyage)=>{
    console.log("info to be shown on the modal: ",voyage)
    return{
        type: "SHOW_VOYAGE  ",
        payload: voyage
    }
}

export const showVoyages = (voyages)=>{
    
    return{
        type: "SHOW_VOYAGES",
        payload: voyages
    }
}

export const ShowVoyageApi = (id ,token) => async dispatch => {
    const result = await voyage.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {isActive,title,_id,describe , imageUrl, pdfUrl,pdfUrl2,pdfUrl3,fonction,youtubeLink } = await result.data;
        const convertedVoyage  = {
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
        await dispatch(showVoyage (convertedVoyage))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowVoyagesApi = (token) => async dispatch => {
  console.log("Started fetching the API");

  try {
      const result = await voyage.get("/", {
          headers: { Authorization: token }
      });

      // Convertir les données uniquement si la requête a réussi
      const convertedDates = result.data.map(voyage => {
          return {
              isActive : voyage.isActive,
              title: voyage.title,
              id: voyage._id,
              //describe: entraide.describe,
              fonction: voyage.fonction,
              imageUrl: voyage.imageUrl,
              pdfUrl: voyage.pdfUrl,
              pdfUrl2: voyage.pdfUrl2,
              pdfUrl3: voyage.pdfUrl3,
              selectedClients: voyage.selectedClients || [],
              

          };
      });

      // Dispatch des données converties
      await dispatch(showVoyages(convertedDates));

  } catch (err) {
      // Gestion des erreurs
      const error = err.response?.data?.message || err.message;
      console.error("Error fetching voyages:", error);
      return error;
  }
};





export const deleteVoyage = (id)=>{
   return {
       type: "DELETE_VOYAGE",
       payload: id
   }
}

export const deleteVoyageApi = (id,token) =>  async dispatch=> {
    const result = await voyage.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteVoyage(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addVoyage = (newVoyage)=>{
    return{
      type: "ADD_VOYAGE",
      payload: newVoyage
    }
}


export const addVoyageApi = (values, token) => async (dispatch) => {
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
  

  } = values;

  try {
    const response = await voyage.post(
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
      dispatch(addVoyage(response.data));
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
  




export const listVoyageDetails = (id) => async (dispatch,getState) => {
  try {
    

    dispatch({type: VOYAGE_DETAILS_REQUEST })
   
    const { 
      token,
  } = getState()

    const {data} = await axios.get(`/api/voyages/${id}`,{
      headers: {Authorization: token}
  })

    dispatch({
      type: VOYAGE_DETAILS_SUCCESS,
      payload: data ,
    })
  } catch (error) {
    dispatch({
      type: VOYAGE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const updateVoyageApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'VOYAGE_UPDATE_REQUEST',
    });

    const { token } = getState();


    if (!token) {
      throw new Error("No token found");
    }

    // Making the API call
    const { data } = await axios.put(
      `/api/voyages/${id}/update`,
      {
        isActive: values.isActive,
        title: values.title,
        fonction: values.fonction,
        imageUrl: values.imageUrl,
        pdfUrl: values.pdfUrl,
        pdfUrl2 : values.pdfUrl2,
        pdfUrl3: values.pdfUrl3,
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
      type: 'VOYAGE_UPDATE_SUCCESS',
      payload: data,
    });

    toast.success('VOYAGE updated successfully!', {
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
      type: 'VOYAGE_UPDATE_FAIL',
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



export const updateVoyageStatus = (id, isActive) => async (dispatch, getState) => {
  try {
    const token = getState().token;
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/voyages/${id}/status`,
      { isActive },
      
      config
    );
console.log(isActive)
    dispatch({
      type: 'UPDATE_VOYAGE_STATUS_SUCCESS',
      payload: data, // Mettez à jour le payload avec la réponse du serveur
    });

  } catch (error) {
    console.error('Failed to update voyage status:', error.response || error);
    dispatch({
      type: 'UPDATE_VOYAGE_STATUS_FAIL',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
