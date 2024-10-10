
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import FormDialog from './FormDialog'
import FormDialog2 from './FormDialog2'
import FormDialog3 from './FormDialog3'



import axios from 'axios'
import React ,{ useRef, useState, useEffect } from 'react'
//import { dispatchGetAllCandidat, fetchAllCandidat } from '../../redux/actions/candidatAction';






export default function NestedList2() {
  const [open, setOpen] = React.useState(false);
const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const candidats = useSelector(state => state.candidats)
  
  const [candidatsend, setCandidatSend] = useState()
  
    const emailbodyRef = useRef();
    const emailsubjectRef = useRef();
  
  
    const envoyermail = async()=>{
        const emailbody = emailbodyRef.current.value;
        const emailsubject = emailsubjectRef.current.value;
        console.log(emailsubject)
        console.log(emailbody)
        console.log(candidatsend)
  
        try {
            const res = await axios.post('/api/candidat/senddynamictxtmail/', {
                candidatsend,
                emailsubject,
                emailbody
            },{
        headers: {Authorization: token}
      })
        } catch (error) {
            console.log(error)
        }
  
    }
  

    useEffect(() =>{
  
      //fetchAllCandidat(token).then(res =>{
          //    dispatch(dispatchGetAllCandidat(res))
        //  })
          
      }, [token, dispatch])
  



  
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
    >
  
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary="Envoyer des emails" />
        
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="MAIL CONFIRMATION ENTRETIEN LOCAUX CLIENT :" />
            <FormDialog/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary=" MAIL CONFIRMATION ENTRETIEN VISIO :" />
            <FormDialog2/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="MAIL DESCRIPTIFS DE POSTES: " />
            <FormDialog3/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}