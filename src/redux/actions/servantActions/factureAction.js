import axios from 'axios'
import ACTIONS from '../index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{
    FACTURE_CREATE_FAIL, 
    FACTURE_CREATE_REQUEST, 
    FACTURE_CREATE_SUCCESS, 
    FACTURE_DELETE_FAIL, 
    FACTURE_DELETE_REQUEST, 
    FACTURE_DELETE_SUCCESS, 
    FACTURE_DETAILS_FAIL, 
    FACTURE_DETAILS_REQUEST, 
    FACTURE_DETAILS_SUCCESS, 
    FACTURE_LASTTOTAL_FAIL, 
    FACTURE_LASTTOTAL_REQUEST, 
    FACTURE_LASTTOTAL_SUCCESS, 
    FACTURE_LIST_FAIL, 
    FACTURE_LIST_REQUEST,
    FACTURE_LIST_SUCCESS,
    FACTURE_UPDATE_FAIL,
    FACTURE_UPDATE_REQUEST,
    FACTURE_UPDATE_SUCCESS,
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
from '../../actions/servantActions/constant/constantZervant/factureConstant'
const axiosInstance = axios.create({
  baseURL : process.env.REACT_APP_SERVER_URL,
});



      export const fetchAllFacture = async (token) => {
        const res = await axios.get('/api/facture/', {
            headers: {Authorization: token}
        })

        console.log(res.data)
        return res
    }
    
    export const dispatchGetAllFacture = (res) => {
        return {
            type: ACTIONS.GET_ALL_FACTURE,
            payload: res.data

        }
    
    }


    export const updateFacture = (facture) => async (dispatch, getState) => {
        try {
          dispatch({
            type: FACTURE_UPDATE_REQUEST,
          })
          const {token,} = getState()
            const { data } = await axios.put(
            `/api/facture/${facture._id}`,
            facture,{
                headers: {Authorization: token}
            }
          )
    
    
          console.log(data)
          dispatch({
            type: FACTURE_UPDATE_SUCCESS,
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
          dispatch({ type: FACTURE_DETAILS_SUCCESS, payload: data })
          
       
    
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
         
          dispatch({
            type: FACTURE_UPDATE_FAIL,
            payload: message,
          })
        }
      }



      export const listFactureDetails = (id) => async (dispatch,getState) => {
        try {
          

          dispatch({type:FACTURE_DETAILS_REQUEST })
         
          const { 
            token,
        } = getState()

          const {data} = await axios.get(`/api/facture/${id}`,{
            headers: {Authorization: token}
        })

          dispatch({
            type: FACTURE_DETAILS_SUCCESS,
            payload: data ,
          })
        } catch (error) {
          dispatch({
            type: FACTURE_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        }
      }


      export const createFacture = (facture) => async (dispatch, getState,token) => {

        try {
            dispatch({
                type: FACTURE_CREATE_REQUEST,
            })
            const { 
                token,
            } = getState()
        
            const { data } = await axios.post('/api/facture/addfacture',facture, {
                headers: {Authorization: token}
            })
            
            console.log(data)
                    
            dispatch({
                type: FACTURE_CREATE_SUCCESS,
                payload: data,
            })
        
            toast.success('Facture ajoutée avec succé' , {
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
                type: FACTURE_CREATE_FAIL,
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


        export const listfactures = (keyword = '') => async (
          dispatch
        ) => {
          try {
            dispatch({ type: FACTURE_LIST_REQUEST })
        
            const { data } = await axios.get(
              `/api/facture?keyword=${keyword}`
            )
        
            dispatch({
              type: FACTURE_LIST_SUCCESS,
              payload: data,
            })
          } catch (error) {
            dispatch({
              type: FACTURE_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }

        }
        
        export const fetchLastTotal = (id) => async (dispatch, getState) => {
          try {
            dispatch({
              type: FACTURE_LASTTOTAL_REQUEST,
            })

            const { 
              token,
          } = getState()
  
        
            const config = {
              headers: {Authorization: token}

            }
        
            await axios.get(`/api/facture/${id}/last-total`, config)
        
            dispatch({
              type:  FACTURE_LASTTOTAL_SUCCESS,
            })
          } catch (error) {
            const message =
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            if (message === 'Not authorized, token failed') {
              //dispatch(logout())
            }
            dispatch({
             type:  FACTURE_LASTTOTAL_FAIL,
              payload: message,
            })
          }
        }


export const envoyerMailSansRemise = (id,token,pdfData) => async (dispatch) => {
          try {
            const res = await axios.post(`/api/facture/sendMailwithoutDelivery/${id}`,{pdfData}, {
              headers: {Authorization: token }});
            console.log(res.data);


    toast.success('Le message a été envoyé avec succès.' , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
            // Dispatch d'une action réussie si nécessaire
            dispatch({
              type: ENVOYER_MAIL_SUCCESS,
              payload: res.data,
            });
          } catch (error) {
            console.log(error);
                // Afficher le popup d'échec
    toast.error("Erreur lors de l\'envoi du message.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
            // Dispatch d'une action d'échec si nécessaire
            dispatch({
              type: ENVOYER_MAIL_FAILURE,
              payload: error.message,
            });
          }
        };


export const envoyerMailAvecRemiseTotalEnPourcentage = (id,token,pdfData) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/facture/sendMailwithDeliveryTotalInPercentage/${id}`,{pdfData}, {
      headers: { Authorization: token },});
      console.log(res.data);
      toast.success('Le message a été envoyé avec succès.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,});
        // Dispatch d'une action réussie si nécessaire
        dispatch({
              type: ENVOYER_MAIL2_SUCCESS,
              payload: res.data,
            });
          } catch (error) {
            console.log(error);
            // Afficher le popup d'échec
            toast.error("Erreur lors de l'envoi du message.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        
            // Dispatch d'une action d'échec si nécessaire
            dispatch({
              type: ENVOYER_MAIL2_FAILURE,
              payload: error.message,
            });
          }
        };
        
export const envoyerMailAvecRemiseTotalEnDevise = (id, token, pdfData) => async (dispatch) => {
          try {
            const res = await axios.post(`/api/facture/sendMailwithDeliveryTotalInDevise/${id}`,{pdfData}, {
            headers: { Authorization: token },});
            console.log(res.data);
            toast.success('Le message a été envoyé avec succès.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,});
              // Dispatch d'une action réussie si nécessaire
              dispatch({
                    type: ENVOYER_MAIL3_SUCCESS,
                    payload: res.data,
                  });
                } catch (error) {
                  console.log(error);
                  // Afficher le popup d'échec
                  toast.error("Erreur lors de l'envoi du message.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
              
                  // Dispatch d'une action d'échec si nécessaire
                  dispatch({
                    type: ENVOYER_MAIL3_FAILURE,
                    payload: error.message,
                  });
                }
              };
export const envoyerMailAvecRemiseParLigneEnPourcentage = (id,token, pdfData) => async (dispatch) => {
                try {
                  const res = await axios.post(`/api/facture/sendMailwithDeliveryParLigneInPercentage/${id}`,{pdfData}, {
                  headers: { Authorization: token },});
                  console.log(res.data);
                  toast.success('Le message a été envoyé avec succès.', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,});
                    // Dispatch d'une action réussie si nécessaire
                    dispatch({
                          type: ENVOYER_MAIL4_SUCCESS,
                          payload: res.data,
                        });
                      } catch (error) {
                        console.log(error);
                        // Afficher le popup d'échec
                        toast.error("Erreur lors de l'envoi du message.", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                    
                        // Dispatch d'une action d'échec si nécessaire
                        dispatch({
                          type: ENVOYER_MAIL4_FAILURE,
                          payload: error.message,
                        });
                      }
                    };

export const envoyerMailAvecRemiseParLigneEnDevise = (id, token, pdfData) => async (dispatch) => {
        try {
        const res = await axios.post(`/api/facture/sendMailwithDeliveryParLigneInDevise/${id}`,{pdfData}, {
        headers: { Authorization: token },});
        console.log(res.data);
        toast.success('Le message a été envoyé avec succès.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,});
                    // Dispatch d'une action réussie si nécessaire
                    dispatch({
                      type: ENVOYER_MAIL5_SUCCESS,
                        payload: res.data,
                              });
                            } catch (error) {
                              console.log(error);
                              // Afficher le popup d'échec
                              toast.error("Erreur lors de l'envoi du message.", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });
                          
                              // Dispatch d'une action d'échec si nécessaire
                              dispatch({
                                type: ENVOYER_MAIL5_FAILURE,
                                payload: error.message,
                              });
                            }
                          };