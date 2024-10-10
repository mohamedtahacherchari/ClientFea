
import { ENTRETIEN_DETAILS_FAIL,
  ENTRETIEN_DETAILS_REQUEST,
  ENTRETIEN_DETAILS_SUCCESS,
  ENTRETIEN_UPDATE_FAIL,
  ENTRETIEN_UPDATE_REQUEST,
  ENTRETIEN_UPDATE_RESET, 
  ENTRETIEN_UPDATE_SUCCESS, 
  UPDATE_ENTRETIEN__STATUS_FAILURE, 
  UPDATE_ENTRETIEN__STATUS_REQUEST,
  UPDATE_ENTRETIEN__STATUS_SUCCESS,
  UPDATE_ENTRETIEN_STATUS_FAILURE,
  UPDATE_ENTRETIEN_STATUS_REQUEST,
  UPDATE_ENTRETIEN_STATUS_SUCCESS} from "../../actions/servantActions/constant/constantZervant/entretienConstant"
import { entretien } from "../../Axios/entretien"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const EntretienReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_ENTRETIEN":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_ENTRETIEN":
        return initialValue
    case "CLOSE_ENTRETIEN":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default EntretienReducer



export const entretienUpdateReducer = (state = { entretien: {} }, action) => {
    switch (action.type) {
      case ENTRETIEN_UPDATE_REQUEST:
        return { loading: true }
      case ENTRETIEN_UPDATE_SUCCESS:
        return { loading: false, success: true,  entretien : action.payload }
      case ENTRETIEN_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case ENTRETIEN_UPDATE_RESET:
        return { entretien: {} }
      default:
        return state
    }
  }


  export const entretienDetailsReducer = (
    state = {entretien: {} } ,
    action
  ) => {
    switch (action.type) {
      case ENTRETIEN_DETAILS_REQUEST:
        return { loading: true , ...state }
      case ENTRETIEN_DETAILS_SUCCESS:
        return { loading: false, entretien: action.payload }
      case ENTRETIEN_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    entretien: null,
    error: null,
  };

  export const entretienStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ENTRETIEN_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_ENTRETIEN_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          entretien : action.payload,
          error: null,
        };
      case UPDATE_ENTRETIEN_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


