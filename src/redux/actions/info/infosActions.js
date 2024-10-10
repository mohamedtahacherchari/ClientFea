
//import { event } from "../Axios/event"
import { info } from "../../Axios/info"
import * as moment from "moment"
import axios from 'axios'
import { addError, removeError } from "./errorsAction"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { INFO_DETAILS_FAIL, INFO_DETAILS_REQUEST,
     INFO_DETAILS_SUCCESS } from "../servantActions/constant/constantZervant/infoConstant"
export const showInfo = (info)=>{
    console.log("info to be shown on the modal: ", info)
    return{
        type: "SHOW_INFO",
        payload: info
    }
}

export const showInfos = (infos)=>{
    
    return{
        type: "SHOW_INFOS",
        payload: infos
    }
}

export const ShowInfoApi = (id ,token) => async dispatch => {
     
    //i won't get the info from redux store as it is safer to
    //keep updated with db.
    const result = await info.get(`/${id}/show`,
    {
        headers: {Authorization: token}
    }
    );

    try{
        const {title, _id, start, end,type, describe ,youtubeLink, imageUrl, pdfUrl, googleDriveVideoUrl,iconeUrl} = await result.data;
        const convertedInfo = {
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
            iconeUrl
        }
        await dispatch(showInfo(convertedInfo))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowInfosApi= (token) => async dispatch => {
     console.log("started fetching the api")
    //i won't get the info from redux store as it is safer to
    //keep updated with db.
    const result = await info.get("/",
    {
        headers: {Authorization: token}
    }
    );

    try{
        const convertedDates = await result.data.map(info=>{
            return{
              title: info.title,
              start: new Date(info.start) ,
              end: new Date(info.end) ,
              id: info._id,
              type : info.type,
              describe: info.describe,
              imageUrl: info.imageUrl,
              pdfUrl: info.pdfUrl,
              youtubeLink : info.youtubeLink,
              googleDriveVideoUrl: info.googleDriveVideoUrl,
              iconeUrl: info.iconeUrl

            }
          })
        await dispatch(showInfos(convertedDates))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}


export const ShowInfosApi2 = (token) => async dispatch => {
    console.log("started fetching the api")
    try {
        // Fetch infos from the API
        const result = await info.get("/", {
            headers: {Authorization: token}
        });

        // Extract infos data from the response
        const infos = result.data;

        // Dispatch action to update Redux store with infos data
        dispatch(showInfos(infos));
    } catch (err) {
        const error = err.response.data.message;
        console.error("Error fetching infos:", error);
        // Dispatch action to handle error
        dispatch(addError(error));
    }
}



export const deleteInfo = (id)=>{
   return {
       type: "DELETE_INFO",
       payload: id
   }
}

export const deleteInfoApi = (id,token) =>  async dispatch=> {
    const result = await info.delete(`/${id}/delete`,
    
    {
        headers: {Authorization: token}
    }
    )

    try {
        const deleted = await result.data;
        await dispatch(deleteInfo(id))
        return {deleted}
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return {message}
    }
}



const addInfo = (newInfo)=>{
    return{
      type: "ADD_INFO",
      payload: newInfo
    }
}


export const addInfoApi = (values,token) => async dispatch =>{
    const {title,start,end,describe,type,youtubeLink,imageUrl,pdfUrl,googleDriveVideoUrl,iconeUrl} = values;
    const result = await info.post("/",
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
        iconeUrl
    },
       {
        'Content-Type': 'application/json',
        headers: {Authorization: token}
    })
       .then(res=>{
        
        if(res && res.data){
            console.log("info from the api going to the reducer: ", res.data)
            dispatch(addInfo(res.data)) 
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


const updateInfo = (updatedInfo)=>{
    return{
      type: "UPDATE_INFO",
      payload: updatedInfo
    }
}

/*export const updateInfoApi = (values, id, token) => async dispatch =>{
    try{
        const result = await info.put(`/${id}/update`, {
            title: values.title,
            //start: values.start,
            //end: values.end,
            type : values.type,
            describe: values.describe,
            youtubeLink : values.youtubeLink,
            imageUrl : values.imageUrl,
            pdfUrl : values.pdfUrl,
            googleDriveVideoUrl : values.googleDriveVideoUrl,
            iconeUrl : values.iconeUrl

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
 
}

export const listInfoDetails = (id) => async (dispatch,getState) => {
    try {
      

      dispatch({type:INFO_DETAILS_REQUEST })
     
      const { 
        token,
    } = getState()

      const {data} = await axios.get(`/api/infos/${id}`,{
        headers: {Authorization: token}
    })

      dispatch({
        type: INFO_DETAILS_SUCCESS,
        payload: data ,
      })
    } catch (error) {
      dispatch({
        type: INFO_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }*/

    export const updateInfoApi = (values, id) => async (dispatch, getState) => {
        try {
          // Dispatching the request action
          dispatch({
            type: 'INFO_UPDATE_REQUEST',
          });
      
          // Getting the token from the state
          const {token} = getState();
      
          // Making the API call
          const { data } = await axios.put(
            `/api/infos/${id}/update`,
            {
              title: values.title,
             // start: values.start,
              //end: values.end,
              type: values.type,
              describe: values.describe,
              youtubeLink: values.youtubeLink,
              imageUrl: values.imageUrl,
              pdfUrl: values.pdfUrl,
              googleDriveVideoUrl: values.googleDriveVideoUrl,
              selectedClients: values.selectedClients,
              iconeUrl: values.iconeUrl
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
            type: 'INFO_UPDATE_SUCCESS',
            payload: data,
          });
          return "response was successful";
          // Optional: Show a success message using a toast
          toast.success('Info updated successfully!', {
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
            type: 'INFO_UPDATE_FAIL',
            payload: message,
          });
        }
      };
      
      export const listInfoDetails = (id) => async (dispatch,getState) => {
          try {
            
      
            dispatch({type:INFO_DETAILS_REQUEST })
           
            const { 
              token,
          } = getState()
      
            const {data} = await axios.get(`/api/infos/${id}`,{
              headers: {Authorization: token}
          })
      
            dispatch({
              type: INFO_DETAILS_SUCCESS,
              payload: data ,
            })
          } catch (error) {
            dispatch({
              type: INFO_DETAILS_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }
        }