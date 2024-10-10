import ACTIONS from './index'
import axios from 'axios'

export const fetchAllhardSkill = async (token) => {
    const res = await axios.get('/api/hardskills/', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllhardSkill = (res) => {
    return {
        type: ACTIONS.GET_ALL_HARD_SKILLS,
        payload: res.data
    }
}