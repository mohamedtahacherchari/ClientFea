import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonsGroup from './RadioList'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



export default function CheckboxesTags4({setSaveDevise, saveDevise}) {
   


  const devises = [
    { id: 1, nom: 'Dollar américain', symbole: '$ US' },
    { id: 2, nom: 'Euro', symbole: '€' },
    { id: 3, nom: 'Yen japonais', symbole: '¥' },
    { id: 4, nom: 'Livre sterling', symbole: '£' },
    { id: 5, nom: 'Dollar canadien', symbole: '$ CA' },
    { id: 6, nom: 'Franc suisse', symbole: 'FS' },
    { id: 7, nom: 'Dollar australien', symbole: '$ AU' },
    { id: 8, nom: 'Dollar néo-zélandais', symbole: '$ NZ' },
    { id: 9, nom: 'Roupie indienne', symbole: '₹' },
    { id: 10, nom: 'Yuan chinois', symbole: '¥' },
    { id: 11, nom: 'Rouble russe', symbole: '₽' },
    { id: 12, nom: 'Rand sud-africain', symbole: 'R' },
    { id: 13, nom: 'Couronne norvégienne', symbole: 'kr' },
    { id: 14, nom: 'Peso mexicain', symbole: '$ MX' },
    { id: 15, nom: 'Real brésilien', symbole: 'R$' },
    { id: 16, nom: 'Dollar de Hong Kong', symbole: '$ HK' },
    { id: 17, nom: 'Couronne suédoise', symbole: 'kr' },
    { id: 18, nom: 'Livre turque', symbole: '₺' },
    { id: 19, nom: 'Peso argentin', symbole: '$ AR' },
    { id: 20, nom: 'Shekel israélien', symbole: '₪' },
    { id: 21, nom: 'Baht thaïlandais', symbole: '฿' },
    { id: 22, nom: 'Dirham des Émirats arabes unis', symbole: 'د.إ' },
    { id: 23, nom: 'Krona danoise', symbole: 'kr' },
    { id: 24, nom: 'Peso philippin', symbole: '₱' },
    { id: 25, nom: 'Dollar de Singapour', symbole: '$ SG' },
    { id: 26, nom: 'Forint hongrois', symbole: 'Ft' },
    { id: 27, nom: 'Kuna croate', symbole: 'kn' },
    { id: 28, nom: 'Zloty polonais', symbole: 'zł' },
    { id: 29, nom: 'Leu roumain', symbole: 'RON' },
    { id: 30, nom: 'Lev bulgare', symbole: 'лв' },
    { id: 31, nom: 'Won sud-coréen', symbole: '₩' },
    { id: 32, nom: 'Dollar taïwanais', symbole: 'NT$' },
    { id: 33, nom: 'Peso colombien', symbole: '$ COL' },
    { id: 34, nom: 'Dollar de Trinité-et-Tobago', symbole: '$ TTD' },
    { id: 35, nom: 'Dollar de Barbade', symbole: '$ BBD' },
    { id: 36, nom: 'Ringgit malaisien', symbole: 'RM' },
    { id: 37, nom: 'Dollar de Brunei', symbole: '$ BND' },
    { id: 38, nom: 'Dollar de Fidji', symbole: '$ FJD' },
    { id: 39, nom: 'Colon costaricien', symbole: '₡' },
    { id: 40, nom: 'Koweït dinar', symbole: 'KWD' },
    { id: 41, nom: 'Riyal saoudien', symbole: 'ر.س' },
    { id: 42, nom: 'Peso dominicain', symbole: '$ DOP' },
    { id: 43, nom: 'Peso cubain', symbole: '$ CUP' },
    { id: 44, nom: 'Dinar algérien', symbole: 'د.ج' },
    { id: 45, nom: 'Dinar tunisien', symbole: 'د.ت' },
    { id: 46, nom: 'Bolivar vénézuélien', symbole: 'VES' },
    { id: 47, nom: 'Dollar de Belize', symbole: '$ BZD' },
    { id: 48, nom: 'Rial iranien', symbole: '﷼' },
    { id: 49, nom: 'Pound égyptien', symbole: '£ EGP' },
    { id: 50, nom: 'Naira nigérian', symbole: '₦' },
    { id: 51, nom: 'Dirham marocain', symbole: 'د.م.' },
    { id: 52, nom: 'Taka bangladeshi', symbole: '৳' },
    { id: 53, nom: 'Colon salvadorien', symbole: '$ SVC' },
    { id: 54, nom: 'Shilling kényan', symbole: 'KES' },
    { id: 55, nom: 'Roupie pakistanaise', symbole: '₨ PKR' },
    { id: 56, nom: 'Quetzal guatémaltèque', symbole: 'Q' },
    { id: 57, nom: 'Lempira hondurien', symbole: 'L' },
    { id: 58, nom: 'Cordoba nicaraguayen', symbole: 'C$' },
    { id: 59, nom: 'Leone sierra-léonais', symbole: 'Le' },
    { id: 60, nom: 'Birr éthiopien', symbole: 'ብር' },
    { id: 61, nom: 'Gourde haïtienne', symbole: 'G' },
    { id: 62, nom: 'Balboa panaméen', symbole: 'B/.' },
    { id: 63, nom: 'Dollar bélizien', symbole: '$ BZD' },
    { id: 64, nom: 'Boliviano bolivien', symbole: 'Bs.' },
    { id: 65, nom: 'Manat azerbaïdjanais', symbole: '₼' },
    { id: 66, nom: 'Afghani afghan', symbole: '؋' },
    { id: 67, nom: 'Tenge kazakh', symbole: '₸' },
    { id: 68, nom: 'Tenge kazakh', symbole: '₸' },
    { id: 69, nom: 'Ngultrum bhoutanais', symbole: 'Nu.' },
    { id: 70, nom: 'Ouguiya mauritanien', symbole: 'UM' },
];


 

  return (
    <>
      <p style={{color:"white" , marginLeft:"30px"}}>Devise</p>
     <select style={{width:"220px",height:"50px", marginLeft:"30px"}} 
          onChange={(e)=>setSaveDevise(e.target.value)}
           value={saveDevise}>
          {devises.map((devise)=>
          (<option key={devise._id} > {devise.nom}  {devise.symbole}</option>))}
          </select>
 </> );

  
}




