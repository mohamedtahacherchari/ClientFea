
import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate ,useParams} from "react-router-dom"
import {Link} from 'react-router-dom'
import {Box,Button,Typography,TextField} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux'
import {listProductDetails, updateProduct } from '../../redux/actions/servantActions/productAction';
import { PRODUCT_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/productConstant';

const ListClient = () => {

  const {id} = useParams()
  const navigate =  useNavigate();


  const uniteOptions = [
    { value: 'h', label: 'h' },
    { value: 'cm', label: 'cm' },
    { value: 'm', label: 'm' },
    { value: 'km', label: 'km' },
    { value: 'kg', label: 'kg' },
    { value: 'h', label: 'h' },
    { value: 'pce', label: 'pce' },

  ]

  const categories = [

    { value: 'Électronique', label: 'Électronique' },
    { value: 'Mobiles', label: 'Mobiles' },
    { value: 'Ordinateurs portables', label: 'Ordinateurs portables' },
    { value: 'Mode', label: 'Mode' },
    { value: 'appareils électroménagers', label: 'appareils électroménagers' },
    { value: 'Maison', label: 'Maison' },

  ]
    const prix = [
      { value: 'Prix TTC', label: 'Prix TTC' },
      { value: 'Prix HT', label: 'Prix HT' },
   
    ];


    const arrayTVA = [
        { value: '0%', label: '0%' },
        { value: '2.1%', label: '2.1%' },
        { value: '5.5%', label: '5.5%' },
        { value: '10%', label: '10%' },
        { value: '20%', label: '20%' },



     
      ];

      const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      };
      const groupBadgeStyles = {
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
      };
      
      const formatGroupLabel = (options) => (
        <div style={groupStyles}>
          <span>{options.label}</span>
          <span style={groupBadgeStyles}>{options.length}</span>
        </div>
      );
      
      



  /* Les useStates */

const[name, setName]=useState('');
const[note,setNote]=useState('');
const[unite,setUnite]=useState('');
const[baseprix,setBaseprix]=useState('');
const[HTprix,setHTprix]=useState('');
const[TVA,setTVA]=useState('');
const[TTCprix,setTTCprix]=useState('');
const[category,setCategory]=useState('');






 // console.log(selectedUnite)
  //console.log(selectedPrix)
 // console.log(selectedTVA)





/******************** */


   
  const dispatch = useDispatch()
  const products = useSelector(state=> state.products)
	const token = useSelector(state => state.token)
  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate
 
  const productDetails = useSelector((state) => state.productDetails)

  const { loading, error, product } = productDetails


 
   
useEffect(() => {
  if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
  navigate('/inv/product')
  } 
                  
else{ 
if (!product.name || product._id !== id){
  dispatch(listProductDetails(id))
}          
      
  else {
  //setStatus(clientf.Status)
  setBaseprix(product.baseprix)
  setName(product.name)
  setNote(product.note)
  setUnite(product.unite)
  setHTprix(product.HTprix)
  setTVA(product.TVA)
  setTTCprix(product.TTCprix)
  setCategory(product.category)

}
}   }

, [dispatch, id, product, successUpdate])

const submitHandler = (e) => {
  e.preventDefault()
  dispatch(
    updateProduct({
      _id :id,
      name,
      note,
      unite,
      baseprix,
      HTprix,
      TVA,
      TTCprix,
      category,

    })
  )
}

      
	return (
		<>
				
      <div className="row">
                <Link to="/inv/product" style={{ textDecoration: "none" }}>
                <button className="go_back" style={{marginTop:"60Px"}}>
                    <i className="fas fa-long-arrow-alt-left"></i> Go Back
                </button>
                </Link>
            </div>
				
            <form onSubmit={submitHandler} >
            <Box  
style={{marginTop:"90px", marginLeft:"300px",
 width:"600px"
}}>
<h1 style={{marginLeft:"200px", marginBottom:"30px",
 color:"green"}}>Ajouter un produit </h1>
<ToastContainer />
<TextField
autoFocus
margin="dense"
id=""
label="Nom*"
type="text"
fullWidth
variant="standard"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<TextField
autoFocus
margin="dense"
id=""
label="Commentaire *"
type="text"
fullWidth
variant="standard"
value={note}
onChange={(e) => setNote(e.target.value)}
/>

<table>
<tbody>
<td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
Catégorie

</Typography></td>
<td>


   <select style={{width:"200px",height:"50px"}}
       onChange={(e) => setCategory(e.target.value)}
        value={category}
        
        >
   
          {categories.map((option)=>
          (<option  key={option.value}> {option.label}</option>))}

     </select>




</td>


</tbody>
</table>
<table>
<tbody>
<td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
unité
<p style={{color:"red" ,fontSize:"10px"}}>Choix obligatoire</p>

</Typography></td>
<td>


   <select style={{width:"200px",height:"50px"}}
       onChange={(e) => setUnite(e.target.value)}
        value={unite}
        
        >
   
          {uniteOptions.map((option)=>
          (<option  key={option.value}> {option.label}</option>))}

     </select>




</td>


</tbody>
</table>
<table>
<tbody>
<td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
Prix basé sur <p style={{color:"red" ,fontSize:"10px"}}>Choix obligatoire</p>

</Typography></td>
<td>
   <select 
   style={{width:"200px",height:"50px"}}
   onChange={(e) => setBaseprix(e.target.value)}
   value={baseprix}>
  
          {prix.map((option)=>
          (<option  key={option.value}> {option.label}</option>))}

     </select>
</td>


</tbody>
</table>

<TextField
autoFocus
margin="dense"
id=""
label="Prix HT*"
type="text"
fullWidth
variant="standard"
value={HTprix}
onChange={(e) => setHTprix(e.target.value)}
/>
<table>
<tbody>
<td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
TVA<p style={{color:"red" ,fontSize:"10px"}}>Choix obligatoire</p>
</Typography>


</td>
<td>
     <select style={{width:"200px",height:"50px"}}
       onChange={(e) => setTVA(e.target.value)}
        value={TVA}>
          {arrayTVA.map((option)=>
          (<option  key={option.value}> {option.label}</option>))}
     </select>


</td>


</tbody>
</table>

<TextField
autoFocus
margin="dense"
id=""
label="Prix TTC *"
type="text"
fullWidth
variant="standard"
value={TTCprix}
onChange={(e) => setTTCprix(e.target.value)}
/>

<Button onClick={()=>navigate("/inv/product")}>Retour à la liste des produits</Button>
<Button type='submit'>Modifier</Button>



</Box>
</form>  


            
		</>
	)
}

export default ListClient