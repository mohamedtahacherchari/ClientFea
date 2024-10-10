import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
	Container,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Typography,
	TextField
} from '@mui/material';

import axios from "axios";
import {useSelector} from 'react-redux'

import { Country, State }  from 'country-state-city';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material'
import UnstyledSelectIntroduction from './ListButton'
import UnstyledSelectIntroduction2 from './ListButton2'
import UnstyledSelectIntroduction3 from './ListButton3';
import UnstyledSelectIntroduction4 from './ListButton4';
import UnstyledSelectIntroduction5 from './ListButton5';
import UnstyledSelectIntroduction6 from './ListButton6';



const countries = Country.getAllCountries();

const Produit = () => {

	const token = useSelector(state => state.token)
    const [open, setOpen] = React.useState(false);

	const [selectedcountry, setSelectedCountry] = useState()
	const [selectedstate, setSelectedState] = useState()
	const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)
	const [show4, setShow4] = useState(false)
	const [show5, setShow5] = useState(false)
	const [show6, setShow6] = useState(false)
	
	const FirstNameRef = useRef();
	const LastNameRef = useRef();
	const phoneNumberRef = useRef();
	const phoneNumber2Ref = useRef();
	const companyNameRef = useRef();
	const EmailRef = useRef();
	const CountryRef = useRef();
	const StateRef = useRef();

	const StepName1Ref = useRef();
	const Description1Ref = useRef();
	const StepName2Ref = useRef();
	const Description2Ref = useRef();
	const StepName3Ref = useRef();
	const Description3Ref = useRef();
	const StepName4Ref = useRef();
	const Description4Ref = useRef();
	const StepName5Ref = useRef();
	const Description5Ref = useRef();
	const StepName6Ref = useRef();
	const Description6Ref = useRef();
	const StepName7Ref = useRef();
	const Description7Ref = useRef();
	const StepName8Ref = useRef();
	const Description8Ref = useRef();
	const StepName9Ref = useRef();
	const Description9Ref = useRef();
	const StepName10Ref = useRef();
	const Description10Ref = useRef();

	const onchangeCountry = (e) => {
		setSelectedCountry(e.target.value)
	}

	const onchangeState = (e) => {
		setSelectedState(e.target.value)
	}



    const handleClick = () => {
        setOpen(!open);
      };
      
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


	return (
		<>
			<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8
			}}
			>
			<Container maxWidth="lg">
			<ToastContainer />
					<CardHeader
						subheader="Ajouter Produit"
						title="Produits"
					/>
					

					
					<CardHeader
						title=""
					/>

					<Divider />
					
				

					<Box
						sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2
						}}
					>
					 <Button variant="outlined" onClick={handleClickOpen}>
           NOUVEAU PRODUIT     </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>NOUVEAU PRODUIT</DialogTitle>
        <DialogContent>
         
        

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ajouter un nom *"
            type="email"
            fullWidth
            variant="standard"
          />
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ajouter une note*"
            type="email"
            fullWidth
            variant="standard"
          />

<table>
  <tbody>
    <td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
Unité      </Typography></td>
    <td >< UnstyledSelectIntroduction4/>
</td>
  

  </tbody>
</table>

<table>
  <tbody>
    <td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"100px"}}>
Prix basé sur    </Typography></td>
    <td >< UnstyledSelectIntroduction5/>
</td>
  

  </tbody>
</table>



                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Prix HT"
            type="email"
            fullWidth
            variant="standard"
          />

<table>
  <tbody>
    <td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"170px"}}>
           TVA </Typography></td>
    <td >< UnstyledSelectIntroduction6/>
</td>
  

  </tbody>
</table>
 
         <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Prix TTC"
            type="email"
            fullWidth
            variant="standard"
          />
                        




                       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClose}>Enregister </Button>
        </DialogActions>
      </Dialog>
					</Box>
					
				
				
			</Container>
			
			</Box>



            
		</>
	)
}

export default Produit
