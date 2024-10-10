import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
//import FormHelperText from '@mui/material/FormHelperText';
//import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });
  const [open2, setOpen2] = React.useState(true);

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  const [age, setAge] = React.useState('');

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };
  return (

<>
    
    <Box sx={{ display: 'flex' }}>
  
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Non ligne"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Date"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Qté"
          />
              <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Unité"
          />
              <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Prix"
          />
              <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="TVA"
          />
        </FormGroup>
      </FormControl>
    </Box>

<FormControl sx={{ minWidth: 220,marginLeft:"30px" }} >
<Select
  value={open2}
  onChange={handleClick2}
  displayEmpty
  inputProps={{ 'aria-label': 'Without label' ,fontSize: "x-small"}}
  style={{fontSize: "x-small"}}
>
  <MenuItem value={10}  style={{fontSize: "x-small"}}>
    <em>None</em>
  </MenuItem>
  <MenuItem  style={{fontSize: "x-small"}} value={10}>  <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Non ligne"
          /></MenuItem>
  <MenuItem  style={{fontSize: "x-small"}} value={20}>
  <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Date"
          />
  </MenuItem>
  <MenuItem  style={{fontSize: "x-small"}}  value={30}>
    
  </MenuItem>
</Select>
</FormControl>
</>


  );
}
