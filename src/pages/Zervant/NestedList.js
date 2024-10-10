import  {React, useState} from 'react';
import List from '@mui/material/List';
import {Typography} from "@material-ui/core";
import FormLabel from '@mui/material/FormLabel';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SelectLabels from './TypeFact'
import SettingsIcon from '@material-ui/icons/Settings';
import CheckboxesTags from './Autocheck'
import CheckboxesTags3 from './AfficherColonne'
import CheckboxesTags4 from './Devise'
import { TextField,Divider, Checkbox } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



export default function NestedList({invoiceData,
  showTva,setShowTva, showDate, setShowDate,showqte, setShowqte,showunite,setShowunite,
  showprix, setShowprix, showMontant,setShowMontant,showMontantHT,setShowMontantHT,titredoc, setTitredoc,
  setSelectedOption , setShowDeviseTab,setShowPourcentageTab, setShowDeviseTotal,setShowPourcentageTotal,
  showParTab, setShowParTab,showTotal,setShowMontantPourcent,
  setShowMontantHTPourcent,setShowTotal,setShowTotalHT,setShowTotalHTPourcent,
 setShowSommePourcent,setShowSommeDevise,
setShowResumeFacturePourcent,
  setShowResumeFacture,setShowResumeFactureDevise,
  setShowTotalHT_Tab,  setShowTotalHTPourcent_Tab,
 setShowResumeFacture2,setShowSansRemise ,
  showAcompte , setShowAcompte, setShowAcomptePourcent_Total,
   setShowAcompteDevise_Total,setShowAcomptePourcent_Tab,
 setShowAcompteDevise_Tab,setShowMontantOriginale,
   setMontrerHT ,saveDevise ,setSaveDevise,
  setShowButtonAvecRemiseTotalPourcent,setShowButtonAvecRemiseTotalDevise,setShowButtonAvecRemiseTabDevise,
  setShowButtonAvecRemiseTabPourcent,setShowButtonSansRemise ,setShowMontantOriginaleHT
})
   {
  const [open2, setOpen2] = useState(true);
  const [montrer, setMontrer] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [selectedOption2,setSelectedOption2]= useState('total');
  const [selectedRemiseTotal,setSelectedRemiseTotal]= useState('pourcentageTotal');
  const [selectedRemiseParTab,setSelectedRemiseParTab]= useState('pourcentageParTab');


  const [isChecked, setIsChecked] = useState(false);

  const handleSansRemise = () => {
    if (isChecked) {
      setMontrerHT(false);
      setShowSansRemise(false);
      setShowButtonSansRemise(false);
      setShowMontantOriginale(false);
      setShowMontantOriginaleHT(false);
      setShowMontantHT(false);
      setShowMontantHTPourcent(false);
      setShowMontant(false);
      setShowMontantPourcent(false);


      setShowPourcentageTotal(false);
      setShowDeviseTotal(false);
      setShowPourcentageTab(false);
      setShowDeviseTab(false);
      setShowSommeDevise(false);
      setShowResumeFacturePourcent(false);
      setShowResumeFactureDevise(false);
      setShowTotalHTPourcent_Tab(false);
      setShowTotalHT_Tab(false);
      setShowTotalHT(false);
      setShowTotalHTPourcent(false);
      setShowResumeFacture2(false);
      setShowResumeFacture(false);
      setShowSansRemise(false);
      setShowAcomptePourcent_Total(false);
      setShowAcompteDevise_Total(false);
      setShowAcompte(false);
      setShowAcomptePourcent_Tab(false);
      setShowAcompteDevise_Tab(false);
      setMontrerHT(false);
      setShowButtonAvecRemiseTotalPourcent(false);
      setShowButtonAvecRemiseTotalDevise(false);
      setShowButtonAvecRemiseTabPourcent(false);
      setShowButtonAvecRemiseTabDevise(false)


    } else {
      setMontrerHT(true);
      setShowSansRemise(true);
      setShowButtonSansRemise(true);
      setShowMontantOriginale(true);
      setShowMontantOriginaleHT(true);
      setShowMontantHT(false);
      setShowMontantHTPourcent(false);
      setShowMontant(false);
      setShowMontantPourcent(false);
      

      setShowPourcentageTotal(false);
      setShowDeviseTotal(false);
      setShowPourcentageTab(false);
      setShowDeviseTab(false);
      setShowSommeDevise(false);
      setShowResumeFacturePourcent(false);
      setShowResumeFactureDevise(false);
      setShowTotalHTPourcent_Tab(false);
      setShowTotalHT_Tab(false);
      setShowTotalHT(false);
      setShowTotalHTPourcent(false);
      setShowResumeFacture2(false);
      setShowResumeFacture(false);
      //setShowSansRemise(false);
      setShowAcomptePourcent_Total(false);
      setShowAcompteDevise_Total(false);
      setShowAcompte(false);
      setShowAcomptePourcent_Tab(false);
      setShowAcompteDevise_Tab(false);
      //setMontrerHT(false);
      setShowButtonAvecRemiseTotalPourcent(false);
      setShowButtonAvecRemiseTotalDevise(false);
      setShowButtonAvecRemiseTabPourcent(false);
      setShowButtonAvecRemiseTabDevise(false)


    }
  }
  const handleChangeAcompte = () => {
    setShowAcompte(!showAcompte);
  }
  const handleMontrer = () => {
    setMontrer(!montrer)
    setShowPourcentageTotal(false);
    setShowDeviseTotal(false);
    setShowPourcentageTab(false);
    setShowDeviseTab(false);
    setShowMontant(false);
    setShowMontantHT(false);
    setShowMontantPourcent(false);
    setShowMontantHTPourcent(false);
    setShowSommePourcent(false);
    setShowSommeDevise(false);
    setShowResumeFacturePourcent(false);
    setShowResumeFactureDevise(false);
    setShowResumeFacture(false);
    setShowTotalHTPourcent_Tab(false);
    setShowTotalHT_Tab(false);
    setShowTotalHT(false);
    setShowTotalHTPourcent(false);
    setShowResumeFacture2(false);
    setShowSansRemise(false);
    setShowTotalHT_Tab(false);
    setShowTotalHTPourcent_Tab(false);
    setShowAcomptePourcent_Total(false);
    setShowAcompteDevise_Total(false);
    setShowAcompte(false);
    setShowAcomptePourcent_Tab(false);
    setShowAcompteDevise_Tab(false);
    setShowMontantOriginale(true);
    setMontrerHT(false);
    setShowAcompte(false);
    setShowButtonSansRemise(false);
    setShowButtonAvecRemiseTotalPourcent(false);
    setShowButtonAvecRemiseTotalDevise(false);
    setShowButtonAvecRemiseTabPourcent(false);
    setShowButtonAvecRemiseTabDevise(false)

   };




  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
    const handleOptionChange2 = (event) => {
    const value = event.target.value;
    if (value === 'total') {
     setShowTotal(true);
     setShowParTab(false);
    } else if (value === 'tab') {
      setShowTotal(false);
      setShowParTab(true);
    }
    setSelectedOption2(value);
  };

    const handleRemiseTotalChange = (event) => {
    const value = event.target.value;
    if (value === 'pourcentageTotal') {
      setShowPourcentageTotal(true);
      setShowDeviseTotal(false);
      setShowPourcentageTab(false);
      setShowDeviseTab(false);
      setShowMontant(false);
      setShowMontantHT(false);
      setShowMontantOriginale(true);
      setShowMontantOriginaleHT(true);
      setShowMontantPourcent(false);
      setShowMontantHTPourcent(false);
      setShowSommePourcent(false);
      setShowSommeDevise(false);
      setShowResumeFacturePourcent(false);
      setShowResumeFactureDevise(false);
     //setShowResumeFacture(true);
      setShowTotalHTPourcent_Tab(true);
      setShowTotalHT_Tab(false);
      setShowTotalHT(false);
      setShowTotalHTPourcent(false);
      setShowResumeFacture2(true);
      setShowResumeFacture(false);
      setShowSansRemise(false);
      setShowAcomptePourcent_Total(true);
      setShowAcompteDevise_Total(false);
      setShowAcompte(false);
      setShowAcomptePourcent_Tab(false);
      setShowAcompteDevise_Tab(false);
      setMontrerHT(false);
      setShowAcompte(false);
      setShowButtonAvecRemiseTotalPourcent(true);
      setShowButtonAvecRemiseTotalDevise(false);
      setShowButtonAvecRemiseTabPourcent(false);
      setShowButtonAvecRemiseTabDevise(false)


    


    } else if (value === 'deviseTotal') {
      setShowDeviseTotal(true);
      setShowPourcentageTotal(false);
      setShowPourcentageTab(false);
      setShowDeviseTab(false);
       setShowMontant(false);
       setShowMontantHT(false);
      setShowMontantOriginale(true);
      setShowMontantOriginaleHT(true);
      setShowMontantPourcent(false);
      setShowMontantHTPourcent(false);
      setShowSommePourcent(false);
      setShowSommeDevise(false);
      setShowResumeFacturePourcent(false);
      setShowResumeFactureDevise(false);
      setShowResumeFacture(true);
      setShowTotalHTPourcent_Tab(false);
      setShowTotalHT_Tab(true);
      setShowTotalHT(false);
      setShowTotalHTPourcent(false);
      setShowResumeFacture2(false);
      setShowResumeFacture(true);
      setShowSansRemise(false);
      setShowAcomptePourcent_Total(false);
      setShowAcompteDevise_Total(true);
      setShowAcompte(false);
      setShowAcomptePourcent_Tab(false);
      setShowAcompteDevise_Tab(false);
      setMontrerHT(false);
      setShowAcompte(false);
      setShowButtonAvecRemiseTotalPourcent(false);
      setShowButtonAvecRemiseTotalDevise(true);
      setShowButtonAvecRemiseTabPourcent(false);
      setShowButtonAvecRemiseTabDevise(false);

}
    setSelectedRemiseTotal(value);
  };

  const handleRemisePatTabChange = (event) => {
    const value = event.target.value;
    if (value === 'pourcentageParTab') {
      setShowPourcentageTab(true);
      setShowDeviseTab(false);
      setShowDeviseTotal(false);
      setShowPourcentageTotal(false);
      setShowMontant(false);
      setShowMontantOriginaleHT(false)
      setShowMontantOriginale(true);
      setShowMontantHT(false);
      setShowMontantPourcent(true);
      setShowMontantHTPourcent(true);
      setShowTotalHT(false);
      setShowTotalHTPourcent(true);
      setShowSommePourcent(true);
      setShowSommeDevise(false);
      setShowResumeFacturePourcent(true);
      setShowResumeFactureDevise(false);
      setShowResumeFacture(false);
      setShowTotalHTPourcent_Tab(false);
      setShowTotalHT_Tab(false);
      setShowResumeFacture2(false);
      setShowResumeFacture(false);
      setShowSansRemise(false);
      setShowAcomptePourcent_Total(false);
      setShowAcompteDevise_Total(false);
      setShowAcompte(false);
      setShowAcomptePourcent_Tab(true);
      setShowAcompteDevise_Tab(false);
      setMontrerHT(false);
      setShowAcompte(false);
      setShowButtonAvecRemiseTotalPourcent(false);
      setShowButtonAvecRemiseTotalDevise(false);
      setShowButtonAvecRemiseTabPourcent(true);
      setShowButtonAvecRemiseTabDevise(false)



    } 
      else if (value === 'deviseParTab') {
      setShowDeviseTab(true);
      setShowPourcentageTab(false);
      setShowDeviseTotal(false);
      setShowPourcentageTotal(false);
      setShowMontant(true);
      setShowMontantHT(true);
      setShowMontantPourcent(false);
      setShowMontantHTPourcent(false);
      setShowTotalHT(true);
      setShowTotalHTPourcent(false);
      setShowSommeDevise(true);
      setShowSommePourcent(false);
      setShowMontantOriginale(false);
      setShowMontantOriginaleHT(false)
      setShowResumeFacturePourcent(false);
      setShowResumeFactureDevise(true);
      setShowResumeFacture(false);
      setShowTotalHTPourcent_Tab(false);
      setShowTotalHT_Tab(false);
      setShowResumeFacture2(false);
      setShowResumeFacture(false);
      setShowSansRemise(false);
      setShowAcomptePourcent_Total(false);
      setShowAcompteDevise_Total(false);
      setShowAcompte(false);
      setShowAcomptePourcent_Tab(false);
      setShowAcompteDevise_Tab(true);
      setMontrerHT(false);
      setShowAcompte(false);
      setShowButtonAvecRemiseTotalPourcent(false);
      setShowButtonAvecRemiseTotalDevise(false);
      setShowButtonAvecRemiseTabPourcent(false);
      setShowButtonAvecRemiseTabDevise(true)


      
    }
    setSelectedRemiseParTab(value);
  };

 const handleClick2 = () => {
    setOpen2(!open2);
  };
const handleClick5 = () => {
    setOpen5(!open5);
  };
const handleClick7 = () => {
    setOpen7(!open7);
  };
const handleClick8 = () => {
    setOpen8(!open8);
  };

  return (
    <>
      <List
  sx={{ width: '100%', 
  maxWidth: 360, 
  bgcolor: 'background.paper',
  display: "flex-",
  position: "absolute",
  top: "100Px",
  left: "1000px",
   width:"250px",
   right: "0",
   height:"1900px" , 
    borderRadius: "10px",
    overflow: "hidden", 
}}aria-labelledby=""
  style={{backgroundColor:"#8FBC8F"}}>
<ListItemButton onClick={handleClick2}>
  <ListItemIcon>
    <SettingsIcon/>
  </ListItemIcon>
    <ListItemText primary="Paramètres" style={{color:"white"}} />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
     
        <Divider style ={{marginTop:"20px", marginBottom : "20px"}}/>
        <CheckboxesTags3 showDate={showDate} setShowDate={setShowDate} showqte={showqte} 
        setShowqte={setShowqte} showunite={showunite} setShowunite={setShowunite}
        showprix={showprix} setShowprix={setShowprix} showTva={showTva} setShowTva={setShowTva}
        showMontant={showMontant} setShowMontant={setShowMontant}
        showMontantHT={showMontantHT} setShowMontantHT={setShowMontantHT}/>
        <Divider style ={{marginTop:"20px"}}/>
        <CheckboxesTags4 style={{marginLeft:"330px"}} saveDevise={saveDevise} setSaveDevise={setSaveDevise}/>
     
      { /* <Divider style ={{marginTop:"20px"}}/>
        <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Taux de change" style={{color:"white"}}/></ListItemButton>
        <Divider style ={{marginTop:"20px"}}/>*/}
<ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Titre du document " style={{color:"white"}}/>
        </ListItemButton>
          <input
           variant="outlined" 
           defaultValue="Facture"
           value={titredoc}
           onChange={(e)=>setTitredoc(e.target.value)}
           style={{marginLeft:"30px"}}/>
         </List>
      </Collapse>
      <div style={{color:"white",marginTop :"100%"}}>Choisissez le type de devis</div>
         <ListItemButton onClick={handleClick8} style={{marginTop :""}}>
         <input onChange={handleMontrer}    type="checkbox"/>

         <ListItemText
  primary=
      "Remise"
    
  
  primaryTypographyProps={{ style: { color: "white" } }}
  checked={true} // Définir cette propriété à true pour cocher l'élément initialement
/>
     {open8 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {montrer &&(   <Collapse in={open8} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <FormControl>
        <FormLabel 
        id="demo-radio-buttons-group-label"
        style={{color: "white" , marginLeft : "80px"}}
        >Base de calcul</FormLabel>
       <FormControl>
       <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="total"
        name="radio-buttons-group"
        value={selectedOption2}
       onChange={handleOptionChange2}
       style={{ marginLeft: "70px" }}>
    <FormControlLabel
      style={{ color: "white" }}
      value="total"
      //checked={showRemise}
      control={<Radio />}
      label="Total"/>
    <FormControlLabel
      style={{ color: "white" }}
      value="tab"
      //checked={showRemiseLigne}
      control={<Radio />}
      label="Par ligne"/>
              </RadioGroup>
        </FormControl>
</FormControl>

   <Divider style ={{marginTop:"20px"}}/>
   <FormControl >
       <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="total"
        name="radio-buttons-group"
        value={selectedRemiseTotal}
      
       onChange={handleRemiseTotalChange}
       style={{ marginLeft: "70px" }}>
     {showTotal && (<FormControlLabel
         style={{color:"white"}}
          value="pourcentageTotal" 
         // checked={showPourcentageTotal}
          control={<Radio />} 
          label="%" />)}
      {showTotal && (<FormControlLabel
         style={{color:"white"}}  
         value="deviseTotal"
         control={<Radio />} 
         label="Devise"
       //  checked={showDeviseTotal}
       />)}
        </RadioGroup>
        </FormControl>
        <FormControl>
       <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="total"
        name="radio-buttons-group"
        value={selectedRemiseParTab}
      onChange={handleRemisePatTabChange}
       style={{ marginLeft: "" }}>
      {showParTab &&(<FormControlLabel
         style={{color:"white"}}
          value="pourcentageParTab" 
          //checked={showPourcentage}
          control={<Radio />} 
          label="%" />)}
     {showParTab && (<FormControlLabel
         style={{color:"white"}}  
         value="deviseParTab"
         control={<Radio />} 
         label="Devise"
         //checked={showRemise}
       />)}
         </RadioGroup>
        </FormControl>
 
        </List>
       </Collapse>)} 


       <ListItemButton /*onClick={handleClick8}*/onChange={handleSansRemise} >
         <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>

     <ListItemText primary="Sans Remise"style={{color:"white"}} />
    
      </ListItemButton>

       </List>

         </>);
}
