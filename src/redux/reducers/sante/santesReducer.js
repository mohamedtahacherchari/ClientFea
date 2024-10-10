const initialValue = []


const SantesReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_SANTES":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_SANTE":
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
    
    case "DELETE_SANTE":
        const filteredSantes = state.filter(sante => sante.id !== action.payload.id);
    return [
        ...filteredSantes
    ]
    default:
        return state
}
}

export default SantesReducer