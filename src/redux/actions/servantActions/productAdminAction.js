import axios from 'axios'
import ACTIONS from '../index'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
  
export const fetchAllProductAdmin = async (token) => {
    const res = await axios.get('/api/product/ProductAdmin', {
        headers: {Authorization: token}
    })

    console.log(res.data)
    return res
}

export const dispatchGetAllProductAdmin = (res) => {
    return {
        type: ACTIONS.GET_ALL_PRODADMIN,
        payload: res.data


    }
     
}    


