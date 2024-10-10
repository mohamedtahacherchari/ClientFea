import ACTIONS from '../../actions/index'
import { CLIENTF_CREATE_FAIL, CLIENTF_CREATE_REQUEST, CLIENTF_CREATE_RESET, CLIENTF_CREATE_SUCCESS, CLIENTF_DETAILS_FAIL, CLIENTF_DETAILS_REQUEST, CLIENTF_DETAILS_SUCCESS, CLIENTF_LIST_FAIL, CLIENTF_LIST_REQUEST, CLIENTF_LIST_SUCCESS, CLIENTF_UPDATE_FAIL, CLIENTF_UPDATE_REQUEST, CLIENTF_UPDATE_RESET, CLIENTF_UPDATE_SUCCESS } from '../../actions/servantActions/constant/constantZervant/clientfConstant'

const clientfs =[]

const ClientfReducer = (state = clientfs, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_CLIENTF:
            return action.payload
        default:
            return state
    }
}

 export const clientfUpdateReducer = (state = { clientf: {} }, action) => {
    switch (action.type) {
      case CLIENTF_UPDATE_REQUEST:
        return { loading: true }
      case CLIENTF_UPDATE_SUCCESS:
        return { loading: false, success: true, clientf: action.payload }
      case CLIENTF_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case CLIENTF_UPDATE_RESET:
        return { clientf: {} }
      default:
        return state
    }
  }


  export const clientfDetailsReducer = (
    state = {clientf : {} } ,
    action
  ) => {
    switch (action.type) {
      case CLIENTF_DETAILS_REQUEST:
        return { loading: true , ...state }
      case CLIENTF_DETAILS_SUCCESS:
        return { loading: false, clientf: action.payload }
      case CLIENTF_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const clientfCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CLIENTF_CREATE_REQUEST:
        return { loading: true }
      case CLIENTF_CREATE_SUCCESS:
        return { loading: false, success: true, clientf: action.payload }
      case CLIENTF_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case CLIENTF_CREATE_RESET:
        return {}
      default:
        return state
    }
  }

  export const clientfListReducer = (state = { clientfs: [] }, action) => {
    switch (action.type) {
      case CLIENTF_LIST_REQUEST:
        return { loading: true, clientfs: [] }
      case CLIENTF_LIST_SUCCESS:
        return {
          loading: false,
          products: action.payload
        }
      case CLIENTF_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export default ClientfReducer