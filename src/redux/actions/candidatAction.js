import ACTIONS from './index'
import axios from 'axios'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
export const fetchAllCandidat = async (token) => {
    const res = await axiosInstance.get('/api/candidat/', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllCandidat = (res) => {
    return {
        type: ACTIONS.GET_ALL_CANDIDAT,
        payload: res.data
    }
}