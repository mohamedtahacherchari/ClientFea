import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags2({showRefPaiement, setShowRefPaiement,
  inputValue,setInputValue,selectedOption, setSelectedOption,
  inputValue2,setInputValue2,inputValue3,setInputValue3,
}) {

  const referencePayement = [
    { title: ' Creditor Reference (UE)', year: 1994 ,
  
   // onSelect:(event)=>{ setSelectedOption(event.target.value);
     
//},
},
    { title: ' Viitenumero (Finlande)', year: 1972 },
    { title: 'Communication structurée (Belgique)  ', year: 1974 },
  
   
  ];

  function handleOptionChange(event) {
    //option.onSelect();

setSelectedOption(event.target.value);

    // insérez le code supplémentaire pour gérer l'état ou effectuer d'autres actions
  }
  return (

    <>
    <Autocomplete
    style={{marginLeft:"25px"}}
      //multiple
      id="checkboxes-tags-demo"
      options={referencePayement}
      value={selectedOption}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { showRefPaiement }) => (
        <td {...props} style={{fontSize: "x-small"}}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 ,fontSize: "x-small" }}
            checked={showRefPaiement}
            onChange={handleOptionChange}

            
          />
         
          {option.title}

        </td>
      )}
      renderInput={(params) => (
        <TextField {...params} label="" placeholder="entrer un choix"/>
      )}    

    />

<FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
    </>
  );
}


