import {info } from "../../Axios/info"
import { INFO_DETAILS_FAIL,
   INFO_DETAILS_REQUEST,
   INFO_DETAILS_SUCCESS,
   INFO_UPDATE_FAIL,
   INFO_UPDATE_REQUEST,
   INFO_UPDATE_RESET, 
   INFO_UPDATE_SUCCESS } from "../../actions/servantActions/constant/constantZervant/infoConstant"

const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const InfoReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_INFO":
    console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    
    // case "UPDATE_INFO":
    // return action.payload

    case "DELETE_INFO":
        return initialValue
    case "CLOSE_INFO":
        console.log("info is closed")
        return initialValue
    default:
        return state
}
}

export default InfoReducer



/*export const infoUpdateReducer = (state = { info: {} }, action) => {
    switch (action.type) {
      case INFO_UPDATE_REQUEST:
        return { loading: true }
      case INFO_UPDATE_SUCCESS:
        return { loading: false, success: true,  INFO: action.payload }
      case INFO_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case INFO_UPDATE_RESET:
        return { info: {} }
      default:
        return state
    }
  }


  export const infoDetailsReducer = (
    state = {infos: {} } ,
    action
  ) => {
    switch (action.type) {
      case INFO_DETAILS_REQUEST:
        return { loading: true , ...state }
      case INFO_DETAILS_SUCCESS:
        return { loading: false, infos: action.payload }
      case INFO_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
*/

  export const infoUpdateReducer = (state = { info: {} }, action) => {
    switch (action.type) {
      case INFO_UPDATE_REQUEST:
        return { loading: true }
      case INFO_UPDATE_SUCCESS:
        return { loading: false, success: true,  info: action.payload }
      case INFO_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case INFO_UPDATE_RESET:
        return { info: {} }
      default:
        return state
    }
  }


  export const infoDetailsReducer = (
    state = {info : {} } ,
    action
  ) => {
    switch (action.type) {
      case INFO_DETAILS_REQUEST:
        return { loading: true , ...state }
      case INFO_DETAILS_SUCCESS:
        return { loading: false, info: action.payload }
      case INFO_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }