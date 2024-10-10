
import {SADAQA_DETAILS_FAIL,
  SADAQA_DETAILS_REQUEST,
  SADAQA_DETAILS_SUCCESS,
  SADAQA_UPDATE_FAIL,
  SADAQA_UPDATE_REQUEST,
  SADAQA_UPDATE_RESET, 
  SADAQA_UPDATE_SUCCESS, 
  UPDATE_SADAQA_STATUS_FAILURE, 
  UPDATE_SADAQA_STATUS_REQUEST,
  UPDATE_SADAQA_STATUS_SUCCESS}
  //UPDATE_INVESTIR_STATUS_FAILURE,
  //UPDATE_INVESTIR_STATUS_REQUEST,
  //UPDATE_INVESTIR_STATUS_SUCCESS} 
  from "../../actions/servantActions/constant/constantZervant/sadaqaConstant"
import { sadaqa } from "../../Axios/sadaqa"
//mport {investir } from "../../Axios/investir"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const SadaqaReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_SADAQA":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_SADAQA":
        return initialValue
    case "CLOSE_SADAQA":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default SadaqaReducer



export const sadaqaUpdateReducer = (state = { sadaqa: {} }, action) => {
    switch (action.type) {
      case SADAQA_UPDATE_REQUEST:
        return { loading: true }
      case SADAQA_UPDATE_SUCCESS:
        return { loading: false, success: true,  sadaqa : action.payload }
      case SADAQA_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case SADAQA_UPDATE_RESET:
        return { sadaqa: {} }
      default:
        return state
    }
  }


  export const sadaqaDetailsReducer = (
    state = {sadaqa: {} } ,
    action
  ) => {
    switch (action.type) {
      case SADAQA_DETAILS_REQUEST:
        return { loading: true , ...state }
      case SADAQA_DETAILS_SUCCESS:
        return { loading: false, sadaqa : action.payload }
      case SADAQA_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    sadaqa: null,
    error: null,
  };

  export const sadaqaStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_SADAQA_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_SADAQA_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          sadaqa : action.payload,
          error: null,
        };
      case UPDATE_SADAQA_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


