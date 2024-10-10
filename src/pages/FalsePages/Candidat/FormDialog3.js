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
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../../redux/actions/authAction';
import axios from 'axios';
//import { dispatchGetAllCandidat, fetchAllCandidat } from '../../../redux/actions/candidatAction';
import { createClientf, dispatchGetAllClientf, fetchAllClientf, listclientfs } from '../../../redux/actions/servantActions/clientfAction';

import { ToastContainer, toast } from 'react-toastify';
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
	
	const token = useSelector(state => state.token)
	const candidats = useSelector(state => state.candidats)
  const clientfs = useSelector(state=> state.clientfs)

	const [candidatsend, setCandidatSend] = useState()
  const [showvous, SetShowvous] = useState(false)

  const showvousCheckBox3 = () => {
    SetShowvous(!showvous);
  }
    //const emailbodyRef = useRef();
    //const emailsubjectRef = useRef();
    const posteRef = useRef();

    const envoyermail = async()=>{
        const poste= posteRef.current.value;
        //const emailbody = emailbodyRef.current.value;
        //const emailsubject = emailsubjectRef.current.value;
        //console.log(emailsubject)
        //console.log(emailbody)
        //console.log(candidatsend)

        try {
            const res = await axios.post('/api/facture/sendmaildescriptiondeposte/', {
                candidatsend,
                poste
                //emailbody
            },{
				headers: {Authorization: token}
			})
        } catch (error) {
            console.log(error)
        }

    }
    const envoyermail2 = async()=>{
      const poste= posteRef.current.value;
      //const emailbody = emailbodyRef.current.value;
      //const emailsubject = emailsubjectRef.current.value;
      //console.log(emailsubject)
      //console.log(emailbody)
      //console.log(candidatsend)

      try {
          const res = await axios.post('/api/facture/sendmaildescriptiondeposte2/', {
              candidatsend,
              poste
              //emailbody
          },{
      headers: {Authorization: token}
    })
      } catch (error) {
          console.log(error)
      }

  }
    useEffect(() =>{

		fetchAllClientf(token).then(res =>{
            dispatch(dispatchGetAllClientf(res))
      })
        
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
  


   <h1 style={{color:"black"}}>   MAIL DESCRIPTIFS DE POSTES :</h1>
  <div style={{textAlign: "center" , 
  alignItems: "center", marginTop:"50px"
  }}>
     <table>
  <tbody>
    <td> <p1 style={{marginLeft :"50px" ,marginTop:"90000px"}}>Bonjour </p1></td>
    <td> <Autocomplete 
										    multiple
                                            id="tags-outlined"
                                            options={ clientfs }
                                            getOptionLabel={(option) => option.Firstname+" "+option.Surname}
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
  <p style={{marginRight :"30px", marginTop:"30px"}}>
  Suite à notre échange, vous trouverez, ci-joint, comme convenu, </p>
  <p  style={{marginRight :"170px"}}>les descriptifs des postes dont on a discuté.</p>
  <br/>
  <p style={{marginRight :"50px"}}>
  Je vous positionne aujourd&#39;hui sur <input style={{fontWeight: "bold",}} placeholder="nombre des postes " ref={posteRef}/>.</p>
  <p style={{marginTop:"30px" ,marginRight:"40px"}}>
  Vous pouvez me donner vos créneaux de disponibilité pour des
   </p><p style={{marginRight:"200px"}}>entretiens par retour de mail également.</p>
  <p style={{marginTop:"30px" , marginRight:"30px"}}>Si vous avez des questions, je reste disponible au 0642665408.</p>
  <p style={{marginTop:"30px" ,marginRight:"10px"}}>
    
 PS: comme expliqué de vive voix, ces descriptifs sont confidentiels</p>
  <p style={{marginRight:"0px"}}>donc merci de ne

  pas les partager ou de donner les noms des clients</p>
  <p style={{marginRight:"120px"}}> à d&#39;autres cabinets. Je vous en
  remercie par avance.
  </p>

  <p  style={{marginRight :"40px" ,marginTop:"30px"}} > 
  Je reste disponible pour toute information complémentaire.</p>
  <p style={{fontWeight: "bold",marginRight :"70px"}}>Merci de me confirmer la bonne réception de ce mail.</p>
  </div>
  ):(

    <div>
    <p style={{marginRight :"30px", marginTop:"30px"}}>
    Suite à notre échange, tu trouveras, ci-joint, comme convenu, </p>
    <p  style={{marginRight :"170px"}}>les descriptifs des postes dont on a discuté.</p>
    <br/>
    <p style={{marginRight :"50px"}}>
    Je te positionne aujourd&#39;hui sur <input style={{fontWeight: "bold",}} placeholder="nombre des postes " ref={posteRef}/>.</p>
    <p style={{marginTop:"30px" ,marginRight:"40px"}}>
    Tu peux me donner tes créneaux de disponibilité pour des
     </p><p style={{marginRight:"200px"}}>entretiens par retour de mail également.</p>
    <p style={{marginTop:"30px" , marginRight:"30px"}}>Si tu as des questions, je reste disponible au 0642665408.</p>
    <p style={{marginTop:"30px" ,marginRight:"10px"}}>
      
   PS: comme expliqué de vive voix, ces descriptifs sont confidentiels</p>
    <p style={{marginRight:"0px"}}>donc merci de ne
  
    pas les partager ou de donner les noms des clients</p>
    <p style={{marginRight:"120px"}}> à d&#39;autres cabinets. Je t' en
    remercie par avance.
    </p>
  
    <p  style={{marginRight :"40px" ,marginTop:"30px"}} > 
    Je reste disponible pour toute information complémentaire.</p>
    <p style={{fontWeight: "bold",marginRight :"70px"}}>Merci de me confirmer la bonne réception de ce mail.</p>
    </div>
  )}
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
    </div>
          </DialogContentText>
     
        </DialogContent>
        <DialogActions>
        {showvous?(
          <Button onClick={envoyermail}>Envoyer email</Button>):
          (<Button onClick={envoyermail2}>Envoyer email</Button>)}
          <Button onClick={handleClose}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}