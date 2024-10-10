
import {INVESTIR_DETAILS_FAIL,
  INVESTIR_DETAILS_REQUEST,
  INVESTIR_DETAILS_SUCCESS,
  INVESTIR_UPDATE_FAIL,
  INVESTIR_UPDATE_REQUEST,
  INVESTIR_UPDATE_RESET, 
  INVESTIR_UPDATE_SUCCESS, 
  UPDATE_INVESTIR_STATUS_FAILURE, 
  UPDATE_INVESTIR_STATUS_REQUEST,
  UPDATE_INVESTIR_STATUS_SUCCESS}
  //UPDATE_INVESTIR_STATUS_FAILURE,
  //UPDATE_INVESTIR_STATUS_REQUEST,
  //UPDATE_INVESTIR_STATUS_SUCCESS} 
  from "../../actions/servantActions/constant/constantZervant/investirConstant"
import {investir } from "../../Axios/investir"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const InvestirReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_INVESTIR":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_INVESTIR":
        return initialValue
    case "CLOSE_INVESTIR":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default InvestirReducer



export const investirUpdateReducer = (state = { investir: {} }, action) => {
    switch (action.type) {
      case INVESTIR_UPDATE_REQUEST:
        return { loading: true }
      case INVESTIR_UPDATE_SUCCESS:
        return { loading: false, success: true,  investir : action.payload }
      case INVESTIR_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case INVESTIR_UPDATE_RESET:
        return { investir: {} }
      default:
        return state
    }
  }


  export const investirDetailsReducer = (
    state = {investir: {} } ,
    action
  ) => {
    switch (action.type) {
      case INVESTIR_DETAILS_REQUEST:
        return { loading: true , ...state }
      case INVESTIR_DETAILS_SUCCESS:
        return { loading: false, investir: action.payload }
      case INVESTIR_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    investir: null,
    error: null,
  };

  export const investirStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_INVESTIR_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_INVESTIR_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          investir : action.payload,
          error: null,
        };
      case UPDATE_INVESTIR_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


