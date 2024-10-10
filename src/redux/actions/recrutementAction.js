import ACTIONS from './index'
import axios from 'axios'

export const fetchrecrutementbyid = async (token,id) => {
    const res = await axios.get(`/api/candidat/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetrecrutementbyid = (res) => {
    return {
        type: ACTIONS.GET_RECRUTEMENT,
        payload: res.data
    }
}