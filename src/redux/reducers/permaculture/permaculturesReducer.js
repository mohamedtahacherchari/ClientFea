const initialValue = []


const PermaculturesReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_PERMACULTURES":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_PERMACULTURE":
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
    
    case "DELETE_PERMACULTURE":
        const filteredPermacultures = state.filter(permaculture => permaculture.id !== action.payload.id);
    return [
        ...filteredPermacultures
    ]
    default:
        return state
}
}

export default PermaculturesReducer