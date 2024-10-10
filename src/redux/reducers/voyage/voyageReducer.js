
import {VOYAGE_DETAILS_FAIL,
  VOYAGE_DETAILS_REQUEST,
  VOYAGE_DETAILS_SUCCESS,
  VOYAGE_UPDATE_FAIL,
  VOYAGE_UPDATE_REQUEST,
  VOYAGE_UPDATE_RESET, 
  VOYAGE_UPDATE_SUCCESS, 
  UPDATE_VOYAGE_STATUS_FAILURE, 
  UPDATE_VOYAGE_STATUS_REQUEST,
  UPDATE_VOYAGE_STATUS_SUCCESS}
  //UPDATE_INVESTIR_STATUS_FAILURE,
  //UPDATE_INVESTIR_STATUS_REQUEST,
  //UPDATE_INVESTIR_STATUS_SUCCESS} 
  from "../../actions/servantActions/constant/constantZervant/voyageConstant"
import { voyage } from "../../Axios/voyage"
//mport {investir } from "../../Axios/investir"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const VoyageReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_VOYAGE":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_VOYAGE":
        return initialValue
    case "CLOSE_VOYAGE":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default VoyageReducer



export const voyageUpdateReducer = (state = { voyage: {} }, action) => {
    switch (action.type) {
      case VOYAGE_UPDATE_REQUEST:
        return { loading: true }
      case VOYAGE_UPDATE_SUCCESS:
        return { loading: false, success: true,  voyage : action.payload }
      case VOYAGE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case VOYAGE_UPDATE_RESET:
        return { voyage: {} }
      default:
        return state
    }
  }


  export const voyageDetailsReducer = (
    state = {voyage: {} } ,
    action
  ) => {
    switch (action.type) {
      case VOYAGE_DETAILS_REQUEST:
        return { loading: true , ...state }
      case VOYAGE_DETAILS_SUCCESS:
        return { loading: false, voyage : action.payload }
      case VOYAGE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    voyage : null,
    error: null,
  };

  export const voyageStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_VOYAGE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_VOYAGE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          voyage : action.payload,
          error: null,
        };
      case UPDATE_VOYAGE_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


