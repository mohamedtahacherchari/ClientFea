const initialValue = []


const InvestirsReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_INVESTIRS":
        console.log("info as appearing in the reduce: ", action.payload)
    return action.payload
    case "ADD_INVESTIR":
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
    
    case "DELETE_INVESTIR":
        const filteredInvestirs = state.filter(investir => investir.id !== action.payload.id);
    return [
        ...filteredInvestirs
    ]
    default:
        return state
}
}

export default InvestirsReducer