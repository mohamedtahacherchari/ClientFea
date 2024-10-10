
import ACTIONS from '../../actions/index'

const devisAdmin =[]



 const DevisReducerAdmin = (state = devisAdmin, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_DEVADMIN:
            return action.payload
        default:
            return state
    }
  }

  export default DevisReducerAdmin