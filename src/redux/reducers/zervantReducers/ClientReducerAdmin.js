
import ACTIONS from '../../actions/index'

const clientAdmin =[]



 const ClientReducerAdmin = (state = clientAdmin, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_CLIENTADMIN:
            return action.payload
        default:
            return state
    }
  }

  export default ClientReducerAdmin
