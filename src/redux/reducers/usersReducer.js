import ACTIONS from '../actions/index';

const initialState = [];

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.GET_ALL_USERS:
            return action.payload;
        case ACTIONS.UPDATE_USER:
            // Mise à jour de l'utilisateur dans le state
            return state.map(user => {
                if (user._id === action.payload._id) {
                    return {
                        ...user,
                        accountLocked: action.payload.accountLocked
                    };
                }
                return user;
            });
        case ACTIONS.UPDATE_USER_ERROR:
            // Gestion des erreurs de mise à jour de l'utilisateur
            // Vous pouvez ajouter la logique pour gérer l'erreur ici
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', action.payload);
            return state;
        default:
            return state;
    }
};

export default usersReducer;
