import axios from 'axios'
import ACTIONS from '../index'
import { toast } from 'react-toastify';
import{
    DEVIS_CREATE_FAIL, 
    DEVIS_CREATE_REQUEST, 
    DEVIS_CREATE_SUCCESS, 
    DEVIS_DETAILS_FAIL, 
    DEVIS_DETAILS_REQUEST, 
    DEVIS_DETAILS_SUCCESS, 
    DEVIS_LIST_FAIL, 
    DEVIS_LIST_REQUEST,
    DEVIS_LIST_SUCCESS,
    DEVIS_UPDATE_FAIL,
    DEVIS_UPDATE_REQUEST,
    DEVIS_UPDATE_SUCCESS,
} 
from '../../actions/servantActions/constant/constantZervant/devisConstant'




      export const fetchAllInfo = async (token) => {
        const res = await axios.get('/api/infos/', {
            headers: {Authorization: token}
        })

        console.log(res.data)
        return res
    }
    
    export const dispatchGetAllInfos = (res) => {
        return {
            type: ACTIONS.GET_ALL_INFO,
            payload: res.data
 

        }

    }
   

    export const updateInfo = (info) => async (dispatch, getState) => {
        try {
          dispatch({
            type: INFO_UPDATE_REQUEST,
          })
          const { 
                token,
            } = getState()
            const { data } = await axios.put(
            `/api/infos/${info._id}`,
            devis,{
                headers: {Authorization: token}
            }
          )
    
    
          console.log(data)
          dispatch({
            type: INFO_UPDATE_SUCCESS,
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
          dispatch({ type: INFO_DETAILS_SUCCESS, payload: data })
          
       
    
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
         
          dispatch({
            type: INFO_UPDATE_FAIL,
            payload: message,
          })
        }
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
            type: INFOS_DETAILS_SUCCESS,
            payload: data ,
          })
        } catch (error) {
          dispatch({
            type: INFOS_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        }
      }


      export const createInfo = (info) => async (dispatch, getState,token) => {

        try {
            dispatch({
                type: INFO_CREATE_REQUEST,
            })
            const { 
                token,
            } = getState()
        
            const { data } = await axios.post('/api/infos/addinfos',devis, {
                headers: {Authorization: token}
            })
            
            console.log(data)
                    
            dispatch({
                type: DEVIS_CREATE_SUCCESS,
                payload: data,
            })
        
            toast.success('Info ajoutée avec succé' , {
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
                type: INFO_CREATE_FAIL,
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


        export const listinfo = (keyword = '') => async (
          dispatch
        ) => {
          try {
            dispatch({ type: INFO_LIST_REQUEST })
        
            const { data } = await axios.get(
              `/api/infos?keyword=${keyword}`
            )
        
            dispatch({
              type: INFO_LIST_SUCCESS,
              payload: data,
            })
          } catch (error) {
            dispatch({
              type: INFO_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }
        }
        



