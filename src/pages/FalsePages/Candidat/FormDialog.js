import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
//import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { LastPage, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
//import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import axios from 'axios';
//import { dispatchGetAllCandidat, fetchAllCandidat } from '../../redux/actions/candidatAction';
import { ToastContainer, toast } from 'react-toastify';
export default function FormDialog({SelectedCandidatIds}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
	const token = useSelector(state => state.token)
	const candidats = useSelector(state => state.candidats)
   	const [candidatsend, setCandidatSend] = useState()
    const [showvous, SetShowvous] = useState(false)

    const showvousCheckBox3 = () => {
      SetShowvous(!showvous);
    }
    
      const dateRef = useRef();
      const nomClientRef = useRef();
      const heurRef = useRef();
      const personneRef = useRef();
      const lieuRef = useRef();
      const FirstNameRef = useRef();
      const LastNameRef = useRef();
      const posteRef= useRef();
   

        const envoyermail = async()=>{
        const poste = posteRef.current.value;
        const date = dateRef.current.value;
        const nomClient = nomClientRef.current.value;
        const heur = heurRef.current.value;
        const personne = personneRef.current.value;
        const lieu = lieuRef.current.value;
        const FirstName = FirstNameRef.current.value;
        console.log(date)
        console.log(nomClient)
        console.log(heur)
        //console.log(id)
        try {
            const res = await axios.post('/api/candidat/sendmaillocaux/', {
                candidatsend,
                FirstName,
                date,
                nomClient,
                 heur, 
                 personne,
                 lieu,
                 poste
            },{
				headers: {Authorization: token}
			})
        } catch (error) {
            console.log(error)
        }

    }
      
    
    const envoyermail2 = async()=>{
      const poste = posteRef.current.value;
      const date = dateRef.current.value;
      const nomClient = nomClientRef.current.value;
      const heur = heurRef.current.value;
      const personne = personneRef.current.value;
      const lieu = lieuRef.current.value;
      const FirstName = FirstNameRef.current.value;
      //const LastName= LastName.current.value;




      console.log(date)
      console.log(nomClient)
      console.log(heur)
      //console.log(id)
      try {
          const res = await axios.post('/api/candidat/sendmaillocaux2/', {
              candidatsend,
              FirstName,
              date,
              nomClient,
               heur, 
               personne,
               lieu,
               poste
          },{
      headers: {Authorization: token}
    })
      } catch (error) {
          console.log(error)
      }

  }

    useEffect(() =>{

		//fetchAllCandidat(token).then(res =>{
      //      dispatch(dispatchGetAllCandidat(res))
        //})
        
    }, [token, dispatch])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Envoyer 
      </Button>
      <Dialog open={open} onClose={handleClose}>
      
        <DialogContent>
          <DialogContentText >
          <div className="App">
  
       

   <h1 style={{color:"black"}}>   MAIL CONFIRMATION ENTRETIEN LOCAUX CLIENT :</h1>
 
<div style={{textAlign: "" , 
  alignItems: "", marginTop:"50px"
  }}>
 <table>
  <tbody>
    <td> <p1 style={{marginLeft :"50px" ,marginTop:"90000px"}}>Bonjour </p1></td>
    <td> <Autocomplete 
										    multiple
                                            id="tags-outlined"
                                            options={ candidats }
                                            getOptionLabel={(option) => option.FirstName+" "+option.LastName}
                                            isOptionEqualToValue={(option, value)=> option._id === value._id}
                                            filterSelectedOptions
                                            onChange={(event, newValue) => {
                                                setCandidatSend(newValue)
                                            }}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label=""
                                                placeholder="Candidat"
                                                ref={FirstNameRef}
                                                
                                                />
                                            )}
                                      
                                      style={{width :"250px" ,marginLeft:"50px", marginTop:"0px"}}
                                      />
