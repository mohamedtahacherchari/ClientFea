import React, { useState } from 'react';
import List from '@mui/material/List';
import { Typography } from "@material-ui/core";
import FormLabel from '@mui/material/FormLabel';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

export default function NavbarRemise({
  invoiceData,
  showTva, setShowTva, shownum, setShownum, showCode, setShowCode,
  setShowRefContrat, showRefContrat, ordreAchat, setOrdreAchat,
  showDate, setShowDate, showqte, setShowqte, showunite, setShowunite,
  showprix, setShowprix, showMontant, setShowMontant, showMontantHT, setShowMontantHT, titredoc, setTitredoc,
  selectedOption, setSelectedOption, setShowDeviseTab, setShowPourcentageTab, setShowDeviseTotal,
  setShowPourcentageTotal, showParTab, setShowParTab, showTotal, setShowMontantPourcent,
  setShowMontantHTPourcent, setShowTotal, setShowTotalHT, setShowTotalHTPourcent,
  setShowSommePourcent, setShowSommeDevise, setShowResumeFacturePourcent, setShowResumeFacture, setShowResumeFactureDevise,
  setShowTotalHT_Tab, setShowTotalHTPourcent_Tab, setShowResumeFacture2, setShowSansRemise, showAcompte,
  setShowAcompte, setShowAcomptePourcent_Total, setShowAcompteDevise_Total, setShowAcomptePourcent_Tab,
  setShowAcompteDevise_Tab, setShowMontantOriginale, montrerHT, setMontrerHT, saveDevise,
  setSaveDevise, setShowButtonSansRemise, setShowButtonAvecRemiseTotalPourcent,
  setShowButtonAvecRemiseTotalDevise, setShowButtonAvecRemiseTabDevise, setShowButtonAvecRemiseTabPourcent,
  setShowMontantOriginaleHT
}) {
  const [open2, setOpen2] = useState(true);
  const [montrer, setMontrer] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState('total');
  const [selectedRemiseTotal, setSelectedRemiseTotal] = useState('pourcentageTotal');
  const [selectedRemiseParTab, setSelectedRemiseParTab] = useState('pourcentageParTab');

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
      setShowAcompte(false);
      setShowPourcentageTotal(false);
      setShowDeviseTotal(false);
      setShowPourcentageTab(false);
      setShowDeviseTab(false);
      setShowTotalHT(false);
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
      setShowAcompte(true);
      setShowDeviseTotal(false);
      setShowPourcentageTab(false);
      setShowDeviseTab(false);
      setShowPourcentageTotal(false);
      setShowTotalHT(true);
    }
  };

  const handleChangeAcompte = () => {
    setShowAcompte(!showAcompte);
    setShowButtonSansRemise(true);
    setShowButtonAvecRemiseTotalPourcent(false);
    setShowButtonAvecRemiseTotalDevise(false);
    setShowButtonAvecRemiseTabPourcent(false);
    setShowButtonAvecRemiseTabDevise(false);
  };

  const handleMontrer = () => {
    setMontrer(!montrer);
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
    setShowTotalHT_Tab(false);
    setShowTotalHT(false);
    setShowTotalHTPourcent(false);
    setShowResumeFacture2(false);
    setShowSansRemise(false);
    setShowTotalHTPourcent_Tab(false);
    setShowAcomptePourcent_Total(false);
    setShowAcompteDevise_Total(false);
    setShowAcompte(false);
    setShowAcomptePourcent_Tab(false);
    setShowAcompteDevise_Tab(false);
    setShowMontantOriginale(true);
    setShowMontantOriginaleHT(true);
    setMontrerHT(false);
    setShowAcompte(false);
    setShowButtonSansRemise(false);
    setShowButtonAvecRemiseTotalPourcent(false);
    setShowButtonAvecRemiseTotalDevise(false);
    setShowButtonAvecRemiseTabPourcent(false);
    setShowButtonAvecRemiseTabDevise(false);
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
      setShowResumeFacture(true);
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
      setShowButtonAvecRemiseTabDevise(false);
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
      setShowResumeFactureDevise(true);
      setShowResumeFacture(false);
      setShowTotalHTPourcent_Tab(false);
      setShowTotalHT_Tab(true);
      setShowTotalHT(false);
      setShowTotalHTPourcent(false);
      setShowResumeFacture2(false);
      setShowResumeFacture(true);
      setShowSansRemise(false);
      setShowAcomptePourcent_Total(true);
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
      setShowMontantHT(false);
      setShowMontantOriginale(true);
      setShowMontantOriginaleHT(false);
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
      setShowButtonAvecRemiseTabDevise(false);
    } else if (value === 'deviseParTab') {
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
      setShowMontantOriginaleHT(false);
      setShowResumeFacturePourcent(false);
      setShowResumeFactureDevise(true);
      setShowResumeFacture(false);
      setShowTotalHTPourcent_Tab(false);
      setShowTotalHT_Tab(false);
      setShowResumeFacture2(false);
      setShowResumeFacture(false);
      setShowSansRemise(false);
      setShowAcomptePourcent_Total(false);
      setShowAcompteDevise_Total(true);
      setShowAcompte(false);
      setShowAcomptePourcent_Tab(false);
      setShowAcompteDevise_Tab(true);
      setMontrerHT(false);
      setShowAcompte(false);
      setShowButtonAvecRemiseTotalPourcent(false);
      setShowButtonAvecRemiseTotalDevise(false);
      setShowButtonAvecRemiseTabPourcent(false);
      setShowButtonAvecRemiseTabDevise(true);
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
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: "flex-", position: "absolute", top: "100Px", left: "1000px", width: "250px", right: "0", height: "1200px", borderRadius: "10px", overflow: "hidden", }}
      aria-labelledby=""
      style={{ backgroundColor: "#8FBC8F" }}>

      <ListItemButton onClick={handleClick8} style={{ marginTop: "350px" }}>
        <input onChange={handleMontrer} type="checkbox" />
        <ListItemText
          primary={
            <Typography variant="body1" style={{ color: "white" }}>
              Remise
            </Typography>}
          primaryTypographyProps={{ style: { color: "white" } }}
        />
        {open8 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      {montrer && (<Collapse in={open8} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              style={{ color: "white", marginLeft: "80px" }}
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
                  control={<Radio />}
                  label="Total" />
                <FormControlLabel
                  style={{ color: "white" }}
                  value="tab"
                  control={<Radio />}
                  label="Par ligne" />
              </RadioGroup>
            </FormControl>
          </FormControl>
          <Divider style={{ marginTop: "20px" }} />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="total"
              name="radio-buttons-group"
              value={selectedRemiseTotal}
              onChange={handleRemiseTotalChange}
              style={{ marginLeft: "70px" }}>
              {showTotal && (
                <FormControlLabel
                  style={{ color: "white" }}
                  value="pourcentageTotal"
                  control={<Radio />}
                  label="%" />
              )}
              {showTotal && (
                <FormControlLabel
                  style={{ color: "white" }}
                  value="deviseTotal"
                  control={<Radio />}
                  label="Devise"
                )}
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
              {showParTab && (
                <FormControlLabel
                  style={{ color: "white" }}
                  value="pourcentageParTab"
                  control={<Radio />}
                  label="%" />
              }
              {showParTab && (
                <FormControlLabel
                  style={{ color: "white" }}
                  value="deviseParTab"
                  control={<Radio />}
                  label="Devise"
                )}
            </RadioGroup>
          </FormControl>
        </List>
      </Collapse>)
      }
      <ListItemButton onChange={handleSansRemise}>
        <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
        <ListItemText primary="Sans Remise" style={{ color: "white" }} />
      </ListItemButton>
    </List>
  );
}
