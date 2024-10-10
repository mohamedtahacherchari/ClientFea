const initialValue = []


const EntraidesReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_ENTRAIDES":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_ENTRAIDE":
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
    
    case "DELETE_ENTRAIDE":
        const filteredEntraides = state.filter(entraide => entraide.id !== action.payload.id);
    return [
        ...filteredEntraides
    ]
    default:
        return state
}
}

export default EntraidesReducer