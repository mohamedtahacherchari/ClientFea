import {React ,useState} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material';
import AutocompleteFact from './AutocompleteFact'




const Facture = () => {
     const navigate = useNavigate()
	 const [open, setOpen] = useState(false);
	 const handleClick = () => {
		setOpen(!open);
	  };
	return (
		<> <table>
			<tbody >

				<td>
					<table>
						<tbody>
                             <div style={{marginTop:"60px" ,width:"650px"}}>
							<td>
								
								<h1 >Facture</h1>
							
							</td>
							<div style={{marginLeft:"190px"}}>
							<td> <AutocompleteFact /></td>
							<td>
				
				<Button variant="outlined"   onClick={()=>navigate("/Nouvellefacture")}
				style={{backgroundColor:"green" ,color:"white" ,width:"200px",marginTop:"25px",
			    height :"60px"
			}}
			>         
					   NOUVELLE FACTURE     </Button>						
										</td>
							</div>
							
         
						
							</div>
						</tbody>
						
					</table>
			
					
				

		
    
			
					
				
				
			
			</td>
				<td>
					<div 
					style={{width:"580px" ,marginTop:"60px" ,
					
			  }}
					>
						
						<h1 >Facture</h1>
				<p> Sélectionnez une facture dans la liste de gauche 
					pour eb voir en détails
					</p>

	
					</div>
					</td>
			</tbody>
		</table>
			



            
		</>
	)
}

export default Facture
