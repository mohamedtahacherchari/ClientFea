import {React, useState} from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { TextField } from '@mui/material';
//import MenuItem from '@mui/material/MenuItem';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function CustomizedSelects({inputValue,setInputValue,
  selectedOption, setSelectedOption,inputValue2,setInputValue2,inputValue3,setInputValue3,
  showRefPaiement, setShowRefPaiement
 
}) {
console.log(showRefPaiement)
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setInputValue3(event.target.value);
  };

  const renderInputField = () => {
    switch(selectedOption) {
     case 'Creditor Reference (UE)':
        return (
           <TextField
          style={{width:"250px"}}
            label="Creditor Reference (UE)"
            variant="outlined"
            placeholder="Ex : BC4567"
            value={inputValue}
            onChange={handleInputChange}
          />
        );
      case 'Viitenumero (Finlande)':
        return (
          <TextField
          style={{width:"250px"}}
            label="Viitenumero (Finlande)"
            variant="outlined"
            placeholder="Ex : 123456789"
            value={inputValue2}
            onChange={handleInputChange2}
          />
        );
      case 'Communication structurée (Belgique)':
        return (
          <TextField
          style={{width:"250px"}}
            label="Communication structurée (Belgique)"
            variant="outlined"
            placeholder="Ex : +++123/4567/890++"
            value={inputValue3}
            onChange={handleInputChange3}
          />
        );
      default:
        return null;
    }
  };

  return (
   <div style={{marginBottom:"30px",marginTop:"30px"}}>
  <FormControl style={{width:"200px"}}>
        <InputLabel htmlFor="demo-customized-select-native">
        </InputLabel>
  <Select
//id="demo-customized-select-native"
id="demo-simple-select"
value={selectedOption}
onChange={handleOptionChange}>
   <MenuItem aria-label="None" value="{selectedOption} "/>
     <MenuItem value="Creditor Reference (UE)">Creditor Reference (UE)</MenuItem>
      <MenuItem value="Viitenumero (Finlande)">Viitenumero (Finlande)</MenuItem>
      <MenuItem value="Communication structurée (Belgique)">Communication structurée (Belgique)</MenuItem>
        </Select>
      </FormControl>
      {renderInputField()} 
    </div>
  );
}