</td>
<td>          <Button onClick={showvousCheckBox3}>Tutoiement</Button>
</td>

  </tbody>
  </table>
  
  
  
  



  <br/>
{showvous ?(
  <div>
  <p>Comme convenu, je vous confirme votre entretien pour le poste </p>
  <p style={{marginRight :"290px"}}><input placeholder="d’Ingénieur DevOps" ref={posteRef}/></p>
  <p style={{marginRight :"5px"}}>
  qui aura lieu <input style={{fontWeight: "bold"}}  placeholder="ce mercredi 15 septembre " ref={dateRef}/>chez<input style={{fontWeight: "bold"}} placeholder=" NOMCLIENT :" ref={nomClientRef} />
  </p>
  <p style={{marginRight :"0px"}}>
  <input style={{fontWeight: "bold",}} placeholder="- à 16h30 " ref={heurRef}/>avec 
 <input style={{fontWeight: "bold", width:"260px"}}  placeholder = "Guillaume Michel (Manager de l’équipe)" ref={personneRef} /></p>
  <p style={{marginRight :"100px"}}>
  L’entretien aura lieu dans les locaux de la société
</p>
  <p style={{marginRight :"70px",}}> 
  <input 
  style={{fontWeight: "bold", width:"400px"}} 
  placeholder=" NOMCLIENT au 58, rue Jean Jacques Rousseau – 75010 Paris."
  ref={lieuRef}
  /></p>
  <p style={{marginRight :"30px"}}>
  Pour vous renseigner sur la société :<a href="http://www.google.com" style={{color:"blue"}}> http://www.google.com</a>
  </p>
  <p  style={{marginRight :"40px"}} > 
  Je reste disponible pour toute information complémentaire.</p>
  <p style={{fontWeight: "bold",marginRight :"70px"}}>Merci de me confirmer la bonne réception de ce mail.</p> 
   </div>
   )



 :(
  <div>
  <p>Comme convenu, je te confirme ton entretien pour le poste </p>
  <p style={{marginRight :"290px"}}><input placeholder="d’Ingénieur DevOps" ref={posteRef}/></p>
  <p style={{marginRight :"5px"}}>
  qui aura lieu <input style={{fontWeight: "bold"}}  placeholder="ce mercredi 15 septembre " ref={dateRef}/>chez<input style={{fontWeight: "bold"}} placeholder=" NOMCLIENT :" ref={nomClientRef} />
  </p>
  <p style={{marginRight :"0px"}}>
  <input style={{fontWeight: "bold",}} placeholder="- à 16h30 " ref={heurRef}/>avec 
 <input style={{fontWeight: "bold", width:"260px"}}  placeholder = "Guillaume Michel (Manager de l’équipe)" ref={personneRef} /></p>
  <p style={{marginRight :"100px"}}>
  L’entretien aura lieu dans les locaux de la société
</p>
  <p style={{marginRight :"70px",}}> 
  <input 
  style={{fontWeight: "bold", width:"400px"}} 
  placeholder=" NOMCLIENT au 58, rue Jean Jacques Rousseau – 75010 Paris."
  ref={lieuRef}
  /></p>
  <p style={{marginRight :"30px"}}>
  Pour te renseigner sur la société :<a href="http://www.google.com" style={{color:"blue"}}> http://www.google.com</a>
  </p>
  <p  style={{marginRight :"40px"}} > 
  Je reste disponible pour toute information complémentaire.</p>
  <p style={{fontWeight: "bold",marginRight :"70px"}}>Merci de me confirmer la bonne réception de ce mail.</p> 
   </div>
   )}
  </div> 
 
  <p  style={{marginRight :"250px", marginTop:"50px"}} >
  Cordialement / Best Regards,
  </p>
  <p style={{marginRight :"410px", marginTop:"40px",fontWeight: "bold" ,color:"black"}} >
  Halim Refas
  </p>
  <p style={{marginRight :"300px",  fontFamily:" Arial, Helvetica,sans-serif",fontWeight: "bold"}}>
  <em style={{color:"grey"}}>Consultant</em> <em style={{color:"#7FFF00"}}>en recrutement</em>
  </p><p style={{marginTop:"20px",marginRight :"300px" ,fontFamily: "Tahoma, Verdana, sans-serif" ,
  fontSize: "12px",fontWeight: "800", color:"black"
  }}>
  Green <em style={{color:"#7FFF00"}}>Links </em>- Chasseurs de Talents
  </p>
  <p style={{marginRight :"370px" ,fontFamily: "Tahoma, Verdana, sans-serif" ,fontWeight: "800",
  fontSize: "11px", color:"black"
  }}>Tour CIT - Montparnasse</p>
  <p style={{marginRight :"335px" ,fontFamily: "Tahoma, Verdana, sans-serif" ,fontWeight: "800",
  fontSize: "11px"
  }}>3 rue de l&#39;Arrivée - 75015 Paris</p>
  <p style={{marginRight :"270px" ,fontFamily: "Tahoma, Verdana, sans-serif" ,
  fontSize: "12px"
  }}>
  <a href="hrefas@greenlinks.fr" style={{color:"blue"}}>hrefas@greenlinks.fr</a> - +33 (0) 6 42 66 54 08
      </p>
   
    </div>
          </DialogContentText>
     
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          {showvous?(
          <Button onClick={envoyermail}>Envoyer email</Button>):
          (<Button onClick={envoyermail2}>Envoyer email</Button>)}

        </DialogActions>
      </Dialog>
    </div>
  );
}