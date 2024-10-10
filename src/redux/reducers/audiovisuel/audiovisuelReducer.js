
import { AUDIOVISUEL_DETAILS_FAIL,
    AUDIOVISUEL_DETAILS_REQUEST,
    AUDIOVISUEL_DETAILS_SUCCESS,
    AUDIOVISUEL_UPDATE_FAIL,
    AUDIOVISUEL_UPDATE_REQUEST,
    AUDIOVISUEL_UPDATE_RESET, 
    AUDIOVISUEL_UPDATE_SUCCESS, 
    UPDATE_AUDIOVISUEL_STATUS_FAILURE, 
    UPDATE_AUDIOVISUEL_STATUS_REQUEST,
    UPDATE_AUDIOVISUEL_STATUS_SUCCESS} from "../../actions/servantActions/constant/constantZervant/audiovisuelConstant"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const AudiovisuelReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_AUDIOVISUEL":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload

    case "DELETE_AUDIOVISUEL":
        return initialValue
    case "CLOSE_AUDIOVISUEL":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default AudiovisuelReducer



export const audiovisuelUpdateReducer = (state = { audiovisuel: {} }, action) => {
    switch (action.type) {
      case AUDIOVISUEL_UPDATE_REQUEST:
        return { loading: true }
      case AUDIOVISUEL_UPDATE_SUCCESS:
        return { loading: false, success: true,  audiovisuel: action.payload }
      case AUDIOVISUEL_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case AUDIOVISUEL_UPDATE_RESET:
        return { audiovisuel: {} }
      default:
        return state
    }
  }


  export const audiovisuelDetailsReducer = (
    state = {audiovisuel: {} } ,
    action
  ) => {
    switch (action.type) {
      case AUDIOVISUEL_DETAILS_REQUEST:
        return { loading: true , ...state }
      case AUDIOVISUEL_DETAILS_SUCCESS:
        return { loading: false, audiovisuel: action.payload }
      case AUDIOVISUEL_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  const initialState = {
    loading: false,
    audiovisuel: null,
    error: null,
  };

  export const audiovisuelStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_AUDIOVISUEL_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_AUDIOVISUEL_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          audiovisuel: action.payload,
          error: null,
        };
      case UPDATE_AUDIOVISUEL_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


