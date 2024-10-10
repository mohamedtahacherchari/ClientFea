
import { APPRENDRE_DETAILS_FAIL,
  APPRENDRE_DETAILS_REQUEST,
  APPRENDRE_DETAILS_SUCCESS,
  APPRENDRE_UPDATE_FAIL,
  APPRENDRE_UPDATE_REQUEST,
  APPRENDRE_UPDATE_RESET, 
  APPRENDRE_UPDATE_SUCCESS, 
  UPDATE_APPRENDRE_STATUS_FAILURE, 
  UPDATE_APPRENDRE_STATUS_REQUEST,
  UPDATE_APPRENDRE_STATUS_SUCCESS} from "../../actions/servantActions/constant/constantZervant/apprendreConstant"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const ApprendreReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_APPRENDRE":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_APPRENDRE":
        return initialValue
    case "CLOSE_APPRENDRE":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default ApprendreReducer



export const apprendreUpdateReducer = (state = { apprendre: {} }, action) => {
    switch (action.type) {
      case APPRENDRE_UPDATE_REQUEST:
        return { loading: true }
      case APPRENDRE_UPDATE_SUCCESS:
        return { loading: false, success: true,  apprendre : action.payload }
      case APPRENDRE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case APPRENDRE_UPDATE_RESET:
        return { apprendre: {} }
      default:
        return state
    }
  }


  export const apprendreDetailsReducer = (
    state = {apprendre: {} } ,
    action
  ) => {
    switch (action.type) {
      case APPRENDRE_DETAILS_REQUEST:
        return { loading: true , ...state }
      case APPRENDRE_DETAILS_SUCCESS:
        return { loading: false, apprendre: action.payload }
      case APPRENDRE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    apprendre: null,
    error: null,
  };

  export const apprendreStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_APPRENDRE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_APPRENDRE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          apprendre : action.payload,
          error: null,
        };
      case UPDATE_APPRENDRE_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


