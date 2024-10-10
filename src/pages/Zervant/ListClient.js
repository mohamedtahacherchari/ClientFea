
import React, {useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate ,useParams} from "react-router-dom"
import {Link} from 'react-router-dom'
import {Box,Button,Typography,TextField} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux'
import { listClientfDetails, updateClientf } from '../../redux/actions/servantActions/clientfAction';
import { CLIENTF_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/clientfConstant';

const ListClient = () => {

  const {id} = useParams()
  const navigate =  useNavigate();
  const [open, setOpen] = React.useState(false);
  const [condition, setCondition] = React.useState('');
  const [clientType, setClientType] = React.useState('');

  const ClientTypes = [
    { value: 'Client professionnel', label: 'Client professionnel' },
    { value: 'Client particulier', label: 'Client particulier' },
  ]
    const Condition = [
      { value: ' 0 jours', label: ' 0 jours' },
      { value: ' 7 jours', label: '7jours ' },
      { value: ' 14 jours', label: '14 jours ' },
      { value: ' 30 jours', label: '30 jours ' },
      { value: ' 40 jours', label: '40 jours ' },
      { value: ' 45 jours', label: '45 jours ' },
      { value: ' 60 jours', label: '60 jours ' },
      { value: ' 90 jours', label: '90 jours ' },
    ];

  /* Les useStates */

//const[Typeclient, setTypeclient]=useState('');
const[Refclient,setRefclient]=useState('');
const[Company,setCompany]=useState('');
const[NumberSiret,setNumberSiret]=useState('');
const[VATnumber,setVATnumber]=useState('');
const[Title,setTitle]=useState('');
const[Firstname,setFirstname]=useState('');
const[Surname,setSurname]=useState('');
const[Email,setEmail]=useState('');
const[Phone,setPhone]=useState('');
const[Portable,setPortable]=useState('');
const[Address,setAddress]=useState('');
const[Codepostal,setCodepostal]=useState('');
const[City,setCity]=useState('');
const[Typeclient,setTypeclient]=useState('');
const [PaymentTerms, setPaymentTerms] = useState('');



/*const changeHandler = (event) => {
  setSelectedOption(event.target.value)
  console.log(selectedOption)
}
const changeHandler2 = (event) => {
  setSelectedOption2(event.target.value)
}*/



/******************** */


   
  const dispatch = useDispatch()
  const clientfs = useSelector(state=> state.clientfs)
	const token = useSelector(state => state.token)
  const clientfUpdate = useSelector((state) => state.clientfUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = clientfUpdate
 
  const clientfDetails = useSelector((state) => state.clientfDetails)

  const { loading, error, clientf } = clientfDetails

  const handleChange = (event) => {
    setCondition(event.target.value);
  };
  const handleChange2 = (event) => {
    setClientType(event.target.value);
  };


   
useEffect(() => {
  if (successUpdate) {
      dispatch({ type: CLIENTF_UPDATE_RESET })
  navigate('/inv/CLIENTS')
  } 
                  
else{ 
if (!clientf.Firstname || clientf._id !== id){
  dispatch(listClientfDetails(id))
}          
      
  else {
  setTypeclient(clientf.Typeclient)
  setRefclient(clientf.Refclient)
  setCompany(clientf.Company)
  setNumberSiret(clientf.NumberSiret)
  setVATnumber(clientf.VATnumber) 
  setTitle(clientf.Title)  
  setFirstname(clientf.Firstname)
  setSurname(clientf.Surname)  
  setEmail(clientf.Email) 
  setPhone(clientf.Phone)
  setPortable(clientf.Portable)
  setAddress(clientf.Address) 
  setCodepostal(clientf.Codepostal) 
  setCity(clientf.City)
  setPaymentTerms(clientf.PaymentTerms)

  //setValue(clientf.value)
  //setValue2(clientf.value2)
  //console.log(clientf.value.label)
//  console.log(value2.label)
}
}   }

, [dispatch, id, clientf, successUpdate])

const submitHandler = (e) => {
  e.preventDefault()
  dispatch(
    updateClientf({
      _id :id,
      Typeclient,
      Refclient,
      Company,
      NumberSiret,
      VATnumber,
      Title,
      Firstname,
      Surname,
      Email,
      Phone,
      Portable ,
      Address,
      Codepostal,
      City,
      PaymentTerms,
    })
  )
}

       // console.log(selectedOption)

	return (
		<>
				
      <div className="row">
                <Link to="/inv/CLIENTS" style={{ textDecoration: "none" }}>
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
 color:"green"}}>Ajouter un client </h1>
<ToastContainer />


<table>
<tbody>
<td>
<Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
Type de client </Typography>
<p style={{color:"red" ,fontSize:"10px"}}>Choix obligatoire</p>

</td>
<td>
<select style={{width:"200px",height:"50px"}}
onChange={(e) => setTypeclient(e.target.value)}
value={Typeclient}>
    { ClientTypes.map((option)=>
    (<option key={option.value}>{option.label}</option>))}
</select>

{/*<div>
      {options.map((option) => (
        <button key={option.value} value={option.value} onClick={() => handleButtonClick(option.value)}>{option.label}</button>
      ))}
      <p>Selected option: {selectedOption}</p>
      </div>--!*/}
  </td>








</tbody>
</table>
<TextField
autoFocus
margin="dense"
id=""
label="Référence client*"
type="text"
fullWidth
variant="standard"
value={Refclient}
onChange={(e) => setRefclient(e.target.value)}
/>
<h1 style={{color:"green" , marginLeft:"220px"}}>COORDONNEES</h1>
<TextField
autoFocus
margin="dense"
id="name"
label="Nom de l'entreprise*"
type="text"
fullWidth
variant="standard"
value={Company}
onChange={(e) => setCompany(e.target.value)}

/>

<TextField
autoFocus
margin="dense"
id="name"
label="Numéro de SIRET"
type="text"
fullWidth
variant="standard"
value={NumberSiret}
onChange={(e) => setNumberSiret(e.target.value)}
/>
<TextField
autoFocus
margin="dense"
id="name"
label="Numéro de TVA"
type="text"
fullWidth
variant="standard"
value={VATnumber}
onChange={(e) => setVATnumber(e.target.value)}
/>
   <TextField
autoFocus
margin="dense"
id="name"
label="Title"
type="text"
fullWidth
variant="standard"
value={Title}
onChange={(e) => setTitle(e.target.value)}
/>
         <TextField
autoFocus
margin="dense"
id="name"
label="Prénom"
type="text"
fullWidth
variant="standard"
value={Firstname}
onChange={(e) => setFirstname(e.target.value)}
/>
         <TextField
autoFocus
margin="dense"
id="name"
label="Nom de famille"
type="text"
fullWidth
variant="standard"
value={Surname}
onChange={(e) => setSurname(e.target.value)}
/>
         <TextField
autoFocus
margin="dense"
id="name"
label="E-mail"
type="email"
fullWidth
variant="standard"
value={Email}
onChange={(e) => setEmail(e.target.value)}
/>
         <TextField
autoFocus
margin="dense"
id="name"
label="Téléphone"
type="number"
fullWidth
variant="standard"
value={Phone}
onChange={(e) => setPhone(e.target.value)}
/>
         <TextField
autoFocus
margin="dense"
id="name"
label="Portable"
type="number"
fullWidth
variant="standard"
value={Portable}
onChange={(e) => setPortable(e.target.value)}
/>
<h1  style={{color:"green" , marginLeft:"180px"}}>ADRESSE DE FACTURATION</h1>

<TextField
autoFocus
margin="dense"
id="name"
label="Adresse"
type="text"
fullWidth
variant="standard"
value={Address}
onChange={(e) => setAddress(e.target.value)}
/>
         <TextField
autoFocus
margin="dense"
id="name"
label="Code postal"
type="text"
fullWidth
variant="standard"
value={Codepostal}
onChange={(e) => setCodepostal(e.target.value)}
/>
         <TextField
autoFocus
margin="dense"
id="name"
label="Ville"
type="text"
fullWidth
variant="standard"
value={City}
onChange={(e) => setCity(e.target.value)}
/>

<h1  style={{color:"green" , marginLeft:"180px"}}>INFORMATION DE FACTURATION</h1>


<table>
<tbody>
<td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
Conditions de paiement
<p style={{color:"red" ,fontSize:"10px"}}>Choix obligatoire</p>
</Typography></td>
<td>


      <select 
style={{width:"200px",height:"50px"}}
onChange={(e) => setPaymentTerms(e.target.value)}
value={PaymentTerms}
//</td>placeholder={selectedOption2}
>

{Condition.map((option)=>
(<option  key={option.value}> {option.label}</option>))}
</select>
</td>


</tbody>
</table>

<Button onClick={()=>navigate("/inv/CLIENTS")}>Retour à la liste des produits</Button>
<Button type='submit'>Modifier</Button>



</Box>
</form>  


            
		</>
	)
}

export default ListClient