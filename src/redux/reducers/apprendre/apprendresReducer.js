const initialValue = []


const ApprendresReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_APPRENDRES":
        console.log("info as appearing in the reduce: ", action.payload)

    return action.payload
    case "ADD_APPRENDRE":
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
    
    case "DELETE_APPRENDRE":
        const filteredApprendres = state.filter(apprendre => apprendre.id !== action.payload.id);
    return [
        ...filteredApprendres
    ]
    default:
        return state
}
}

export default ApprendresReducer