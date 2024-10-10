import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import './users.css'

import {Link} from 'react-router-dom'
import {fetchAllUsers, dispatchGetAllUsers,updateUserAccountLocked} from '../../redux/actions/usersAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = axios.create({
	baseURL : process.env.REACT_APP_SERVER_URL,
  });
const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

const Users = () => {
	const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin} = auth
   
    const users = useSelector(state => state.users)
console.log(users)
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])
    
    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Êtes-vous sûr de vouloir supprimer ce compte?")){
                    setLoading(true)
                    await axios.delete(`/api/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
  // Fonction pour manipuler la propriété accountLocked
  const toggleAccountLocked3 = async (userId, currentLockedStatus) => {
    try {
        const updatedLockedStatus = !currentLockedStatus; // Inverser le statut actuel

        // Envoyer la mise à jour au serveur
        await axios.patch(`/api/user/update/${userId}`, 
            { accountLocked: updatedLockedStatus }, 
            { headers: { Authorization: token } }
        );

        // Mettre à jour l'état local des utilisateurs après la mise à jour réussie
        const updatedUsers = users.map(user => {
            if (user._id === userId) {
                return { ...user, accountLocked: updatedLockedStatus };
            }
            return user;
        });
        dispatch(dispatchGetAllUsers(updatedUsers)); // Mettre à jour les utilisateurs dans le Redux store
        toast.success(`Le verrouillage du compte a été ${updatedLockedStatus ? 'activé' : 'désactivé'} avec succès.`);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de verrouillage du compte :', error);
        toast.error('Une erreur s\'est produite lors de la mise à jour du statut de verrouillage du compte.');
    }
};
const toggleAccountLocked2= async (userId, currentLockedStatus, dispatch, token) => {
    
    try {
        const updatedLockedStatus = !currentLockedStatus; // Inverser le statut actuel
        console.log(userId)
        console.log(updatedLockedStatus)
        // Envoyer la mise à jour au serveur
        await axios.patch(`/api/user/update/${userId}`, 
            { accountLocked: updatedLockedStatus }, 
            { headers: { Authorization: token } }
        );

        // Mettre à jour les utilisateurs après la mise à jour réussie
        const updatedUsers = {
            _id: userId,
            accountLocked: updatedLockedStatus
        };
       
        dispatch({ type: 'UPDATE_USER', payload: updatedUsers }); // Mettre à jour l'utilisateur dans le store Redux
        toast.success(`Le verrouillage du compte a été ${updatedLockedStatus ? 'activé' : 'désactivé'} avec succès.`);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de verrouillage du compte :', error);
        toast.error('Une erreur s\'est produite lors de la mise à jour du statut de verrouillage du compte.');
    }
};
const toggleAccountLocked4 = async () => {
    const updatedLockedStatus = !user.currentLockedStatus; // Inverser le statut actuel
    dispatch(updateUserAccountLocked(user._id, updatedLockedStatus, token));
};
const toggleAccountLocked = async (userId) => {
    // Obtenez le statut actuel de verrouillage du compte de l'utilisateur
    const userToUpdate = users.find(user => user._id === userId);
    if (!userToUpdate) {
        console.error('Utilisateur non trouvé.');
        return;
    }
    const updatedLockedStatus = !userToUpdate.accountLocked; // Inverser le statut actuel

    // Appel de l'action pour mettre à jour le statut de verrouillage du compte
    dispatch(updateUserAccountLocked(userId, updatedLockedStatus, token));
};

  	return (
    	<>
        {isAdmin}
    <div style={{display: 'flex',marginTop :"50px"}}>
  
        <div style={{flex: 6}}>
  
          <br/> 
          <ToastContainer />
          <div className="profile_page">
            
        
            <div className="col-right">
                <h2></h2>

                <div style={{overflowX: "auto"}}>
                    <table className="customers rounded-table" >
                        <thead>
                            <tr>
                            
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Ville</th>
                                <th>Admin</th>
                                <th>Verrouillage</th>
                                <th>Action</th>
                              
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                     
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.city}</td>

                                        <td>
                                            {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                <button onClick={() => toggleAccountLocked(user._id, user.accountLocked)} style={{ color: user.accountLocked ? 'red' : 'green' }}>
    {user.accountLocked ? 'Déverrouiller' : 'Verrouiller'} le compte
</button>       

                                </td>
                                        <td>
                                            <Link to={`/inv/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(user._id)} ></i>

                                </td>
             
                               
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </div>

    </>
  	)
}

export default Users
