import axios from 'axios'
import ACTIONS from '../index'
import { toast } from 'react-toastify';
import{
    DEVIS_CREATE_FAIL, 
    DEVIS_CREATE_REQUEST, 
    DEVIS_CREATE_SUCCESS, 
    FACTURE_DELETE_FAIL, 
    FACTURE_DELETE_REQUEST, 
    FACTURE_DELETE_SUCCESS, 
    DEVIS_DETAILS_FAIL, 
    DEVIS_DETAILS_REQUEST, 
    DEVIS_DETAILS_SUCCESS, 
    DEVIS_LIST_FAIL, 
    DEVIS_LIST_REQUEST,
    DEVIS_LIST_SUCCESS,
    DEVIS_UPDATE_FAIL,
    DEVIS_UPDATE_REQUEST,
    DEVIS_UPDATE_SUCCESS,
    ENVOYER_MAIL_SUCCESS,
    ENVOYER_MAIL_FAILURE,
    ENVOYER_MAIL2_SUCCESS,
    ENVOYER_MAIL2_FAILURE,
    ENVOYER_MAIL3_SUCCESS,
    ENVOYER_MAIL3_FAILURE,
    ENVOYER_MAIL4_SUCCESS,
    ENVOYER_MAIL4_FAILURE,
    ENVOYER_MAIL5_SUCCESS,
    ENVOYER_MAIL5_FAILURE
} 
from '../../actions/servantActions/constant/constantZervant/devisConstant'

const axiosInstance = axios.create({
  baseURL : process.env.REACT_APP_SERVER_URL,
});


      export const fetchAllDevis = async (token) => {
        const res = await axios.get('/api/devis/', {
            headers: {Authorization: token}
        })

        console.log(res.data)
        return res
    }
    
    export const dispatchGetAllDevis = (res) => {
        return {
            type: ACTIONS.GET_ALL_DEVIS,
            payload: res.data
 

        }

    }
   

    export const updateDevis = (devis) => async (dispatch, getState) => {
        try {
          dispatch({
            type: DEVIS_UPDATE_REQUEST,
          })
          const { 
                token,
            } = getState()
            const { data } = await axios.put(
            `/api/devis/${devis._id}`,
            devis,{
                headers: {Authorization: token}
            }
          )
    
    
          console.log(data)
          dispatch({
            type: DEVIS_UPDATE_SUCCESS,
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
          dispatch({ type: DEVIS_DETAILS_SUCCESS, payload: data })
          
       
    
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
         
          dispatch({
            type: DEVIS_UPDATE_FAIL,
            payload: message,
          })
        }
      }



      export const listDevisDetails = (id) => async (dispatch,getState) => {
        try {
          

          dispatch({type:DEVIS_DETAILS_REQUEST })
         
          const { 
            token,
        } = getState()

          const {data} = await axios.get(`/api/devis/${id}`,{
            headers: {Authorization: token}
        })

          dispatch({
            type: DEVIS_DETAILS_SUCCESS,
            payload: data ,
          })
        } catch (error) {
          dispatch({
            type: DEVIS_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        }
      }


      export const createDevis = (devis) => async (dispatch, getState,token) => {

        try {
            dispatch({
                type: DEVIS_CREATE_REQUEST,
            })
            const { 
                token,
            } = getState()
        
            const { data } = await axios.post('/api/devis/adddevis',devis, {
                headers: {Authorization: token}
            })
            
            console.log(data)
                    
            dispatch({
                type: DEVIS_CREATE_SUCCESS,
                payload: data,
            })
        
            toast.success('Devis ajoutée avec succé' , {
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
                type: DEVIS_CREATE_FAIL,
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


        export const listdevis = (keyword = '') => async (
          dispatch
        ) => {
          try {
            dispatch({ type: DEVIS_LIST_REQUEST })
        
            const { data } = await axios.get(
              `/api/devis?keyword=${keyword}`
            )
        
            dispatch({
              type: DEVIS_LIST_SUCCESS,
              payload: data,
            })
          } catch (error) {
            dispatch({
              type: DEVIS_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }
        }
        
export const envoyerMailSansRemise = (id,token,pdfData) => async (dispatch) => {
          try {
            const res = await axios.post(`/api/devis/sendMailwithoutDelivery/${id}`,{pdfData}, {
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


 export const envoyerMailAvecRemiseTotalEnPourcentage = (id, token,pdfData) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/devis/sendMailwithDeliveryTotalInPercentage/${id}`,{pdfData}, {
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
        
export const envoyerMailAvecRemiseTotalEnDevise = (id, token,pdfData) => async (dispatch) => {
          try {
            const res = await axios.post(`/api/devis/sendMailwithDeliveryTotalInDevise/${id}`, {pdfData},{
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
export const envoyerMailAvecRemiseParLigneEnPourcentage = (id, token,pdfData) => async (dispatch) => {
                try {
                  const res = await axios.post(`/api/devis/sendMailwithDeliveryParLigneInPercentage/${id}`,{pdfData},{
                  headers: { Authorization: token },});
                  console.log(res.data);
                  console.log(pdfData);

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

export const envoyerMailAvecRemiseParLigneEnDevise = (id, token,pdfData) => async (dispatch) => {
        try {
        const res = await axios.post(`/api/devis/sendMailwithDeliveryParLigneInDevise/${id}`,{pdfData}, {
        headers: { Authorization: token },});
        console.log(res.data);
        console.log(pdfData);

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