import React, {useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from "react-router-dom"
import {Box,Button} from '@mui/material';
import './client.css'
import './tab.css'
import {Link} from 'react-router-dom'
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector,useDispatch} from 'react-redux'
import { createFacture, dispatchGetAllFacture, fetchAllFacture} 
from '../../redux/actions/servantActions/factureAction';
import {dispatchGetAllFactureAdmin ,fetchAllFactureAdmin} from '../../redux/actions/servantActions/factureAdminAction' ;
import { FACTURE_CREATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/factureConstant';
import '@fortawesome/fontawesome-free/css/all.css';


const Facture = () => {
const{id} =useParams()

  const navigate =  useNavigate();



  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const [isAdministrateur, setIsAdministrateur]= useState(false)
   
  const dispatch = useDispatch()
  const factureCreate = useSelector((state) => state.factureCreate)
  const {
     loading: loadingCreate,
     error: errorCreate,
    success: successCreate,
    facture: createdFacture,
  } = factureCreate

const factureList = useSelector((state) => state.factureList)
  const { loadingfacture, error, facture } = factureList
  const factures = useSelector(state=> state.factures)
  const facturesAdmin = useSelector(state=> state.facturesAdmin)

  const clientfs = useSelector(state=> state.clientfs)
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {user, isAdmin} = auth
 

  console.log(createdFacture)
     console.log(facturesAdmin)    
    const handleDelete = async (id) => {
        try {
            if(factures._id !== id){
                if(window.confirm("Are you sure you want to delete this facture?")){
                   setLoading(true)
                    await axios.delete(`/api/facture/${id}`, {
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
      dispatch({ type: FACTURE_CREATE_RESET})
   if (successCreate) {
        navigate(`/inv/listfacture/${createdFacture._id}`)
      } else {
         if(user.role===1){
          fetchAllFactureAdmin(token).then(res =>{
              dispatch(dispatchGetAllFactureAdmin(res))
          })}
          console.log(user.role)  
          if(user.role===0){
            fetchAllFacture(token).then(res =>{
                dispatch(dispatchGetAllFacture(res))
            })}
}
    }, [dispatch,
      successCreate,
      createdFacture,
      token,
      callback,
      dispatchGetAllFactureAdmin,
      dispatchGetAllFacture,
      auth,
      fetchAllFactureAdmin,
      fetchAllFacture,
    
    ])

   


      const createFactureHandler = () => {
        dispatch(createFacture())
      }
     const totalSum = factures.reduce((acc, cur) => acc + cur.total, 0);
     const totalSum2 = facturesAdmin.reduce((acc, cur) => acc + cur.total, 0);
    const totalSum3 = totalSum +totalSum2
     console.log(totalSum)
	return (
		<>
        <Box style={{marginTop:"80px" ,marginBottom:"20px"}}>
					 <Button variant="outlined" onClick={createFactureHandler}>
           NOUVELLE Facture      </Button>

					</Box>

                    <div style={{overflowX: "auto" ,width:"100%"}}>
          <table className="customers  rounded-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Numéro</th>
                <th>Titre</th>
                <th>Client</th>
                <th>Numéro d'engagement</th>
                <th>Montant Final</th>
{user.role==1 && <th>Utilisateurs</th>}
              
               </tr>
            </thead>
        {user.role === 1 && <tbody>
              {facturesAdmin.map((facture) => (
                <tr key={facture._id}>
                  <td>{facture._id}</td>
                  <td>{facture.num}</td>
                  <td>{facture.titredoc}</td>
                  <td>{facture.clientf}</td>
                  <td>{facture.enga}</td>
                  <td>{facture.total}</td>
{user.role==1 &&<td>{facture.user.firstName}</td>} 
                  <td>
                  <Link to={`/inv/listfacture/${facture._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(facture._id)}
        >
       
        </i>
                  </td>
                </tr>
              ))}
            </tbody>}
            {user.role===0 && <tbody>
              {factures.map((facture) => (
                <tr key={facture._id}>
                  <td>{facture._id}</td>
                  <td>{facture.num}</td>
                  <td>{facture.titredoc}</td>
                  <td>{facture.clientf}</td>
                  <td>{facture.enga}</td>
                  <td>{facture.total}</td> 
                  <td>
                  <Link to={`/inv/listfacture/${facture._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(facture._id)}
        >
        </i>         
 
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>

    
   
          <h2>Total TTC: {totalSum3}</h2>
    
          </div>
			
				
				
			  
			
			




            
		</>
	)
}

export default Facture