import ACTIONS from '../../actions/index'
import { 
    DEVIS_CREATE_FAIL,
    DEVIS_CREATE_REQUEST,
    DEVIS_CREATE_RESET, 
    DEVIS_CREATE_SUCCESS,
    DEVIS_DETAILS_FAIL, 
    DEVIS_DETAILS_REQUEST,
    DEVIS_DETAILS_SUCCESS,
    DEVIS_LIST_FAIL,
    DEVIS_LIST_REQUEST,
    DEVIS_LIST_SUCCESS,
    DEVIS_UPDATE_FAIL,
    DEVIS_UPDATE_REQUEST, 
    DEVIS_UPDATE_RESET, 
    DEVIS_UPDATE_SUCCESS,
    ENVOYER_MAIL_SUCCESS,
    ENVOYER_MAIL_FAILURE,
    ENVOYER_MAIL_REQUEST,
    ENVOYER_MAIL2_REQUEST,
    ENVOYER_MAIL2_SUCCESS,
    ENVOYER_MAIL2_FAILURE,
    ENVOYER_MAIL3_REQUEST,
    ENVOYER_MAIL3_SUCCESS,
    ENVOYER_MAIL3_FAILURE,
    ENVOYER_MAIL4_REQUEST,
    ENVOYER_MAIL4_SUCCESS,
    ENVOYER_MAIL4_FAILURE,
    ENVOYER_MAIL5_REQUEST,
    ENVOYER_MAIL5_SUCCESS,
    ENVOYER_MAIL5_FAILURE
  } 
             from '../../actions/servantActions/constant/constantZervant/devisConstant'

const devis =[]

const DevisReducer = (state = devis, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_DEVIS:
            return action.payload
        default:
            return state
    }
}

 export const devisUpdateReducer = (state = { devis: {} }, action) => {
    switch (action.type) {
      case DEVIS_UPDATE_REQUEST:
        return { loading: true }
      case DEVIS_UPDATE_SUCCESS:
        return { loading: false, success: true,  devis: action.payload }
      case DEVIS_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case DEVIS_UPDATE_RESET:
        return { devis: {} }
      default:
        return state
    }
  }


  export const devisDetailsReducer = (
    state = {devis: {} } ,
    action
  ) => {
    switch (action.type) {
      case DEVIS_DETAILS_REQUEST:
        return { loading: true , ...state }
      case DEVIS_DETAILS_SUCCESS:
        return { loading: false, devis: action.payload }
      case DEVIS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const devisCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case DEVIS_CREATE_REQUEST:
        return { loading: true }
      case DEVIS_CREATE_SUCCESS:
        return { loading: false, success: true, devis: action.payload }
      case DEVIS_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case DEVIS_CREATE_RESET:
        return {}
      default:
        return state
    }
  }

  export const devisListReducer = (state = { devis: [] }, action) => {
    switch (action.type) {
      case DEVIS_LIST_REQUEST:
        return { loading: true, devis: [] }
      case DEVIS_LIST_SUCCESS:
        return {
          loading: false,
          devis: action.payload
        }
      case DEVIS_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const envoyerMailSansRemiseReducer2 = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case ENVOYER_MAIL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ENVOYER_MAIL_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ENVOYER_MAIL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const envoyerMailAvecRemiseTotalEnPourcentageReducer2 = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case ENVOYER_MAIL2_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ENVOYER_MAIL2_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ENVOYER_MAIL2_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


  export const envoyerMailAvecRemiseTotalEnDeviseReducer2 = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case ENVOYER_MAIL3_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ENVOYER_MAIL3_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ENVOYER_MAIL3_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


  export const envoyerMailAvecRemiseParLigneEnPourcentageReducer2 = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case ENVOYER_MAIL4_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ENVOYER_MAIL4_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ENVOYER_MAIL4_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


  export const envoyerMailAvecRemiseParLigneEnDeviseReducer2 = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case ENVOYER_MAIL5_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ENVOYER_MAIL5_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ENVOYER_MAIL5_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
export default DevisReducer