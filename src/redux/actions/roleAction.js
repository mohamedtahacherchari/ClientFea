import ACTIONS from './index'
import axios from 'axios'

export const fetchAllRoles = async (token) => {
    const res = await axios.get('/role/', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllRoles = (res) => {
    return {
        type: ACTIONS.GET_ALL_ROLES,
        payload: res.data
    }
}