const initialValue = []


const AudiovisuelsReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_AUDIOVISUELS":
        console.log("info as appearing in the reduce: ", action.payload)

    return action.payload
    case "ADD_AUDIOVISUEL":
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
    
    case "DELETE_AUDIOVISUEL":
        const filteredAudiovisuels = state.filter(audiovisuel => audiovisuel.id !== action.payload.id);
    return [
        ...filteredAudiovisuels
    ]
    default:
        return state
}
}

export default AudiovisuelsReducer