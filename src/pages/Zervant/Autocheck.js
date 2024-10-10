import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({shownum,setShownum,showCode, setShowCode
  ,setShowRefContrat,showRefContrat,ordreAchat, setOrdreAchat}) {
  console.log(setShownum)
  const reference = [
    { title: 'Numéro d’engagement', year: 1994 ,
   onSelect:()=>{setShownum(!shownum)
  
    },
    //selected: shownum 

  },
    { title: 'Code service', year: 1972,
   onSelect:()=>{
 
      setShowCode(!showCode)
 
  
   },
   // selected: showCode

  },
    { title: 'Référence contrat acheteur', year: 1974 ,
    onSelect:()=>{setShowRefContrat(!showRefContrat)
  
    },
    //selected: shownum

  },
    { title: "Ordre  d’achat vendeur  ", year: 2008,
    onSelect:()=>{setOrdreAchat(!ordreAchat)
  
    }
  },
  
   
  ];
  function handleOptionChange(option) {
    option.onSelect();
    //setShownum(!shownum)
    // insérez le code supplémentaire pour gérer l'état ou effectuer d'autres actions
  }

  return (
    <>
    <Autocomplete
    style={{marginLeft:"25px"}}
      //multiple
      id="checkboxes-tags-demo"
      options={reference}
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
        <TextField {...params} label="" placeholder="Afficher Référence" style={{backgroundColor:"white"}}/>
      )}    

    />
    </>
  );
}

