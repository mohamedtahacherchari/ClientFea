import axios from 'axios'
import ACTIONS from '../index'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
export const fetchAllFactureAdmin = async (token) => {
    const res = await axios.get('/api/facture/FactureAdmin', {
        headers: {Authorization: token}
    })

    console.log(res.data)
    return res
}

export const dispatchGetAllFactureAdmin = (res) => {
    return {
        type: ACTIONS.GET_ALL_FACADMIN,
        payload: res.data


    }
     
}    


