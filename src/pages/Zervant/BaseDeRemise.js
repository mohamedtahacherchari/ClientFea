import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Base HT', 'Base TTC'];

export default function ControllableStates3() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
   
      <Autocomplete
      style={{width :"250px"}}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 ,color:"green"}}
        renderInput={(params) => <TextField {...params} label="" style={{color:"wheat"}} />}
      />
    </div>
  );
}
