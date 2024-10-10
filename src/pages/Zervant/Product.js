import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from "react-router-dom"
import {
	Box,
	Button,} from '@mui/material';
import './client.css'
import {Link} from 'react-router-dom'
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux'
import {dispatchGetAllProductAdmin ,fetchAllProductAdmin} from '../../redux/actions/servantActions/productAdminAction' ;
import { createProduct, dispatchGetAllProduct, fetchAllProduct, listproducts } from '../../redux/actions/servantActions/productAction';
import { PRODUCT_CREATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/productConstant';
import './tab.css'


const Product = () => {

  const {id} = useParams()

  const navigate =  useNavigate();

  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });

  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
   
  const dispatch = useDispatch()
  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
     error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

const productList = useSelector((state) => state.productList)
  const { loadingproduct, error, product} = productList
  const products = useSelector(state=> state.products)
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {user, isAdmin} = auth
  const productAdmin = useSelector(state=> state.productAdmin)


  console.log(createdProduct)
         
    const handleDelete = async (id) => {
        try {
            if(products._id !== id){
                if(window.confirm("Are you sure you want to delete this client?")){
                   setLoading(true)
                    await axios.delete(`/api/product/${id}`, {
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
        dispatch({ type: PRODUCT_CREATE_RESET})
    
    if (successCreate) {
          navigate(`/inv/listproducts/${createdProduct._id}`)
        } else {
          if(user.role===1){
            fetchAllProductAdmin(token).then(res =>{
                dispatch(dispatchGetAllProductAdmin(res))
            })}

            if(user.role===0){
              fetchAllProduct(token).then(res =>{
                  dispatch(dispatchGetAllProduct(res))
              })}
            console.log(user.role) 
        }
      }, [
        dispatch,
        successCreate,
        createdProduct,
        token,
        callback,
        dispatchGetAllProductAdmin,
        dispatchGetAllProduct,
        auth,
        fetchAllProductAdmin,
        fetchAllProduct,
        
      ])



      const createProductHandler = () => {
        dispatch(createProduct())
      }
      
	return (
		<>
        <Box style={{marginTop:"80px" , marginBottom:"20px"}}>
					 <Button variant="outlined" onClick={createProductHandler}>
           NOUVEAU PRIDUIT    </Button>

					</Box>

                    <div style={{overflowX: "auto" ,width:"125%"}}>
          <table className="customers  rounded-table" >
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Commentaire</th>
                <th>Unité</th>
                <th>Prix basé sur</th>
                <th>Prix HT</th>
                <th>TVA</th>
                <th>Catégories</th>
           {user.role==1 &&<th>utilisateurs</th>}



               
              </tr>
            </thead>
            {user.role==0 &&<tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.note}</td>
                  <td>{product.unite}</td>
                  <td> {product.baseprix}</td>
                  <td>{product.HTprix}</td>
                  <td>{product.TVA}</td>
                  <td>{product.category}</td>

                  <td>
                  <Link to={`/inv/listproducts/${product._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(product._id)}
        >
       
        </i>
                  </td>
                </tr>
              ))}
            </tbody>}
            {user.role==1 &&<tbody>
              {productAdmin.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.note}</td>
                  <td>{product.unite}</td>
                  <td> {product.baseprix}</td>
                  <td>{product.HTprix}</td>
                  <td>{product.TVA}</td>
                  <td>{product.category}</td>
                  <td>{product.user.firstName}</td>

                   
                  <td>
                  <Link to={`/inv/listproducts/${product._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
        <i className="fas fa-trash-alt" title="Remove"
         onClick={() => handleDelete(product._id)}
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

export default Product