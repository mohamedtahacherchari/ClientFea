
//import { event } from "../Axios/event"
import {event} from "../../Axios/event"
import * as moment from "moment"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{
   EVENT_CREATE_FAIL, 
   EVENT_CREATE_REQUEST, 
   EVENT_CREATE_SUCCESS, 
   EVENT_DELETE_FAIL, 
   EVENT_DELETE_REQUEST, 
   EVENT_DELETE_SUCCESS, 
   EVENT_DETAILS_FAIL, 
   EVENT_DETAILS_REQUEST, 
   EVENT_DETAILS_SUCCESS, 
   EVENT_LASTTOTAL_FAIL, 
   EVENT_LASTTOTAL_REQUEST, 
   EVENT_LASTTOTAL_SUCCESS, 
   EVENT_LIST_FAIL, 
   EVENT_LIST_REQUEST,
   EVENT_LIST_SUCCESS,
   EVENT_UPDATE_FAIL,
   EVENT_UPDATE_REQUEST,
   EVENT_UPDATE_SUCCESS,
    ENVOYER_MAIL_SUCCESS,
    ENVOYER_MAIL_FAILURE,
    ENVOYER_MAIL2_SUCCESS,
    ENVOYER_MAIL2_FAILURE,
    ENVOYER_MAIL3_SUCCESS,
    ENVOYER_MAIL3_FAILURE,
    ENVOYER_MAIL4_SUCCESS,
    ENVOYER_MAIL4_FAILURE,
    ENVOYER_MAIL5_SUCCESS,
    ENVOYER_MAIL5_FAILURE,

} 
from '../../actions/servantActions/constant/constantZervant/eventConstant'
import { addError, removeError } from "./errorsAction"
import { useNavigate } from "react-router-dom"
export const showEvent = (event)=>{
    console.log("event to be shown on the modal: ", event)
    return{
        type: "SHOW_EVENT",
        payload: event
    }
}

export const showEvents = (events)=>{
    
    return{
        type: "SHOW_EVENTS",
        payload: events
    }
}

