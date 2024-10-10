
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import InfoReducer from "./infoReducer";
import InfosReducer from "./infosReducer";
import modalReducer from "./modelReducer2"

const rootReducer = combineReducers({
    info: InfoReducer ,
    infos: InfosReducer,
    modalStatus: modalReducer,
    error: errorReducer
}) 

export default rootReducer;

