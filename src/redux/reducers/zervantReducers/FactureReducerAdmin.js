
import ACTIONS from '../../actions/index'

const facturesAdmin =[]



 const FactureReducerAdmin = (state = facturesAdmin, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_FACADMIN:
            return action.payload
        default:
            return state
    }
  }

  export default FactureReducerAdmin
