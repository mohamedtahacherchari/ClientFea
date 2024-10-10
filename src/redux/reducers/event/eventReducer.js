import { event } from "../../Axios/event"
import { EVENT_DETAILS_FAIL,
   EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
     EVENT_UPDATE_FAIL,
      EVENT_UPDATE_REQUEST,
       EVENT_UPDATE_RESET, 
       EVENT_UPDATE_SUCCESS } from "../../actions/servantActions/constant/constantZervant/eventConstant"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const EventReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_EVENT":
    console.log("event as appearing in the reduce: ", action.payload)
    return action.payload
    
    // case "UPDATE_EVENT":
    // return action.payload

    case "DELETE_EVENT":
        return initialValue
    case "CLOSE_EVENT":
        console.log("event is closed")
        return initialValue
    default:
        return state
}
}

export default EventReducer



export const eventUpdateReducer = (state = { event: {} }, action) => {
    switch (action.type) {
      case EVENT_UPDATE_REQUEST:
        return { loading: true }
      case EVENT_UPDATE_SUCCESS:
        return { loading: false, success: true,  event: action.payload }
      case EVENT_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case EVENT_UPDATE_RESET:
        return { event: {} }
      default:
        return state
    }
  }


  export const eventDetailsReducer = (
    state = {event : {} } ,
    action
  ) => {
    switch (action.type) {
      case EVENT_DETAILS_REQUEST:
        return { loading: true , ...state }
      case EVENT_DETAILS_SUCCESS:
        return { loading: false, event: action.payload }
      case EVENT_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }