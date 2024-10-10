
import {PERMACULTURE_DETAILS_FAIL,
  PERMACULTURE_DETAILS_REQUEST,
  PERMACULTURE_DETAILS_SUCCESS,
  PERMACULTURE_UPDATE_FAIL,
  PERMACULTURE_UPDATE_REQUEST,
  PERMACULTURE_UPDATE_RESET, 
  PERMACULTURE_UPDATE_SUCCESS, 
  UPDATE_PERMACULTURE_STATUS_FAILURE, 
  UPDATE_PERMACULTURE_STATUS_REQUEST,
  UPDATE_PERMACULTURE_STATUS_SUCCESS}
  //UPDATE_INVESTIR_STATUS_FAILURE,
  //UPDATE_INVESTIR_STATUS_REQUEST,
  //UPDATE_INVESTIR_STATUS_SUCCESS} 
  from "../../actions/servantActions/constant/constantZervant/permacultureConstant"
//mport {investir } from "../../Axios/investir"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const PermacultureReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_PERMACULTURE":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_PERMACULTURE":
        return initialValue
    case "CLOSE_PERMACULTURE":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default PermacultureReducer



export const permacultureUpdateReducer = (state = { permaculture: {} }, action) => {
    switch (action.type) {
      case PERMACULTURE_UPDATE_REQUEST:
        return { loading: true }
      case PERMACULTURE_UPDATE_SUCCESS:
        return { loading: false, success: true,  permaculture : action.payload }
      case PERMACULTURE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case PERMACULTURE_UPDATE_RESET:
        return { permaculture: {} }
      default:
        return state
    }
  }


  export const permacultureDetailsReducer = (
    state = {permaculture: {} } ,
    action
  ) => {
    switch (action.type) {
      case PERMACULTURE_DETAILS_REQUEST:
        return { loading: true , ...state }
      case PERMACULTURE_DETAILS_SUCCESS:
        return { loading: false, permaculture : action.payload }
      case PERMACULTURE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    permaculture: null,
    error: null,
  };

  export const permacultureStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PERMACULTURE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PERMACULTURE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          permaculture : action.payload,
          error: null,
        };
      case UPDATE_PERMACULTURE_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


