import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from "react-router-dom"
import {
	Container,
	Box,
	Button,
	Card,
	CardHeader,
	Typography,
	TextField
} from '@mui/material';
import './client.css'
import './tab.css'
import {Link} from 'react-router-dom'
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import { createClientf, dispatchGetAllClientf, fetchAllClientf, listclientfs } from '../../redux/actions/servantActions/clientfAction';
import { CLIENTF_CREATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/clientfConstant';
import {dispatchGetAllClientAdmin ,fetchAllClientAdmin} from '../../redux/actions/servantActions/clientAdminAction' ;


const Client = () => {
  

  const {id} = useParams()
  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
  const navigate =  useNavigate();

 

  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
   
  const dispatch = useDispatch()
  const clientfCreate = useSelector((state) => state.clientfCreate)
  const {
    loading: loadingCreate,
     error: errorCreate,
    success: successCreate,
    clientf: createdClientf,
  } = clientfCreate

const clientfList = useSelector((state) => state.clientfList)
  const { loadingclient, error, clientf } = clientfList
  const clientfs = useSelector(state=> state.clientfs)
  const clientAdmin = useSelector(state=> state.clientAdmin)
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {user, isAdmin} = auth

  console.log(createdClientf)
         
    const handleDelete = async (id) => {
        try {
            if(clientfs._id !== id){
                if(window.confirm("Are you sure you want to delete this client?")){
                   setLoading(true)
                    await axios.delete(`/api/clientf/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
          
      
        }
    }


    useEffect(() => {
        dispatch({ type: CLIENTF_CREATE_RESET})
    
    if (successCreate) {
          navigate(`/inv/listclients/${createdClientf._id}`)
        } else {
          if(user.role===1){
            fetchAllClientAdmin(token).then(res =>{
                dispatch(dispatchGetAllClientAdmin(res))
            })}
            console.log(user.role)  
            if(user.role===0){
              fetchAllClientf(token).then(res =>{
                  dispatch(dispatchGetAllClientf(res))
              })}
        }
      }, [
        dispatch,
        successCreate,
        createdClientf,
        token,
        callback,
        dispatchGetAllClientAdmin,
        dispatchGetAllClientf,
        auth,
        fetchAllClientAdmin,
        fetchAllClientf,
        
      ])



      const createClientfHandler = () => {
        dispatch(createClientf())
      }
      
	return (
		<>
        <Box style={{marginTop:"80px", marginBottom:"20px"}}>
					 <Button variant="outlined" onClick={createClientfHandler}>
           NOUVEAU CLIENT      </Button>

					</Box>

                    <div style={{overflowX: "auto" ,width:"125%"}}>
          <table className="customers rounded-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NUMÉRO</th>
                <th>Société</th>
                <th>Type de client</th>
{user.role==1 && <th>Utilisateurs</th>}             

              </tr>
            </thead>
        { user.role== 0 &&   <tbody>
              {clientfs.map((clientf) => (
                <tr key={clientf._id}>
                  <td>{clientf._id}</td>
                  <td>{clientf.Refclient}</td>
                  <td>{clientf.Company}
                      <br/>
                      {clientf.Firstname}{clientf.Surname}
                  </td>
                  <td>{clientf.Typeclient}</td>
                

                  <td>
                  <Link to={`/inv/listclients/${clientf._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(clientf._id)}
        >
       
        </i>
                  </td>
                </tr>
              ))}
            </tbody>}
            { user.role== 1 &&   <tbody>
              {clientAdmin.map((clientf) => (
                <tr key={clientf._id}>
                  <td>{clientf._id}</td>
                  <td>{clientf.Refclient}</td>
                  <td>{clientf.Company}
                      <br/>
                      {clientf.Firstname}{clientf.Surname}
                  </td>
                  <td>{clientf.Typeclient}</td>
                  <td>{clientf.user.firstName}</td>
                  <td>
                  <Link to={`/inv/listclients/${clientf._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(clientf._id)}
        >
       
        </i>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
          </div>
			
				
				
			
			
			




            
		</>
	)
}

export default Client