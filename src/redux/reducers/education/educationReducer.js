
import { 
    EDUCATION_DETAILS_FAIL,
    EDUCATION_DETAILS_REQUEST,
    EDUCATION_DETAILS_SUCCESS,
    EDUCATION_UPDATE_FAIL,
    EDUCATION_UPDATE_REQUEST,
    EDUCATION_UPDATE_RESET, 
    EDUCATION_UPDATE_SUCCESS, 
    UPDATE_EDUCATION_STATUS_FAILURE, 
    UPDATE_EDUCATION_STATUS_REQUEST,
    UPDATE_EDUCATION_STATUS_SUCCESS} from "../../actions/servantActions/constant/constantZervant/educationConstant"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const EducationReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_EDUCATION":
  //  console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_EDUCATION":
        return initialValue
    case "CLOSE_EDUCATION":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default EducationReducer



export const educationUpdateReducer = (state = { education: {} }, action) => {
    switch (action.type) {
      case EDUCATION_UPDATE_REQUEST:
        return { loading: true }
      case EDUCATION_UPDATE_SUCCESS:
        return { loading: false, success: true,  education: action.payload }
      case EDUCATION_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case EDUCATION_UPDATE_RESET:
        return { education: {} }
      default:
        return state
    }
  }


  export const educationDetailsReducer = (
    state = {education : {} } ,
    action
  ) => {
    switch (action.type) {
      case EDUCATION_DETAILS_REQUEST:
        return { loading: true , ...state }
      case EDUCATION_DETAILS_SUCCESS:
        return { loading: false, education: action.payload }
      case EDUCATION_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    education: null,
    error: null,
  };

  export const educationStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_EDUCATION_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_EDUCATION_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          education: action.payload,
          error: null,
        };
      case UPDATE_EDUCATION_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

