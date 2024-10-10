<List>


 <ListItemButton onClick={handleClick8} style={{marginTop:"350px"}}>
   <input onChange={handleMontrer}    type="checkbox"/>
 <ListItemText
     primary={
       <Typography variant="body1" style={{ color: "white" }}>
             Remise
               </Typography>}
primaryTypographyProps={{ style: { color: "white" } }}
checked={true} // Définir cette propriété à true pour cocher l'élément initialement/>
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

<ListItemButton /*onClick={handleClick8}*/onChange={handleSansRemise} >
 <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>

<ListItemText primary="Sans Remise"style={{color:"white"}} />

</ListItemButton>
</List>