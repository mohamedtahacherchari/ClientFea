import ACTIONS from '../actions/'

const process =[]

const processReducer = (state = process, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_PROCESS:
            return action.payload
        default:
            return state
    }
}
export default processReducer