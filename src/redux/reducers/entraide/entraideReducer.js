
import { ENTRAIDE_DETAILS_FAIL,
    ENTRAIDE_DETAILS_REQUEST,
    ENTRAIDE_DETAILS_SUCCESS,
    ENTRAIDE_UPDATE_FAIL,
    ENTRAIDE_UPDATE_REQUEST,
    ENTRAIDE_UPDATE_RESET, 
    ENTRAIDE_UPDATE_SUCCESS, 
    UPDATE_ENTRAIDE_STATUS_FAILURE, 
    UPDATE_ENTRAIDE_STATUS_REQUEST,
    UPDATE_ENTRAIDE_STATUS_SUCCESS} from "../../actions/servantActions/constant/constantZervant/entraideConstant"
import { entraide } from "../../Axios/entraide"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const EntraideReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_ENTRAIDE":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_ENTRAIDE":
        return initialValue
    case "CLOSE_ENTRAIDE":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default EntraideReducer



export const entraideUpdateReducer = (state = { entraide: {} }, action) => {
    switch (action.type) {
      case ENTRAIDE_UPDATE_REQUEST:
        return { loading: true }
      case ENTRAIDE_UPDATE_SUCCESS:
        return { loading: false, success: true,  entraide : action.payload }
      case ENTRAIDE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case ENTRAIDE_UPDATE_RESET:
        return { entraide: {} }
      default:
        return state
    }
  }


  export const entraideDetailsReducer = (
    state = {entraide: {} } ,
    action
  ) => {
    switch (action.type) {
      case ENTRAIDE_DETAILS_REQUEST:
        return { loading: true , ...state }
      case ENTRAIDE_DETAILS_SUCCESS:
        return { loading: false, entraide: action.payload }
      case ENTRAIDE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    entraide: null,
    error: null,
  };

  export const entraideStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ENTRAIDE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_ENTRAIDE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          entraide : action.payload,
          error: null,
        };
      case UPDATE_ENTRAIDE_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


