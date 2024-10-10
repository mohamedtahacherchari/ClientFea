const initialValue = []


const SadaqasReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_SADAQAS":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_SADAQA":
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
    
    case "DELETE_SADAQA":
        const filteredSadaqas = state.filter(sadaqa => sadaqa.id !== action.payload.id);
    return [
        ...filteredSadaqas
    ]
    default:
        return state
}
}

export default SadaqasReducer