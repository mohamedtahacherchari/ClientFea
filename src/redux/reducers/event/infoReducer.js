import ACTIONS from '../../actions/index'
import { 
    INFO_CREATE_FAIL,
    INFO_CREATE_REQUEST,
    INFO_CREATE_RESET, 
    INFO_CREATE_SUCCESS,
    INFO_DETAILS_FAIL, 
    INFO_DETAILS_REQUEST,
    INFO_DETAILS_SUCCESS,
    INFO_LIST_FAIL,
    INFO_LIST_REQUEST,
    INFO_LIST_SUCCESS,
    INFO_UPDATE_FAIL,
    INFO_UPDATE_REQUEST, 
    INFO_UPDATE_RESET, 
    INFO_UPDATE_SUCCESS
  } 
             from '../../actions/servantActions/constant/constantZervant/infoConstant'

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


export default DevisReducer