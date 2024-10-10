import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Visibility, VisibilityOff } from '@mui/icons-material'
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
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [showvous, SetShowvous] = useState(false)

  const showvousCheckBox3 = () => {
    SetShowvous(!showvous);
  }
  const dispatch = useDispatch()
	
	const token = useSelector(state => state.token)
	const candidats = useSelector(state => state.candidats)

	const [candidatsend, setCandidatSend] = useState()

    const posteRef = useRef();
    const FirstNameRef = useRef();
    const dateRef = useRef();
    

    const envoyermail = async()=>{
        const FirstName = FirstNameRef.current.value;
        const poste = posteRef.current.value;
        const date = dateRef.current.value;

        console.log(FirstName)
        console.log(candidatsend)

        try {
            const res = await axios.post('/api/candidat/sendmailvisio/', {
                candidatsend,
                FirstName,
                poste,
                date
                
            },{
				headers: {Authorization: token}
			})
        } catch (error) {
            console.log(error)
        }

    }
    const envoyermail2 = async()=>{
      const FirstName = FirstNameRef.current.value;
      const poste = posteRef.current.value;
      const date = dateRef.current.value;

      console.log(FirstName)
      console.log(candidatsend)

      try {
          const res = await axios.post('/api/candidat/sendmailvisio2/', {
              candidatsend,
              FirstName,
              poste,
              date
              
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
          <DialogContentText>
          <div className="">
  

   <h2 style={{color: "black"}}>   MAIL CONFIRMATION ENTRETIEN VISIO :</h2>
  <div style={{textAlign: "center" , 
  alignItems: "center", marginTop:"50px"
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
  
  {showvous ?(
  <div>
  <p style={{marginRight :"50px"}} >
  
  Comme convenu lors de notre échange d&#39;hier, je vous confirme </p>
  <p style={{marginRight :"90px"}}>votre entretien pour le poste de  <input placeholder="d’Ingénieur DevOps" ref={posteRef}/></p>
  <p style={{marginRight :"210px"}}>qui aura lieu 
  <input style={{fontWeight: "bold", fontSize: "16px"}}  placeholder="mardi 18 octobre à 11h" ref={dateRef}/>
  </p>
  <p style={{marginRight :"120px"}}>
  avec Dominique Sanchez (CTO) en visioconférence :</p>
  <p style={{marginRight :"300px"}}><a href="https://meet.google.com/" style={{color:"blue"}}>( le lien visio du meeting).</a>
  </p>
  <p style={{marginRight :"50px"}}>
Pour vous renseigner sur la société :<a href="http://www.google.com" style={{color:"blue"}}> http://www.google.com</a>
</p>
<p  style={{marginRight :"60px"}} > 
  Je reste disponible pour toute information complémentaire.</p>
  <p style={{fontWeight: "bold",marginRight :"90px"}}>Merci de me confirmer la bonne réception de ce mail.</p>
  </div>
   ) : (

    <div>
    <p style={{marginRight :"50px"}} >
    
    Comme convenu lors de notre échange d&#39;hier, je te confirme </p>
    <p style={{marginRight :"90px"}}>ton entretien pour le poste de  <input placeholder="d’Ingénieur DevOps" ref={posteRef}/></p>
    <p style={{marginRight :"210px"}}>qui aura lieu 
    <input style={{fontWeight: "bold", fontSize: "16px"}}  placeholder="mardi 18 octobre à 11h" ref={dateRef}/>
    </p>
    <p style={{marginRight :"120px"}}>
    avec Dominique Sanchez (CTO) en visioconférence :</p>
    <p style={{marginRight :"300px"}}><a href="https://meet.google.com/" style={{color:"blue"}}>( le lien visio du meeting).</a>
    </p>
    <p style={{marginRight :"50px"}}>
  Pour te renseigner sur la société :<a href="http://www.google.com" style={{color:"blue"}}> http://www.google.com</a>
  </p>
  <p  style={{marginRight :"60px"}} > 
    Je reste disponible pour toute information complémentaire.</p>
    <p style={{fontWeight: "bold",marginRight :"90px"}}>Merci de me confirmer la bonne réception de ce mail.</p>
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