import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SelectLabels({invoiceData,showTva,setShowTva}) {
  const [typeDeFacture, setTypeDeFacture] = React.useState('');
  

  const handleChange = (event) => {
    setTypeDeFacture(event.target.value);
  };
  const types  = [
    { title: 'Ventes', year: 1994 ,
   onSelect:()=>{setShowTva(true)},},
    { title: 'Ventes-TVA à taux zéro', year: 1972,
   onSelect:()=>{setShowTva(false)},},
    { title: 'Ventes - Entreprise exonérée de TVA', year: 1974 ,
    onSelect:()=>{setShowTva(false)},},
  ];

  function handleOptionChange(option) {
    option.onSelect();} 
  return (
   <>
    <Autocomplete
    style={{marginLeft:"25px"}}
      id="checkboxes-tags-demo"
      options={types}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, {shownum}) => (
      <td {...props} style={{fontSize: "x-small"}}>
                 

          <Checkbox
            icon={icon}
           // checkedIcon={checkedIcon}
            style={{ marginRight: 8 ,fontSize: "x-small" }}
            checked={shownum}
            onChange={() => handleOptionChange(option)}
            />
         
          {option.title}

        </td>
      )}
      renderInput={(params) => (
        <TextField {...params} label="" placeholder="Type de facture" style={{ backgroundColor:"white"}}/>
      )}    

    />
 </> );
}
