const initialValue = []


const VoyagesReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_VOYAGES":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_VOYAGE":
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
    
    case "DELETE_VOYAGE":
        const filteredVoyages = state.filter(voyage => voyage.id !== action.payload.id);
    return [
        ...filteredVoyages
    ]
    default:
        return state
}
}

export default VoyagesReducer