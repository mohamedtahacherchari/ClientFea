import ACTIONS from '../actions/'

const clients =[]

const ClientReducer = (state = clients, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_CLIENT:
            return action.payload
        default:
            return state
    }
}

export default ClientReducer