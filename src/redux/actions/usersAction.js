import axios from 'axios';
import { toast } from 'react-toastify';
import ACTIONS from './index';

export const fetchAllUsers = async (token) => {
    const res = await axios.get('/api/user/allusers', {
        headers: { Authorization: token }
    });
    return res;
};

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    };
};

export const updateUserAccountLocked = (userId, updatedLockedStatus, token) => {
    return async dispatch => {
        try {
            await axios.patch(
                `/api/user/update/${userId}`,
                { accountLocked: updatedLockedStatus },
                { headers: { Authorization: token } }
            );

            dispatch(updateUser({ _id: userId, accountLocked: updatedLockedStatus }));

            // Affichage d'une notification toast pour indiquer le succès de l'opération
            toast.success(`Le verrouillage du compte a été ${updatedLockedStatus ? 'activé' : 'désactivé'} avec succès.`);

        } catch (error) {
            dispatch(updateUserError(error));
            console.error('Erreur lors de la mise à jour du statut de verrouillage du compte :', error);

            // Affichage d'une notification toast pour indiquer l'échec de l'opération
            toast.error('Une erreur s\'est produite lors de la mise à jour du statut de verrouillage du compte.');
        }
    };
};

export const updateUser = (updatedUser) => {
    return {
        type: ACTIONS.UPDATE_USER,
        payload: updatedUser
    };
};

export const updateUserError = (error) => {
    return {
        type: ACTIONS.UPDATE_USER_ERROR,
        payload: error
    };
};
