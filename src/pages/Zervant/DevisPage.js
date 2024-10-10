import React, {useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from "react-router-dom"
import {Box,Button} from '@mui/material';
import './client.css'
import {Link} from 'react-router-dom'
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux'
import { createDevis, dispatchGetAllDevis, fetchAllDevis } from '../../redux/actions/servantActions/devisAction';
import { DEVIS_CREATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/devisConstant';
import {dispatchGetAllDevisAdmin ,fetchAllDevisAdmin} from '../../redux/actions/servantActions/devisAdminAction' ;
import './tab.css'


const DevisPage = () => {

  const navigate =  useNavigate();

 

  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
   
  const dispatch = useDispatch()
  const devisCreate = useSelector((state) => state.devisCreate)
  const {
     loading: loadingCreate,
     error: errorCreate,
    success: successCreate,
    devis: createdDevis,
  } = devisCreate
  const auth = useSelector(state => state.auth)

  const {user, isAdmin} = auth

const devisList = useSelector((state) => state.devisList)
const devisAdmin = useSelector(state=> state.devisAdmin)

  const { loadingdevis, error, devise } = devisList
  const devis = useSelector(state=> state.devis)
  const clientfs = useSelector(state=> state.clientfs)
  const token = useSelector(state => state.token)
 

  console.log(createdDevis)
         
    const handleDelete = async (id) => {
        try {
            if(devis._id !== id){
                if(window.confirm("Are you sure you want to delete this devis?")){
                   setLoading(true)
                    await axios.delete(`/api/devis/${id}`, {
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
        dispatch({ type: DEVIS_CREATE_RESET})
    
    if (successCreate) {
          navigate(`/inv/listdevis/${createdDevis._id}`)
        } else {


          if(user.role===1){
            fetchAllDevisAdmin(token).then(res =>{
                dispatch(dispatchGetAllDevisAdmin(res))
            })}
            console.log(user.role)  

            if(user.role===0){
              fetchAllDevis(token).then(res =>{
                  dispatch(dispatchGetAllDevis(res))
              })}
      
        }
      }, [
        dispatch,
       // successCreate,
        createdDevis,
        token,
        callback,
        dispatchGetAllDevisAdmin,
        dispatchGetAllDevis,
        auth,
        fetchAllDevisAdmin,
        fetchAllDevis,])



      const createDevisHandler = () => {
        dispatch(createDevis())
      }
      
      const totalSum = devis.reduce((acc, cur) => acc + cur.total, 0);
      const totalSum2 = devisAdmin.reduce((acc, cur) => acc + cur.total, 0);


	return (
		<>
        <Box style={{marginTop:"80px" ,marginBottom:"20px"}}>
					 <Button variant="outlined" onClick={createDevisHandler}>
           NOUVEAU Devis     </Button>

					</Box>

                    <div style={{overflowX: "auto" ,width:"100%"}}>
          <table className="customers rounded-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Numéro</th>
                <th>Date </th>
                <th>Date de validité</th>
                <th>Client</th>
                <th>Montant Final</th>
{user.role==1 && <th>Utilisateurs</th>}
               </tr>
            </thead>
            {user.role === 1 && <tbody>
              {devisAdmin.map((devis) => (
                <tr key={devis._id}>
                  <td>{devis._id}</td>
                  <td>{devis.num}</td>
                  <td>{devis.date1}</td>
                  <td>{devis.date3}</td>
                  <td>{devis.clientf}</td>
                  <td>{devis.total}</td> 
                  <td>{devis.user.firstName}</td> 

                  <td>
                  <Link to={`/inv/listdevis/${devis._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(devis._id)}
        >
       
        </i>
                  </td>
                </tr>
              ))}
            </tbody>}
            {user.role===0 && <tbody>
              {devis.map((devis) => (
                <tr key={devis._id}>
                  <td>{devis._id}</td>
                  <td>{devis.num}</td>
                  <td>{devis.date1}</td>
                  <td>{devis.date3}</td>
                  <td>{devis.clientf}</td>
                  <td>{devis.total}</td> 

                  <td>
                  <Link to={`/inv/listdevis/${devis._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(devis._id)}
        >
       
        </i>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
{user.role==0 &&<h2>Total TTC: {totalSum.toFixed(2)}</h2>}
{user.role==1 &&<h2>Total TTC: {totalSum2.toFixed(2)}</h2>}

          </div>
			
				
				
			
			
			




            
		</>
	)
}

export default DevisPage