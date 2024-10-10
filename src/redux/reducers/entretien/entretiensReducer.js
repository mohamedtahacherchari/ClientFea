const initialValue = []


const EntretiensReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_ENTRETIENS":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_ENTRETIEN":
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
    
    case "DELETE_ENTRETIEN":
        const filteredEntretiens = state.filter(entretien => entretien.id !== action.payload.id);
    return [
        ...filteredEntretiens
    ]
    default:
        return state
}
}

export default EntretiensReducer