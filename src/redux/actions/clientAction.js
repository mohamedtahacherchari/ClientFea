import ACTIONS from './index'
import axios from 'axios'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
export const fetchAllClient = async (token) => {
    const res = await axiosInstance.get('/api/client/', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllClient = (res) => {
    return {
        type: ACTIONS.GET_ALL_CLIENT,
        payload: res.data
    }
}