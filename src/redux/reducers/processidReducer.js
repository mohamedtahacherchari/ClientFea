import ACTIONS from '../actions/'

const processid =[]

const processidReducer = (state = processid, action) => {
    switch(action.type){
        case ACTIONS.GET_PROCESS:
            return action.payload
        default:
            return state
    }
}
export default processidReducer