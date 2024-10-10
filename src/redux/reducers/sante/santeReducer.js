
import {SANTE_DETAILS_FAIL,
  SANTE_DETAILS_REQUEST,
  SANTE_DETAILS_SUCCESS,
  SANTE_UPDATE_FAIL,
  SANTE_UPDATE_REQUEST,
  SANTE_UPDATE_RESET, 
  SANTE_UPDATE_SUCCESS, 
  UPDATE_SANTE_STATUS_FAILURE, 
  UPDATE_SANTE_STATUS_REQUEST,
  UPDATE_SANTE_STATUS_SUCCESS}
  //UPDATE_INVESTIR_STATUS_FAILURE,
  //UPDATE_INVESTIR_STATUS_REQUEST,
  //UPDATE_INVESTIR_STATUS_SUCCESS} 
  from "../../actions/servantActions/constant/constantZervant/santeConstant"
import { sante } from "../../Axios/sante"
//mport {investir } from "../../Axios/investir"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const SanteReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_SANTE":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_SANTE":
        return initialValue
    case "CLOSE_SANTE":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default SanteReducer



export const santeUpdateReducer = (state = { sante: {} }, action) => {
    switch (action.type) {
      case SANTE_UPDATE_REQUEST:
        return { loading: true }
      case SANTE_UPDATE_SUCCESS:
        return { loading: false, success: true,  sante : action.payload }
      case SANTE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case SANTE_UPDATE_RESET:
        return { sante: {} }
      default:
        return state
    }
  }


  export const santeDetailsReducer = (
    state = {sante: {} } ,
    action
  ) => {
    switch (action.type) {
      case SANTE_DETAILS_REQUEST:
        return { loading: true , ...state }
      case SANTE_DETAILS_SUCCESS:
        return { loading: false, sante : action.payload }
      case SANTE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    sante: null,
    error: null,
  };

  export const santeStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_SANTE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_SANTE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          sante : action.payload,
          error: null,
        };
      case UPDATE_SANTE_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


