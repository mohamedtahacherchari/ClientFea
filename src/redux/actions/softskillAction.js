import ACTIONS from './index'
import axios from 'axios'

export const fetchAllsoftSkill = async (token) => {
    const res = await axios.get('/api/softskills/', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllsoftSkill = (res) => {
    return {
        type: ACTIONS.GET_ALL_SOFT_SKILLS,
        payload: res.data
    }
}