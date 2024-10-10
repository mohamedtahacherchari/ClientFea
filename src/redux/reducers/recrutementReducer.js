import ACTIONS from '../actions/'

const recrutements =[]

const CandidatReducer = (state = recrutements, action) => {
    switch(action.type){
        case ACTIONS.GET_RECRUTEMENT:
            return action.payload
        default:
            return state
    }
}

export default CandidatReducer