
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonsGroup from './RadioList'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags3({showDate, setShowDate,showqte,setShowqte,
  showunite, setShowunite,showprix,setShowprix,showTva, setShowTva,
  showMontant,setShowMontant,showMontantHT ,setShowMontantHT
}) {

  const reference = [
    { title: 'Date', year: 1994 ,
   onSelect:()=>{setShowDate(!showDate)
  
    },
    //selected: shownum 

  },
  { title: 'Quantité ', year: 1974 ,
  onSelect:()=>{setShowqte(!showqte)

  },
  //selected: shownum

},
    { title: 'Unité', year: 1974 ,
    onSelect:()=>{setShowunite(!showunite)
  
    },
    //selected: shownum

  },
    { title: "prix", year: 2008,
    onSelect:()=>{setShowprix(!showprix)
  
   }
  },
  { title: "TVA", year: 2008,
  onSelect:()=>{setShowTva(!showTva)

 }
},

{ title: "Montant", year: 2008,
onSelect:()=>{setShowMontant(!showMontant)

}
},
{ title: "Montant HT", year: 2008,
onSelect:()=>{setShowMontantHT(!showMontantHT)

}
},
   
  ];
  function handleOptionChange(option) {
    option.onSelect();
    //setShownum(!shownum)
    // insérez le code supplémentaire pour gérer l'état ou effectuer d'autres actions
  }
  /*const PAY = [
    { title: 'No. de ligne', year: 1994 
  },
    { title: 'Date', year: 1972,
    onSelect:()=>{setShowDate(showDate)
  
    },
  },
    { title: 'Qté', year: 1974 
  ,
  
    onSelect:()=>{setShowqte(showqte)
  
    },
  
  
  },
    { title: "Unité", year: 2008 },
    { title: "Prix", year: 2008 },
    { title: "TVA", year: 2008 },
    { title: "Montant TVA", year: 2008 },
    { title: "Unité", year: 2008 },
  
  
   
  ];

  function handleOptionChange(option) {
     option.onSelect();
    //setShowDate(!showDate)
    //setShowqte(!showqte)

    // insérez le code supplémentaire pour gérer l'état ou effectuer d'autres actions
  }*/
  return (
    <>
      <Autocomplete
    style={{marginLeft:"25px"}}
     // multiple
      id="checkboxes-tags-demo"
      options={reference}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, {showqte}) => (

        <td {...props} style={{fontSize: "x-small"}}>
                 

          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 ,fontSize: "x-small" }}
            checked={showqte}
            onChange={() => handleOptionChange(option)}
            />
         
          {option.title}

        </td>
      )}
      renderInput={(params) => (
        <TextField {...params} label="" placeholder="Afficher colonnes" style={{backgroundColor:" white"}}/>
      )}    

    />
      {/*<RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        style={{marginLeft:"40px"}}
      >
        <p style={{marginLeft:"30px" ,color:"white"}}>Totaux</p>
        <FormControlLabel value="female" size="small"  control={<Radio size="small"  style={{color:"white"}}  />} label="Montant TTC" 
        style={{color:"white"}} />
        <FormControlLabel value="male" size="small"  control={<Radio size="small" style={{color:"white"}}   />} label=" Montant HT" 
         style={{color:"white"}} 
        />
        <FormControlLabel value="other" size="small"  control={<Radio size="small"  style={{color:"white"}}  />} label=" Les deux"
         style={{color:"white"}} 
        />
      </RadioGroup>*/}
    </>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

