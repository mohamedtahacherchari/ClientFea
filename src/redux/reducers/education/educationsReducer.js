const initialValue = []


const EducationsReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_EDUCATIONS":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_EDUCATION":
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
    
    case "DELETE_EDUCATION":
        const filteredEducations = state.filter(education => education.id !== action.payload.id);
    return [
        ...filteredEducations
    ]
    default:
        return state
}
}

export default EducationsReducer