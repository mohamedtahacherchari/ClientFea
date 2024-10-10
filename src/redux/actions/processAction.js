import ACTIONS from './index'
import axios from 'axios'

export const fetchAllprocess = async (token) => {
    const res = await axios.get('/api/processrecrutement/', {
        headers: {Authorization: token}
    })
    return res
}

export const fetchprocess = async (token,id) => {
    const res = await axios.get(`/api/processrecrutement/getbyid/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllprocess = (res) => {
    return {
        type: ACTIONS.GET_ALL_PROCESS,
        payload: res.data
    }
}

export const dispatchGetprocess = (res) => {
    return {
        type: ACTIONS.GET_PROCESS,
        payload: res.data
    }
}