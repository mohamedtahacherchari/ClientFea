import ACTIONS from '../actions/'

const hardSkills =[]

const softSkillsReducer = (state = hardSkills, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_HARD_SKILLS:
            return action.payload
        default:
            return state
    }
}

export default softSkillsReducer