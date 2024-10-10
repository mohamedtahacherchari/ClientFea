import ACTIONS from '../actions/'

const candidats =[]

const CandidatReducer = (state = candidats, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_CANDIDAT:
            return action.payload
        default:
            return state
    }
}

export default CandidatReducer