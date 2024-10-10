import axios from 'axios'
import ACTIONS from '../index'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
export const fetchAllClientAdmin = async (token) => {
    const res = await axios.get('/api/clientf/ClientAdmin', {
        headers: {Authorization: token}
    })

    console.log(res.data)
    return res
}

export const dispatchGetAllClientAdmin = (res) => {
    return {
        type: ACTIONS.GET_ALL_CLIENTADMIN,
        payload: res.data


    }
     
}    


