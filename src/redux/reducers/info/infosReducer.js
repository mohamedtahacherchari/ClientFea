const initialValue = []


const InfosReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_INFOS":
    return action.payload
    case "ADD_INFO":
    return [
        ...state,
        action.payload
    ]
    // case "UPDATE_EVENT":
    // const renderedEvents = state.filter(event => event.id !== action.payload._id);
     
    // return [
    //     ...renderedEvents,
    //     action.payload
    // ]
    
    case "DELETE_INFO":
        const filteredInfos = state.filter(info => info.id !== action.payload.id);
    return [
        ...filteredInfos
    ]
    default:
        return state
}
}

export default InfosReducer