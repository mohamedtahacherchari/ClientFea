import * as React from 'react';
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
import StarBorder from '@mui/icons-material/StarBorder';
import SelectLabels from './TypeFact'
import SettingsIcon from '@material-ui/icons/Settings';
import CheckboxesTags from './Autocheck'
import CheckboxesTags2 from './Refpaiement'
import CheckboxesTags3 from './AfficherColonne'
import CheckboxesTags4 from './Devise'
import Autocomplete from './BaseDeCalcul'
import ControllableStates2 from './TypeDeRemise'
import  ControllableStates3 from './BaseDeRemise'
import CheckboxesGroup from './FactAcomCalend'

export default function NestedList() {
  const [open2, setOpen2] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);
  const [open10, setOpen10] = React.useState(false);
  const [open11, setOpen11] = React.useState(false);









  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const handleClick5 = () => {
    setOpen5(!open5);
  };
  const handleClick6 = () => {
    setOpen6(!open6);
  };
  const handleClick7 = () => {
    setOpen7(!open7);
  };

  const handleClick8 = () => {
    setOpen8(!open8);
  };

  const handleClick9 = () => {
    setOpen9(!open9);
  };
  const handleClick10 = () => {
    setOpen10(!open10);
  };
  const handleClick11 = () => {
    setOpen11(!open11);
  };
  return (
    <>
      
      <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',
      display: "flex-",
    position: "absolute",
   top: "100Px",
    left: "1000px",
    width:"250px",
    right: "0",
    height:"1200px"
  }}
    
      aria-labelledby=""
      style={{backgroundColor:"#8FBC8F"}}
   
    >
  
   
      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <SettingsIcon/>
        </ListItemIcon>
        <ListItemText primary="Paramètres" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

      <ListItemButton onClick={handleClick6}>
        <ListItemText primary="Afficher colonnes" />
        {open6 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <CheckboxesTags3/>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick7}>
        <ListItemText primary="Devise" />
        {open7 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open7} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <CheckboxesTags4/>
        </List>
      </Collapse>
          
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Titre du document " />
          </ListItemButton>
          
        </List>
      </Collapse>




        <ListItemButton onClick={handleClick8}>
        <ListItemIcon>
        <img src="https://img.icons8.com/ios/50/null/loyalty-card.png" 
         style={{width:"25px"}}
        />
        </ListItemIcon>
        <ListItemText primary="Remise" />
        {open8 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open8} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <ListItemButton onClick={handleClick9}>
        <ListItemText primary="Base de calcul" />
        {open9 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open9} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Autocomplete/>

        </List>
      </Collapse>
    
      <ListItemButton onClick={handleClick10}>
        <ListItemText primary="Type de remise" />
        {open10 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open10} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ControllableStates2/>

        </List>
      </Collapse>
  

      <ListItemButton onClick={handleClick11}>
        <ListItemText primary="Base de remise" />
        {open11 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open11} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ControllableStates3/>

        </List>
      </Collapse>
       
        </List>
      </Collapse>

    </List> 


    
      
       </>

    
  );
}