export const ShowEventApi = (id ,token) => async dispatch => {
     
    //i won't get the event from redux store as it is safer to
    //keep updated with db.
    const result = await event.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {title, _id, start, end,type, describe ,youtubeLink, imageUrl, pdfUrl, googleDriveVideoUrl,selectedClients} = await result.data;
        const convertedEvent = {
            id: _id,
            title,
            type,
            describe,
            start: moment(start).format("ddd DD MMM YY LT"),
            end: moment(end).format("ddd DD MMM YY LT"),
            describe,
            type,
            youtubeLink,
            imageUrl,
            pdfUrl,
            googleDriveVideoUrl,
            selectedClients
        }
        await dispatch(showEvent(convertedEvent))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

/*export const ShowEventsApi= (token) => async dispatch => {
     console.log("started fetching the api")
    //i won't get the event from redux store as it is safer to
    //keep updated with db.
    const result = await event.get("/",
    {
        headers: {Authorization: token}
    }
    );

    try{
        const convertedDates = await result.data.map(event=>{
            return{
              title: event.title,
              start: new Date(event.start) ,
              end: new Date(event.end) ,
              id: event._id,
              type : event.type,
              describe: event.describe,
              imageUrl: event.imageUrl,
              pdfUrl: event.pdfUrl,
              youtubeLink : event.youtubeLink,
              googleDriveVideoUrl: event.googleDriveVideoUrl,
              selectedClients : event.selectedClients
            }
          })
        await dispatch(showEvents(convertedDates))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}
*/

export const ShowEventsApi = (token) => async (dispatch) => {
    try {
      console.log("started fetching the API");
   
      // Appel à l'API pour récupérer les événements
      const result = await event.get("/", {
        headers: { Authorization: token },
      });
      console.log("Received event:", result.data);
      console.log("Token:", token);

      // Vérifiez si la réponse contient des données
      if (result && result.data) {
        const convertedDates = result.data.map((event) => {
          return {
            title: event.title,
            start: event.start ? new Date(event.start) : null, // Vérification des dates
            end: event.end ? new Date(event.end) : null,       // Vérification des dates
            id: event._id,
            type: event.type || "No type provided", // Ajout de valeur par défaut si non défini
            describe: event.describe || "No description provided", // Ajout de valeur par défaut
            imageUrl: event.imageUrl || "",
            pdfUrl: event.pdfUrl || "",
            youtubeLink: event.youtubeLink || "",
            googleDriveVideoUrl: event.googleDriveVideoUrl || "",
            selectedClients: event.selectedClients || [],
            

          };
        }
    );
    console.log("Received event:", result.data);

        // Dispatch de l'action pour mettre à jour les événements dans Redux
        dispatch(showEvents(convertedDates));
      } else {
        console.error("No data received from API");
        return "No data received from API";
      }
    } catch (err) {
      // Gestion des erreurs de manière plus robuste
      console.error("Error fetching events from API:", err.message);
      return err.message;
    }
  };
  

export const ShowEventsApi2 = (token) => async dispatch => {
    console.log("started fetching the api")
    try {
        // Fetch events from the API
        const result = await event.get("/", {
            headers: {Authorization: token}
        });

        // Extract events data from the response
        const events = result.data;

        // Dispatch action to update Redux store with events data
        dispatch(showEvents(events));
    } catch (err) {
        const error = err.response.data.message;
        console.error("Error fetching events:", error);
        // Dispatch action to handle error
        dispatch(addError(error));
    }
}



export const deleteEvent = (id)=>{
   return {
       type: "DELETE_EVENT",
       payload: id
   }
}

export const deleteEventApi = (id,token) =>  async dispatch=> {
    const result = await event.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteEvent(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addEvent = (newEvent)=>{
    return{
      type: "ADD_EVENT",
      payload: newEvent
    }
}


export const addEventApi2 = (values,token) => async dispatch =>{
    const {title,start,end,describe,type,youtubeLink,imageUrl,pdfUrl,googleDriveVideoUrl,selectedClients} = values;
    console.log(selectedClients)
    const result = await event.post("/",
    {
        title,
        start,
        end,
        describe,
        type,
        youtubeLink,
        imageUrl,
        pdfUrl,
        googleDriveVideoUrl,
        selectedClients
    },
       {
        'Content-Type': 'application/json',
        headers: {Authorization: token}
    })
       .then(res=>{
        
        if(res && res.data){
            console.log("event from the api going to the reducer: ", res.data)
            dispatch(addEvent(res.data)) 
            dispatch(removeError())
            
            return  "success";
        }
       })
       .catch(res=>{
        console.log("catch response, ", res)
        if(res.response.data){
            
            console.log(res.response.data)
            dispatch(addError(res.response.data));
        }
    })
       
}
export const addEventApi = (values, token) => async (dispatch) => {
  const {
    title,
    start,
    end,
    describe,
    type,
    youtubeLink,
    imageUrl,
    pdfUrl,
    googleDriveVideoUrl,
    selectedClients,
  } = values;

  console.log(selectedClients);

  try {
    const response = await event.post(
      "/",
      {
        title,
        start,
        end,
        describe,
        type,
        youtubeLink,
        imageUrl,
        pdfUrl,
        googleDriveVideoUrl,
        selectedClients,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    if (response && response.data) {
      console.log("Événement de l'API envoyé au reducer :", response.data);
      dispatch(addEvent(response.data));
      dispatch(removeError());
      return "success"; // Retourne success
    }
  } catch (error) {
    console.error("L'appel API a échoué :", error);

    // Vérifie s'il y a une réponse d'erreur du serveur
    if (error.response && error.response.data) {
      console.error("Données de réponse d'erreur :", error.response.data);
      dispatch(addError(error.response.data));
    } else {
      console.error("Erreur inattendue :", error);
      dispatch(addError("Une erreur inattendue est survenue"));
    }

    return "error"; // Retourne error
  }
};

const updateEvent = (updatedEvent)=>{
    return{
      type: "UPDATE_EVENT",
      payload: updatedEvent
    }
}

/*export const updateEventApi = (values, id, token) => async dispatch =>{
    try{
        const result = await event.put(`/${id}/update`, {
            title: values.title,
            start: values.start,
            end: values.end,
            type : values.type,
            describe: values.describe,
            youtubeLink : values.youtubeLink,
            imageUrl : values.imageUrl,
            pdfUrl : values.pdfUrl,
            googleDriveVideoUrl : values.googleDriveVideoUrl,
            selectedClients : values.selectedClients
          },
          {
            'Content-Type': 'application/json',
            headers: {Authorization: token}
        }
          )
         console.log(result)
          const response = result.data;
          dispatch(removeError())
          return "response was successful";
    }catch(err){
        console.log(err)
        dispatch(addError(err.response.data));
    }

    //    .then(res=>{
    //        console.log(res)
    //     if(res && res.data){
            
    //         console.log(res.data)
    //         
    //         return;
    //     }else{
    //         if(res.response.data){
    //             console.log(res.response.data)
    //         }
    //     }
    //    })
 
}*/

export const updateEventApi = (values, id) => async (dispatch, getState) => {
  try {
    // Dispatching the request action
    dispatch({
      type: 'EVENT_UPDATE_REQUEST',
    });

    // Getting the token from the state
    const { token } = getState();

    // Making the API call
    const { data } = await axios.put(
      `/api/events/${id}/update`,
      {
        title: values.title,
        start: values.start,
        end: values.end,
        type: values.type,
        describe: values.describe,
        youtubeLink: values.youtubeLink,
        imageUrl: values.imageUrl,
        pdfUrl: values.pdfUrl,
        googleDriveVideoUrl: values.googleDriveVideoUrl,
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
      type: 'EVENT_UPDATE_SUCCESS',
      payload: data,
    });
    return "response was successful";
    // Optional: Show a success message using a toast
    toast.success('Event updated successfully!', {
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
      type: 'EVENT_UPDATE_FAIL',
      payload: message,
    });
  }
};

export const listEventDetails = (id) => async (dispatch,getState) => {
    try {
      

      dispatch({type:EVENT_DETAILS_REQUEST })
     
      const { 
        token,
    } = getState()

      const {data} = await axios.get(`/api/events/${id}`,{
        headers: {Authorization: token}
    })

      dispatch({
        type: EVENT_DETAILS_SUCCESS,
        payload: data ,
      })
    } catch (error) {
      dispatch({
        type: EVENT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }