import axios from 'axios'
import ACTIONS from '../index'
import { toast } from 'react-toastify';
import{
    CLIENTF_CREATE_FAIL, 
    CLIENTF_CREATE_REQUEST, 
    CLIENTF_CREATE_SUCCESS, 
    CLIENTF_DELETE_FAIL, 
    CLIENTF_DELETE_REQUEST, 
    CLIENTF_DELETE_SUCCESS, 
    CLIENTF_DETAILS_FAIL, 
    CLIENTF_DETAILS_REQUEST, 
    CLIENTF_DETAILS_SUCCESS, 
    CLIENTF_LIST_FAIL, 
    CLIENTF_LIST_REQUEST,
    CLIENTF_LIST_SUCCESS,
    CLIENTF_UPDATE_FAIL,
    CLIENTF_UPDATE_REQUEST,
    CLIENTF_UPDATE_SUCCESS
} 
from '../../actions/servantActions/constant/constantZervant/clientfConstant'




      export const fetchAllClientf = async (token) => {
        const res = await axios.get('/api/clientf/', {
            headers: {Authorization: token}
        })
        return res
    }
    
    export const dispatchGetAllClientf = (res) => {
        return {
            type: ACTIONS.GET_ALL_CLIENTF,
            payload: res.data
        }
    }


    export const updateClientf = (clientf) => async (dispatch, getState) => {
      console.log("hello")
        try {
          dispatch({
            type: CLIENTF_UPDATE_REQUEST,
          })
          const { 
                token,
            } = getState()
            const { data } = await axios.put(
            `/api/clientf/${clientf._id}`,
            clientf,{
                headers: {Authorization: token}
            }
          )
          console.log(clientf._id)
          console.log(data)
          dispatch({
            type: CLIENTF_UPDATE_SUCCESS,
            payload: data,
          })
    
          toast.success('updated avec succé' , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({ type: CLIENTF_DETAILS_SUCCESS, payload: data })
          
       
    
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
         
          dispatch({
            type: CLIENTF_UPDATE_FAIL,
            payload: message,
          })
        }
      }



      export const listClientfDetails = (id) => async (dispatch,getState) => {
        try {
          

          dispatch({type:CLIENTF_DETAILS_REQUEST })
         
          const { 
            token,
        } = getState()

          const {data} = await axios.get(`/api/clientf/${id}`,{
            headers: {Authorization: token}
        })
           
          dispatch({
            type: CLIENTF_DETAILS_SUCCESS,
            payload: data ,
          })
        } catch (error) {
          dispatch({
            type: CLIENTF_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        }
      }


      export const createClientf = (clientf) => async (dispatch, getState,token) => {

        try {
            dispatch({
                type: CLIENTF_CREATE_REQUEST,
            })
            const { 
                token,
            } = getState()
        
            const { data } = await axios.post('/api/clientf/addclientf',clientf, {
                headers: {Authorization: token}
            })
            
            console.log(data)
                    
            dispatch({
                type: CLIENTF_CREATE_SUCCESS,
                payload: data,
            })
        
            toast.success('Client ajoutée avec succé' , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        
        } catch (error) {
            console.log(error)
            const message =
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
            dispatch({
                type: CLIENTF_CREATE_FAIL,
                payload: message,
            })
            toast.error("Error ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        
        }
        }


        export const listclientfs = (keyword = '') => async (
          dispatch
        ) => {
          try {
            dispatch({ type: CLIENTF_LIST_REQUEST })
        
            const { data } = await axios.get(
              `/api/clientf?keyword=${keyword}`
            )
        
            dispatch({
              type: CLIENTF_LIST_SUCCESS,
              payload: data,
            })
          } catch (error) {
            dispatch({
              type: CLIENTF_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }
        }
        