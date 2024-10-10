
import ACTIONS from '../../actions/index'

const productsAdmin =[]



 const ProductReducerAdmin = (state = productsAdmin, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_PRODADMIN:
            return action.payload
        default:
            return state
    }
  }

  export default ProductReducerAdmin