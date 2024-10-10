import ACTIONS from '../actions/'

const softSkills =[]

const softSkillsReducer = (state = softSkills, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_SOFT_SKILLS:
            return action.payload
        default:
            return state
    }
}

export default softSkillsReducer