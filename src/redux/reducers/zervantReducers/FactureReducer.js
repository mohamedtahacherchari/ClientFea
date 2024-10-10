import ACTIONS from '../../actions/index'
import { 
    FACTURE_CREATE_FAIL,
    FACTURE_CREATE_REQUEST,
    FACTURE_CREATE_RESET, 
    FACTURE_CREATE_SUCCESS,
    FACTURE_DETAILS_FAIL, 
    FACTURE_DETAILS_REQUEST,
    FACTURE_DETAILS_SUCCESS,
    FACTURE_LASTTOTAL_FAIL,
    FACTURE_LASTTOTAL_REQUEST,
    FACTURE_LASTTOTAL_RESET,
    FACTURE_LASTTOTAL_SUCCESS,
    FACTURE_LIST_FAIL,
    FACTURE_LIST_REQUEST,
    FACTURE_LIST_SUCCESS,
    FACTURE_UPDATE_FAIL,
    FACTURE_UPDATE_REQUEST, 
    FACTURE_UPDATE_RESET, 
    FACTURE_UPDATE_SUCCESS ,
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
    ENVOYER_MAIL5_FAILURE,
 
  } 
             from '../../actions/servantActions/constant/constantZervant/factureConstant'

const factures =[]

const FactureReducer = (state = factures, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_FACTURE:
            return action.payload
        default:
            return state
    }
}




 export const factureUpdateReducer = (state = { facture: {} }, action) => {
    switch (action.type) {
      case FACTURE_UPDATE_REQUEST:
        return { loading: true }
      case FACTURE_UPDATE_SUCCESS:
        return { loading: false, success: true,  facture: action.payload }
      case FACTURE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case FACTURE_UPDATE_RESET:
        return { facture: {} }
      default:
        return state
    }
  }





  export const factureCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case FACTURE_CREATE_REQUEST:
        return { loading: true }
      case FACTURE_CREATE_SUCCESS:
        return { loading: false, success: true, facture: action.payload }
      case FACTURE_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case FACTURE_CREATE_RESET:
        return {}
      default:
        return state
    }
  }

  export const factureListReducer = (state = { factures: [] }, action) => {
    switch (action.type) {
      case FACTURE_LIST_REQUEST:
        return { loading: true, factures: [] }
      case FACTURE_LIST_SUCCESS:
        return {
          loading: false,
          factures: action.payload
        }
      case FACTURE_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const factureDetailsReducer = (
    state = {facture: {} } ,
    action
  ) => {
    switch (action.type) {
      case FACTURE_DETAILS_REQUEST:
        return { loading: true , ...state }
      case FACTURE_DETAILS_SUCCESS:
        return { loading: false, facture: action.payload }
      case FACTURE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const factureLastTotalReducer = (state = {facture: {}}, action) => {
    switch (action.type) {
      case FACTURE_LASTTOTAL_REQUEST:
        return { loading: true ,...state}
      case FACTURE_LASTTOTAL_SUCCESS:
        return { loading: false, facture: action.payload}
      case FACTURE_LASTTOTAL_FAIL:
        return { loading: false, error: action.payload }
        case FACTURE_LASTTOTAL_RESET:
          return {}
      default:
        return state
    }
  }

  export const envoyerMailSansRemiseReducer = (state = { loading: false, error: null }, action) => {
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
  
  export const envoyerMailAvecRemiseTotalEnPourcentageReducer = (state = { loading: false, error: null }, action) => {
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


  export const envoyerMailAvecRemiseTotalEnDeviseReducer = (state = { loading: false, error: null }, action) => {
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


  export const envoyerMailAvecRemiseParLigneEnPourcentageReducer = (state = { loading: false, error: null }, action) => {
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


  export const envoyerMailAvecRemiseParLigneEnDeviseReducer = (state = { loading: false, error: null }, action) => {
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
export default FactureReducer
