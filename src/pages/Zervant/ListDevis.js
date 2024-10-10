import React, {useState, useEffect,useRef } from 'react'
import {  useNavigate ,useParams} from "react-router-dom"
import NestedList from './NestedList';
import styles from './Invoice.module.css'
import PrintIcon from '@mui/icons-material/Print';
import {Link} from 'react-router-dom'
import moment from 'moment'
import './ListFacture.css'
import {useSelector,useDispatch} from 'react-redux'
import {initialState} from './initialState'
import {initialState2} from './initialState'
import {initialState3} from './initialState'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import List from '@mui/material/List';
import { useReactToPrint } from 'react-to-print';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button,Divider,Typography,TextField} from '@mui/material';
import { listDevisDetails, updateDevis } 
from '../../redux/actions/servantActions/devisAction';
import { DEVIS_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/devisConstant';
import { dispatchGetAllClientf, fetchAllClientf } from '../../redux/actions/servantActions/clientfAction';
import { dispatchGetAllProduct, fetchAllProduct } from '../../redux/actions/servantActions/productAction';
import CustomizedSelects from './CrediatorRef';
import { dispatchGetAllClientAdmin, fetchAllClientAdmin } from '../../redux/actions/servantActions/clientAdminAction';
import { dispatchGetAllProductAdmin, fetchAllProductAdmin } from '../../redux/actions/servantActions/productAdminAction';

const ListDevis = () => {
      const {id} = useParams()
      const navigate =  useNavigate();
  const [open, setOpen] = useState(false);
  const [titre, setTitre]= useState(initialState2);
  const [soustotal, setSoustotal]= useState([{soustotal:''},]);
  const [totalHorsTva, setTotalHorsTva] = useState(0);
  const [email, setEmail]= useState();
  const [adresse, setAdresse]= useState();
  const [codePostale, setCodePostale]= useState();


  const condition = [
    { value: 0 ,  label: ' 0 jours' },
    { value: 7,   label: '7jours ' },
    { value: 14 , label: '14 jours ' },
    { value: 30 , label: '30 jours ' },
    { value: 45 , label: '45 jours ' },
    { value: 60 , label: '60 jours ' },
    { value: 90, label: '90 jours ' },
  ];

  const Unite = [
    { value: 'cm', label: 'cm' },
    { value: 'm', label: 'm' },
    { value: 'km', label: 'km' },
    { value: 'h', label: 'h' },
    { value: 'pcs', label: 'pcs' },
  ];

  const arrayTVA = [
    { value: '0', label: '0%' },
    { value: '2.1', label: '2.1%' },
    { value: '5.5', label: '5.5%' },
    { value: '10', label: '10%' },
    { value: '20', label: '20%' },
  ];

  const arrayAcompte = [
    { value: '0', label: '0' },
    { value: '0.1', label: '10' },
    { value: '0.2', label: '20' },
    { value: '0.3', label: '30' },
    { value: '0.4', label: '40' },
    { value: '0.5', label: '50' },
  ];
  /* Les useStates */
const[num, setNum]=useState('');
const[invoiceData,setInvoiceData]=useState(initialState);
const[enga,setEnga]=useState('');
const[service,setService]=useState('');
const[ref,setRef]=useState('');
const[ordre,setOrdre]=useState('');
const[communication, setCommunication]=useState('');
const[champText,setChamptext]=useState(initialState3);
const[message,setMessage]=useState('');
const[note,setNote]=useState('');
const[date1,setDate1]=useState('');
const [cond, setCond] = useState('');
const [clientf, setClientf] = useState('');
const today = new Date(date1);
const [subTotal, setSubTotal] = useState('')
const [subTotal2, setSubTotal2] = useState('')
const [subTotal4, setSubTotal4] = useState(0)
const [totalHT, setTotalHT] = useState('')
const [totalHT2, setTotalHT2] = useState('')

//const [totalHT_Tab, setTotalHT_Tab] = useState("")
//const [totalHT_Tab_P, setTotalHT_Tab_P] = useState("")
const [totalRemise, setTotalRemise] = useState('')
const [totalRemise2, setTotalRemise2] = useState('')
const [totalHTPourcent, setTotalHTPourcent] = useState('')
const [showTva, setShowTva] = useState(false);
const [shownum, setShownum] = useState(false);
const [showCode, setShowCode] = useState(false);
const [showRefContrat, setShowRefContrat] = useState(false);
const [ordreAchat, setOrdreAchat] = useState(false);
const [showRefPaiement, setShowRefPaiement] = useState(false);
const [showDate, setShowDate] = useState(false);
const [showqte, setShowqte] = useState(false);
const [showunite, setShowunite] = useState(true);
const [showprix, setShowprix] = useState(false);
const [showMontant, setShowMontant] = useState(false);
const [showMontantHT, setShowMontantHT] = useState(false);
const [titredoc, setTitredoc] = useState('');
const [paiement, setPaiement] = useState('');
const [paiement2, setPaiement2] = useState('');
const [selectedOption, setSelectedOption] = useState('');
const [inputValue, setInputValue] = useState('');
const [inputValue2, setInputValue2] = useState('');
const [inputValue3, setInputValue3] = useState('');
const [remisetotal, setRemisetotal] = useState('');
const [remisetotal2, setRemisetotal2] = useState('');
const [showDeviseTab, setShowDeviseTab]=useState(false);
const [showPourcentageTab, setShowPourcentageTab]= useState(false);
const [showDeviseTotal, setShowDeviseTotal]=useState(false);
const [showPourcentageTotal, setShowPourcentageTotal]=useState(false);
const [showParTab, setShowParTab]=useState(false);
const [showTotal, setShowTotal]=useState(false);
const [showMontantPourcent, setShowMontantPourcent] = useState(false);
const [showMontantHTPourcent, setShowMontantHTPourcent] = useState(false);
const [showTotalHT, setShowTotalHT] = useState(false)
const [showTotalHTPourcent, setShowTotalHTPourcent] = useState(false)
const [showSommePourcent, setShowSommePourcent] = useState(false)
const [showSommeDevise, setShowSommeDevise] = useState(false)
const [showResumeFacturePourcent, setShowResumeFacturePourcent] = useState(false)
const [showResumeFactureDevise, setShowResumeFactureDevise] = useState(false)
const [showResumeFacture, setShowResumeFacture] = useState(false)
const [showResumeFacture2, setShowResumeFacture2] = useState(false)
const [showTotalHT_Tab, setShowTotalHT_Tab] = useState(false)
const [showTotalHTPourcent_Tab, setShowTotalHTPourcent_Tab] = useState(false)
const [showSansRemise, setShowSansRemise] = useState(false)
const [showAcompte, setShowAcompte] = useState(false)
const [Acompte, setAcompte] = useState('')
const [Acompte1, setAcompte1] = useState('')
const [Acompte2, setAcompte2] = useState('')
const [Acompte3, setAcompte3] = useState('')
const [Acompte4, setAcompte4] = useState('')
const [showAcomptePourcent_Total, setShowAcomptePourcent_Total] = useState(false)
const [showAcompteDevise_Total, setShowAcompteDevise_Total] = useState(false)
const [showAcomptePourcent_Tab, setShowAcomptePourcent_Tab] = useState(false)
const [showAcompteDevise_Tab, setShowAcompteDevise_Tab] = useState(false)
const [showMontantOriginale, setShowMontantOriginale] = useState(false)
const [montrerHT, setMontrerHT] = useState(false)
const [saveDevise, setSaveDevise] = useState(false)
const [date3, setDate3] = useState('')
const [showButtonSansRemise, setShowButtonSansRemise] = useState(false)
const [showButtonAvecRemiseTotalPourcent, setShowButtonAvecRemiseTotalPourcent] = useState(false)
const [showButtonAvecRemiseTotalDevise, setShowButtonAvecRemiseTotalDevise] = useState(false)
const [showButtonAvecRemiseTabDevise, setShowButtonAvecRemiseTabDevise] = useState(false)
const [showButtonAvecRemiseTabPourcent, setShowButtonAvecRemiseTabPourcent] = useState(false)
const [showMontantOriginaleHT, setShowMontantOriginaleHT] = useState(false)
const [nomDevis, setNomDevis] = useState();

const [total, setTotal] = useState(0);


let remiseParLignePourcent = (subTotal - subTotal2).toFixed(2)

let echa = moment(today.getTime() +cond *24*60*60*1000).format("DD/MM/YYYY")
const handleClick = () => {
    setOpen(!open);
  };
   const handleChange=(index,e)=>{
    const values  =[...invoiceData.items];
    values[index][e.target.name] = e.target.value;
    setInvoiceData({...invoiceData, items: values});}


 
  const handleChangeTitre = (index, e) => {
    const values = [...invoiceData.items2];
    values[index][e.target.name] = e.target.value;
    setInvoiceData({...invoiceData , items2: values});
  };

  const handleChangeChamp = (index, e) => {
    const values = [...invoiceData.items3];
    values[index][e.target.name] = e.target.value;
    setInvoiceData({...invoiceData , items3: values});
  };
  const handleChangeSous = (index, e) => {
    const values = [...invoiceData.items4];
    values[index][e.target.name] = e.target.value;
    setInvoiceData({...invoiceData , items4: values});
  };
 const addFields = () => {
  // e.preventDefault();
    setInvoiceData((prevState) => ({
      ...prevState,
      items: prevState.items ? [...prevState.items, { product: '', qte: '', unite: '', prix: '', tva: '', montant: '',montant2: '', date2: '',montantHT:'' ,montantHT2:'' ,remise:'',montantPourcent:'',montantHTPourcent:'',remisePourcent:''}] : [{ product: '', qte: '', unite: '', prix: '', tva: '', montant: '', date2: '',montantHT:'',remise:'',montantPourcent:'',montantHTPourcent:'',remisePourcent:''}]
    }));
  };
  const addTitre=()=>{
   // e.preventDefaulf();
   setInvoiceData((prevState)=> ({
      ...prevState,
      items2 : prevState.items2 ? [...prevState.items2,{title:'',}] :[{title:'',}]
    }))
  }


  const addChamptext=()=>{
    setInvoiceData((prevState)=> ({
      ...prevState,
      items3 : prevState.items3 ? [...prevState.items3,{champ:'',}] :[{champ:'',}]
    }))
  }

  const addSoustotal=()=>{
    setInvoiceData((prevState)=> ({
      ...prevState,
      items4 : prevState.items4 ? [...prevState.items4,{sous:'',}] :[{sous:'',}]
    }))
   
  }
  const removeFields=(index)=>{
    let values= invoiceData.items
    values.splice(index,1)
    setInvoiceData((prevState)=>({...prevState , values}))
  }

  const removeTitre=(index)=>{
    let values = invoiceData.items2
values.splice(index,1)
setInvoiceData((prevState)=>({...prevState , values}))
  }
  const removeChamptext=(index)=>{
    let values = invoiceData.items3
    values.splice(index,1)
    setInvoiceData((prevState)=>({...prevState , values}))
   }
   const removeSoustotal=(index)=>{
    let values = invoiceData.items4
      values.splice(index,1)
    setInvoiceData((prevState)=>({...prevState, values}))
   }

          // Fonction qui calcule le total en fonction des conditions
    
          const calculateTotal = () => {
            let newTotal = 0;
        
            // Condition 1
            if (showSansRemise) {
              newTotal +=  subTotal.toFixed(2);
            }
        
            // Condition 2
            if (showResumeFacture) {
              newTotal +=  (subTotal- remisetotal2).toFixed(2);
            }
        
            // Condition 3
            if (showResumeFacture2) {
              newTotal +=  ( subTotal-((remisetotal/subTotal)*100)).toFixed(2)
        ;    }
        
            // Condition 4
            if (showResumeFactureDevise) {
              newTotal +=   subTotal4.toFixed(2);
            }
        
            // Condition 5
            if (showResumeFacturePourcent) {
              newTotal +=   subTotal2.toFixed(2);
            }
       
            setTotal(newTotal);
      
        
          };
        
          // Appel de la fonction de calcul du total à chaque mise à jour des conditions
          useEffect(() => {
            calculateTotal();
          }, [showResumeFacturePourcent,showResumeFactureDevise,showResumeFacture2,showResumeFacture,showSansRemise,subTotal, subTotal2,  subTotal4, remisetotal2,remisetotal ,total]);
//subTotal, subTotal2,  subTotal4, remisetotal2,remisetotal ,total => avec ses dépendance toujours li ya un ereur
//de mis à jour de totalHTpar ligne pourcent donc il faut toujours mettre les dépendance ces dessous
/*********************/

       // Fonction qui calcule le totalHT en fonction des conditions
       const calculateTotalHT = () => {
        let newTotal = 0;
    
        // Condition 1 (te5dim)
        if (showTotalHT) {
          newTotal +=  totalHT2.toFixed(2);
        }
    
        // Condition 2 (te5dim)
        if (showTotalHTPourcent) {
          newTotal += totalHTPourcent.toFixed(2);
        }
    
        // Condition 3
        if (showTotalHT_Tab) {
          //newTotal +=  (subTotal-((remisetotal/subTotal)*100)).toFixed(2)
          newTotal += (totalHT-remisetotal2).toFixed(2);
    ;    }
    
        // Condition 4  (te5dim)
        if (montrerHT) {
          newTotal +=   totalHT.toFixed(2);
        }
    
        // Condition 5  (te5dim)
        if (showTotalHTPourcent_Tab) {
          newTotal +=   (totalHT-(remisetotal/totalHT)*100).toFixed(2);
        }
   
        setTotalHorsTva(newTotal);
  
    
      };
      useEffect(() => {
        calculateTotalHT();
      }, [montrerHT,showTotalHT, showTotalHTPourcent, showTotalHT_Tab,showTotalHTPourcent_Tab, totalHT, totalHT2,totalHTPourcent,remisetotal,remisetotal2]);
      // totalHTPourcent ===>>> trés import en useEffect
    /******* */

    const updateNomDevis = () => {
      let newNomDevis = '';
    
      if (showSansRemise) {
        newNomDevis += 'Devis Sans Remise ';
      }
    
      if (showPourcentageTotal) {
        newNomDevis += 'Devis Avec Remise Total en Pourcentage ';
      }
    
      if (showDeviseTotal) {
        newNomDevis += 'Devis Avec Remise Total en Devise ';
      }
    
      if (showPourcentageTab) {
        newNomDevis += 'Devis Avec Remise Par Ligne en Pourcentage ';
      }
    
      if (showDeviseTab) {
        newNomDevis += 'Devis Avec Remise Par Ligne en Devise ';
      }
      console.log(newNomDevis,"hh")

      return newNomDevis;

    };
    useEffect(() => {
      const updatedNomDevis = updateNomDevis();
      setNomDevis(updatedNomDevis);
    }, [showSansRemise,showPourcentageTotal,showDeviseTotal,showPourcentageTab,showDeviseTab]);

    /*********************/
const dispatch = useDispatch()
  const clientfs = useSelector(state=> state.clientfs)
  const products = useSelector(state=> state.products)
  const productAdmin = useSelector(state=> state.productAdmin)
  const clientAdmin = useSelector(state=> state.clientAdmin)
  const token = useSelector(state => state.token)
  const devisUpdate = useSelector((state) => state.devisUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = devisUpdate
 const devisDetails = useSelector((state) => state.devisDetails)
  const { loading, error, devis } = devisDetails
  const devisCreate = useSelector((state) => state.devisCreate)
  const {
     loading: loadingCreate,
     error: errorCreate,
    success: successCreate,
    devis: createdDevis,
  } = devisCreate
  const auth = useSelector(state => state.auth)
  const {user, isAdmin} = auth


   useEffect(() => {
      //console.log(client)
if(user.role==0)
{  fetchAllClientf(token).then(res =>{
    dispatch(dispatchGetAllClientf(res))
})}
if(user.role==1)
{
  fetchAllClientAdmin(token).then(res =>{
    dispatch(dispatchGetAllClientAdmin(res))
})
}
if(user.role==0) {fetchAllProduct(token).then(res =>{
  dispatch(dispatchGetAllProduct(res))
})}


if(user.role==1) {fetchAllProductAdmin(token).then(res =>{
  dispatch(dispatchGetAllProductAdmin(res))
})}
if (successUpdate) {
  alert("Il faut sélectionner le type de devis dans la liste à droite.");
  dispatch({ type: DEVIS_UPDATE_RESET})
  if(showButtonSansRemise)
{navigate(`/inv/print2/${devis._id}`);}  
  if(showButtonAvecRemiseTotalPourcent){
    navigate(`/inv/printAvecRemiseTotalPourcent2/${devis._id}`);}
    if(showButtonAvecRemiseTotalDevise){
      navigate(`/inv/printAvecRemiseTotalDevise2/${devis._id}`);
    }
    if(showButtonAvecRemiseTabPourcent){
      navigate(`/inv/printAvecRemiseTabPourcent2/${devis._id}`);
    }

    if(showButtonAvecRemiseTabDevise){
      navigate(`/inv/printAvecRemiseTabDevise2/${devis._id}`);
    }
} 
                  
else{ 
if (!devis.num || devis._id !== id){
  dispatch(listDevisDetails(id))
}          
      
  else {
    setClientf(devis.clientf)
    setNum(devis.num)
    setCond(devis.cond)
    setInvoiceData(devis)
    setEnga(devis.enga)
    setService(devis.service) 
    setRef(devis.ref)
    setOrdre(devis.ordre) 
    setCommunication(devis.communication)  
    setTitre(devis) 
    setChamptext(devis)
    setMessage(devis.message) 
    setNote(devis.note) 
    setDate1(devis.date1)
    setSubTotal(devis.subTotal)
    setTitredoc(devis.titredoc)
    setShowqte(devis.showqte)
    setShowDate(devis.showDate)
    setShowunite(devis.showunite)
    setShowprix(devis.showprix)
    setShowMontant(devis.showMontant)
    setShowMontantHT(devis.showMontantHT)
    setShownum(devis.shownum)
    setShowTva(devis.showTva)
    setShowCode(devis.showCode)
    setShowRefContrat(devis.showRefContrat)
    setOrdreAchat(devis.ordreAchat)
    setPaiement(devis.paiement)
    setPaiement2(devis.paiement2)
    setInputValue(devis.inputValue)
    setInputValue2(devis.inputValue2)
    setInputValue3(devis.inputValue3)
    setSelectedOption(devis.selectedOption)
    setRemisetotal(devis.remisetotal)
    setRemisetotal2(devis.remisetotal2)
    setShowMontantPourcent(devis.showMontantPourcent)
    setShowMontantHTPourcent(devis.showMontantHTPourcent)
    setShowDeviseTab(devis.showDeviseTab)
    setShowPourcentageTab(devis.showPourcentageTab)
    setShowTotalHT(devis.showTotalHT)
    setShowTotalHTPourcent(devis.showTotalHTPourcent)
    setShowSommeDevise(devis.showSommeDevise)
    setShowSommePourcent(devis.showSommePourcent)
    setTotalRemise2(devis.totalRemise2)
    setTotalRemise(devis.totalRemise)
    setShowTotalHT_Tab(devis.showTotalHT_Tab)
    setShowTotalHTPourcent_Tab(devis.showTotalHTPourcent_Tab)
    setShowMontantOriginale(devis.showMontantOriginale)
    setAcompte1(devis.Acompte1)
    setAcompte2(devis.Acompte2)
    setAcompte3(devis.Acompte3)
    setAcompte4(devis.Acompte4)
    setAcompte(devis.Acompte)
    setShowAcompte(devis.showAcompte)
    setShowResumeFacture(devis.showResumeFacture)
    setShowResumeFacture2(devis.showResumeFacture2)
    setShowAcomptePourcent_Tab(devis.showAcomptePourcent_Tab)
    setShowAcompteDevise_Total(devis.showAcompteDevise_Total)
    setShowAcomptePourcent_Total(devis.showAcomptePourcent_Total)
    setSaveDevise(devis.saveDevise)
    setSubTotal2(devis.subTotal2)
    setTotal(devis.total)
    setMontrerHT(devis.montrerHT)
    setShowDeviseTotal(devis.showDeviseTotal)
    setShowPourcentageTotal(devis.showPourcentageTotal)
    setShowSansRemise(devis.showSansRemise)
    setShowResumeFactureDevise(devis.showResumeFactureDevise)
    setShowResumeFacturePourcent(devis.showResumeFacturePourcent)
    setDate3(devis.date3)
    setShowMontantOriginaleHT(devis.showMontantOriginaleHT)
    setShowDeviseTab(devis.showDeviseTab)
    setTotalHorsTva(devis.totalHorsTva)
    setNomDevis(devis.nomDevis)
    setEmail(devis.email)
    setAdresse(devis.adresse)
    setCodePostale(devis.codePostale)


}
}   }

, [dispatch, id, devis, successUpdate])






const submitHandler= (e) => {
  e.preventDefault()
  dispatch(
    updateDevis({
      _id :id,
      champText,
      ...invoiceData,
      subTotal,
      clientf,
      num ,
      cond,
      echa ,
      remiseParLignePourcent,
      enga,
      service,
      ref, 
      ordre,
      communication,
      message ,
      note ,
      date1,
      titredoc,
      showqte,
      showDate,
      showunite,
      showprix,
      showMontant,
      showMontantHT,
      shownum,
      showTva,
      showCode,
      showRefContrat,
      ordreAchat,
      paiement,
      paiement2,
      inputValue,
      inputValue2,
      inputValue3,
      selectedOption,
      remisetotal,
      remisetotal2,
      showMontantPourcent,
      showMontantHTPourcent,
      showDeviseTab,
      showPourcentageTab,
      showTotalHT,
      total,
      showTotalHTPourcent,
      showSommeDevise,
      showSommePourcent,
      totalRemise2,
      totalRemise,
      showTotalHT_Tab,
      showTotalHTPourcent_Tab,
      Acompte1,
      Acompte,
      Acompte2,
      Acompte3,
      Acompte4,
      showResumeFacture,
      showResumeFacture2,
      showAcompte,
      showMontantOriginale,
      showAcompteDevise_Total,
      showAcomptePourcent_Total,
      saveDevise,
      montrerHT,
      showAcomptePourcent_Tab,
      subTotal2,
      showDeviseTotal,
      showPourcentageTotal,
      showMontantOriginaleHT,
      showSansRemise,
      date3,
      showResumeFactureDevise,
      showResumeFacturePourcent,
      showDeviseTab,
      totalHorsTva,
      email,
      adresse,
      codePostale,
      nomDevis

    }))}

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
       content: () => componentRef.current,
       documentTitle : 'emp-data',
     onAfterPrint : ()=> alert('Print success')
 
      })
     
      useEffect(() => {

        const totalRemise2 =()=> {
          var arr = document.getElementsByName("remisePourcent");
          var sum =0
           for(var i = 0; i < arr.length; i++) {
             sum += +arr[i].value;}
              setTotalRemise2(sum) }
              totalRemise2()
    
      }, [invoiceData,totalRemise2])
          
      useEffect(() => {
        //Get the sumqte
        const totalRemise =()=> {
        var arr = document.getElementsByName("remise");
        var sum = 0 ;
         for(var i = 0; i < arr.length; i++) {
           sum += +arr[i].value;}
            setTotalRemise(sum) }
      totalRemise()
      }, [invoiceData, total])


      useEffect(() => {
        //Get the subtotal
        const subTotal2 =()=> {
        var arr = document.getElementsByName("montantPourcent");
        var subtotal = 0;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].value) {
                subtotal += +arr[i].value;
            }
           // document.getElementById("subtotal").value = subtotal;
      
           
            setSubTotal2(subtotal)
        }}
      
      subTotal2()
    
    
      
      }, [invoiceData,totalRemise,subTotal])
     // console.log(subTotal2)


      useEffect(() => {
        //Get the sumqte
        const totalHT =()=> {
        var arr = document.getElementsByName("montantHT");
        var sum = 0 ;
         for(var i = 0; i < arr.length; i++) {
           sum += +arr[i].value;}
            setTotalHT(sum) }
      totalHT()
      
      
      }, [invoiceData,remisetotal2,remisetotal,showTotalHT, showTotalHTPourcent, showTotalHT_Tab,showTotalHTPourcent_Tab, totalHT, totalHTPourcent])


   
          
      useEffect(() => {
      
        const totalHTPourcent =()=> {
          var arr = document.getElementsByName("montantHTPourcent");
          var sum = 0 ;
           for(var i = 0; i < arr.length; i++) {
             sum += +arr[i].value;}
              setTotalHTPourcent(sum) }
        totalHTPourcent()
      
      }, [invoiceData,totalRemise,totalHTPourcent]) 
      useEffect(() => {
        //Get the sumqte
        const totalHT2 =()=> {
        var arr = document.getElementsByName("montantHT2");
        var sum = 0 ;
         for(var i = 0; i < arr.length; i++) {
           sum += +arr[i].value;}
            setTotalHT2(sum) }
      totalHT2()
      
      
      }, [invoiceData,totalRemise,totalRemise2,totalHT2,showTotalHT])

      useEffect(() => {
        //Get the subtotal
        const subTotal =()=> {
        var arr = document.getElementsByName("montant");
        var subtotal = 0;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].value) {
                subtotal += +arr[i].value;
            }
           // document.getElementById("subtotal").value = subtotal;
      
           
            setSubTotal(subtotal)
        }}
      
      subTotal()
      
      }, [invoiceData,totalRemise,showTotalHT])

      useEffect(() => {
        //Get the subtotal
        const subTotal4 =()=> {
        var arr = document.getElementsByName("montant2");
        var subtotal = 0;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].value) {
                subtotal += +arr[i].value;
            }
           // document.getElementById("subtotal").value = subtotal;
      
           
            setSubTotal4(subtotal)
        }}
      
      subTotal4()
      
      }, [invoiceData,totalRemise,showTotalHT])
 
    /*  useEffect(() => {
        const selectedClient = clientfs.find((client) => client.Firstname+ ' ' +client.Surname === clientf);
      
        if (selectedClient) {
          setEmail(selectedClient.Email);
        } else {
          setEmail('');
        }
      }, [clientf, clientfs]);

      useEffect(() => {
        const selectedClient = clientfs.find((client) => client.Firstname+ ' ' +client.Surname === clientf);
      
        if (selectedClient) {
          setAdresse(selectedClient.Address);
        } else {
          setAdresse('');
        }
      }, [clientf, clientfs]);

      useEffect(() => {
        const selectedClient = clientfs.find((client) => client.Firstname+ ' ' +client.Surname === clientf);
      
        if (selectedClient) {
          setCodePostale(selectedClient.Codepostal);
        } else {
          setCodePostale('');
        }
      }, [clientf, clientfs]);
*/

useEffect(() => {
  if (user.role === 1) {
    const selectedClient = clientAdmin.find((client) => client.Firstname + ' ' + client.Surname === clientf);

    if (selectedClient) {
      setEmail(selectedClient.Email);
      setAdresse(selectedClient.Address);
      setCodePostale(selectedClient.Codepostal);
    } else {
      setEmail('');
      setAdresse('');
      setCodePostale('');
    }
  }
}, [clientf, clientAdmin, user.role]);

useEffect(() => {
  if (user.role === 0) {
    const selectedClient = clientfs.find((client) => client.Firstname + ' ' + client.Surname === clientf);

    if (selectedClient) {
      setEmail(selectedClient.Email);
      setAdresse(selectedClient.Address);
      setCodePostale(selectedClient.Codepostal);
    } else {
      setEmail('');
      setAdresse('');
      setCodePostale('');
    }
  }
}, [clientf, clientfs, user.role]);
      const DiscountField = ({ label, value, onChange, show }) => {
        return show ? (
          <div className="discount-field">
            <Typography variant="p">{label}</Typography>
            <TextField
              id="out"
              label=""
              value={value}
              onChange={onChange}
              style={{ marginLeft: "75px", width: "250px" }}
            />
          </div>
        ) : null;
      };

return (
<div style={{ fontFamily: 'Whyte'}} ref={componentRef}>
    <Link to="/inv/devis" style={{ textDecoration: "none" }}>
    <button className="go_back" style={{marginTop:"100Px"}}>
    <i className="fas fa-long-arrow-alt-left"></i> 
            Liste des devis
    </button>
    </Link>
      <form onSubmit={submitHandler}>
      <Typography 
            variant="h6" gutterBottom 
            style={{marginLeft: "140px",
             textShadow: "2px 2px 5px green" ,
              fontSize: "42px",
             marginTop :"px",}}> 
              Estimation</Typography>
      <table>
        <tbody>
          <td>
            <Typography variant="h6" gutterBottom style={{marginTop:"70px"}}>
          Client   : choisir un client
          </Typography>
          <table>
          <tbody>
	        <td>
          { user.role ===0 &&     <select style={{ width: "200px", height: "50px" }} onChange={(e) => setClientf(e.target.value)} value={clientf}>
  {clientfs.map((clientf) => (
    <option key={clientf._id}>
      {clientf.Firstname} {clientf.Surname}

    </option>
  ))}
</select>}


{ user.role ===1 &&     <select style={{ width: "200px", height: "50px" }} onChange={(e) => setClientf(e.target.value)} value={clientf}>
  {clientAdmin.map((clientf) => (
    <option key={clientf._id}>
      {clientf.Firstname} {clientf.Surname}

    </option>
  ))}
</select>}


          <p>Client :{clientf}</p>

          <p>{devis.email}</p>
          <p>{devis.adresse}</p>
          <p>{devis.codePostale}</p>
          </td>
	         <td>        
           
              </td>
	           </tbody>
             </table>
            <Divider style ={{marginTop:"50px"}}/>
             <table>
             <tbody>
             <td>	
      	     <table>
             <tbody>
             <td>
              <Typography variant="body2" gutterBottom Conditions de paiement>
             Numéro de devis
             </Typography></td>
             <td>
          <TextField
           id="outlined-basic"
           label=""
           value={num}
           onChange={(e) => setNum(e.target.value)}
           variant="outlined" 
           placeholder="Ex : BC12345"
           style={{marginLeft:"75px", width:"250px"}}/>
         </td>
         </tbody>
         </table>
         <table>
         <tbody>
         <td> 
        <Typography variant="body2"  
        style={{marginRight:"70px"}}>
          Date 
         </Typography>
          </td>
          <td>		  
      <TextField
        id="date"
        label=""
        type="date"
        value={date1}
        onChange={(e) => setDate1(e.target.value)}
        style={{marginTop:"30px", marginRight:"60px",marginLeft:"80px", width:"250px"}}/>
      </td>
        </tbody>
        </table>
	    
        <table>
        <tbody>
          <td>
            <Typography 
            variant="body2" 
            gutterBottom Conditions de paiement>
            Date de validité
            </Typography></td>
          <td>
          <TextField
           margin="normal"
           id="date-picker-dialog"
           label="" variant="outlined"
           style={{marginTop:"30px", marginRight:"60px",marginLeft:"80px", width:"250px"}}
           value={date3}
           onChange={(e) => setDate3(e.target.value)}
           type="date"
           KeyboardButtonProps={{
           'aria-label': 'change date',}}/>
           </td>
           </tbody>
           </table>
	         </td>
           <td> 
            <div style={{marginBottom:"220Px" , position:"relative"}}>
          <h1>Message(0/3000)</h1>
        <TextareaAutosize
      maxRows={4}
      aria-label="Text"
      placeholder="Entrer votre message ici..."
      //defaultValue="Entrer votre message ici..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: "445px" ,height:"200px", marginTop:"0px"}}
      />
        </div>
        </td>
      </tbody>
    </table>
    {showSansRemise &&<div style={{marginLeft:"450px" , color: "green"}} >{nomDevis}</div>}
{showPourcentageTotal &&<div style={{marginLeft:"450px" , color: "green"}}>{nomDevis}</div>}   
 {showDeviseTotal && <div style={{marginLeft:"450px" , color: "green"}}>{nomDevis}</div>}
{showPourcentageTab && <div style={{marginLeft:"450px" , color: "green"}}>{nomDevis}</div>} 
{showDeviseTab && <div style={{marginLeft:"450px" , color: "green"}}>{nomDevis}</div>}
<Divider style={{marginBottom:"px" ,marginTop:"px"}}/>
          <table style={{position :"relative" ,zIndex: "9999", backgroundColor:"white",
        }}
                    className="responsive-table"

          >
            <thead>
              <tr>
                <th>Produit</th>
                {showDate &&(<th>Date</th>)}
                {showqte && (<th>Qté</th>)}
                {showunite &&(<th>Unité</th>)}
                {showprix&&(<th>Prix</th>)}
                 {showDeviseTab && (<th>Remise(D)</th>)}
                {showPourcentageTab && (<th>Remise(%)</th>)}
                {showMontantHT && (<th>Montant HT</th>)}
                {showMontantOriginaleHT && (<th>Montant HT</th>)}
                {showMontantHTPourcent && (<th>Montant HT </th>)}
                {showTva && (<th>TVA%</th>)}
               {showMontant && (<th>Montant</th>)}
               {showMontantOriginale && (<th>Montant</th>)}
               {showMontantPourcent && (<th>Montant en Remise</th>)}

             </tr>
            </thead> 
            <tbody>   
             {invoiceData.items && invoiceData.items.map((itemField,index) =>{
              return(
               <tr key={index}>
               <td>
                 {user.role==0 && <select 
                  name="product"
                  style={{width:"200px",height:"50px"}} 
                   onChange={(e)=>handleChange(index,e)}
                    value={itemField.product}>
                    {products.map((product)=>
                    (<option key={product._id} > {product.name}</option>))}
                  </select>}

                  {user.role==1 && <select 
                  name="product"
                  style={{width:"200px",height:"50px"}} 
                   onChange={(e)=>handleChange(index,e)}
                    value={itemField.product}>
                    {productAdmin.map((product)=>
                    (<option key={product._id} > {product.name}</option>))}
                  </select>}
               </td>
           {showDate &&(
             <td>				  
              <TextField
                  id=""
                  label=""
                  name="date2"
                  placeholder=''
                  type="date"
                //defaultValue="2023-05-24"
                 onChange={(e)=>handleChange(index,e)}
                 value={itemField.date2}
                 sx={{ width: 150 }}/>
              </td>)}
              {showqte && (
              <td>
             <TextField
            autoFocus
            margin=""
            id=""
            name="qte"
            label=""
            //onChange={event=> handleFormChange(event,index)}
            value={itemField.qte}
            placeholder='1,00'
            fullWidth
            variant="outlined"
            onChange={(e) =>handleChange(index,e)}
			      style={{width:"80px", marginRight:"0px"}}/>
              </td>)}
      {showunite &&(
       <td>
        <select 
          name="unite"
          style={{width:"80px",height:"50px"}}
          onChange={(e)=> handleChange(index,e)} 
          //onChange={changeHandler}
          value={itemField.unite}>
          {Unite.map((option)=>
          (<option key={option.label}>{option.label}</option>))}
        </select>
              </td>)}
              {showprix &&(
              <td>
          <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="prix"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
			      style={{width:"80px"}}
           // value={`${itemField.prix}€`}
            value={itemField.prix}
           onChange={(e) => handleChange(index,e)}/>
              </td>)}
        {showDeviseTab && (
          <td>
          <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="remise"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
			      style={{width:"80px"}}
            value={itemField.remise}
            //value={`${itemField.remise}€`}
            //value={`${itemField.remise ? itemField.remise + "€" : ""}`}
            onChange={(e) => handleChange(index,e)}/>
          </td>)}   

          {showPourcentageTab && (<td>
            <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="remisePourcent"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
			      style={{width:"80px"}}
            value={(itemField.remisePourcent)}
            //value={`${itemField.remise}€`}
            //value={`${itemField.remise ? itemField.remise + "€" : ""}`}
            onChange={(e) => handleChange(index,e)}/>
          </td>)}      
     {showMontantHT &&(
              <td>
            <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="montantHT2"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
		       	style={{width:"130px"}}
            value={(itemField.montantHT2=itemField.qte*itemField.prix-itemField.remise).toFixed(2)}
          // onChange={(e) => setMontant(e.target.value)}
          />
              </td>
              )}
     {showMontantOriginaleHT&&(
              <td>
            <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="montantHT"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
		       	style={{width:"130px"}}
            value={(itemField.montantHT=itemField.qte*itemField.prix).toFixed(2)}
          // onChange={(e) => setMontant(e.target.value)}
          />
              </td>
              )}
{showMontantHTPourcent &&(
              <td>
            <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="montantHTPourcent"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
		       	style={{width:"130px"}}
            value = {(itemField.qte * itemField.prix * (1 - itemField.remisePourcent/ 100)).toFixed(2)}
          // onChange={(e) => setMontant(e.target.value)}
          />
              </td>
              )}
          {showTva && ( <td>
                    <select 
              name="tva"
          style={{width:"80px",height:"50px", marginLeft:""}}
          onChange={(e)=> handleChange(index,e)} 
          //onChange={changeHandler}
          value={itemField.tva}>
          {arrayTVA.map((option)=>
          (<option key={option.label}>{option.value}</option>))}
        </select>
              </td>)}
              {showMontant &&
              (<td>
          <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="montant2"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
		       	style={{width:"100px"}}
             value={(itemField.montant2= (itemField.qte*itemField.prix)- itemField.remise +(itemField.qte*itemField.prix)*itemField.tva/100).toFixed(2)}
          /> 
          </td>)}

          {showMontantOriginale &&
              (<td>
          <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="montant"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
		       	style={{width:"100px"}}
            value={(itemField.montant= (itemField.qte*itemField.prix) +(itemField.qte*itemField.prix)*itemField.tva/100).toFixed(2)}
          /> 
          </td>)}
          {showMontantPourcent &&
              (<td>
          <TextField
            autoFocus
            margin=""
            id="name"
            label=""
            name="montantPourcent"
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
		       	style={{width:"100px"}}
          // onChange={(e) => setMontant(e.target.value)}
    value={((itemField.qte * itemField.prix) * (1 - itemField.remisePourcent / 100) + (itemField.qte * itemField.prix) * itemField.tva / 100).toFixed(2)}
          /> 
          </td>)}

      
         
      
              <td>
              <Button onClick={() => removeFields(index)} aria-label="delete" size="small">
              <IconButton aria-label="delete" size="small">
              <DeleteIcon fontSize="small" />
              </IconButton>
              </Button>
              {/*<Button onClick={() => setShowTva(!showTva)>
              {showTva ? "Masquer TVA %" : "Afficher TVA %"}
              </Button>*/}
              </td>
              </tr>)})} 
              </tbody>
             </table> 
             <table>
  <tbody>
    {invoiceData.items2 && invoiceData.items2.map((itemField2, index) => {
      return (
        <tr key={index}>
          <td>
            <TextField
              autoFocus
              margin=""
              id=""
              name="title"
              label=""
              placeholder="Titre"
              type="text"
              value={itemField2.title}
              onChange={(e) => handleChangeTitre(index, e)}
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
            />
          </td>
          <td>
            <Button aria-label="delete" size="small" onClick={() => removeTitre(index)}>
              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

<table>
  <tbody>
    {invoiceData.items3 && invoiceData.items3.map((itemField3, index) => {
      return (
        <tr key={index}>
          <td>
            <TextareaAutosize
              maxRows={4}
              aria-label="Text"
              name="champ"
              placeholder="Champ text"
              variant="outlined"
              value={itemField3.champ}
              onChange={(e) => handleChangeChamp(index, e)}
              style={{ width: "100%", height: "200px" }} 
            />
          </td>
          <td>
            <Button aria-label="delete" size="small" onClick={() => removeChamptext(index)}>
              <IconButton aria-label="delete" size="small" style={{ marginLeft: "5px" }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

<table>
  <tbody>
    {invoiceData.items4 && invoiceData.items4.map((itemField4, index) => {
      return (
        <tr key={index}>
          <td>
            <h6 style={{ width: "100%" }}>Sous-total(Montant Final)</h6>
          </td>
          <td>
            {/* Adjust the styling based on screen size */}
            <h6 name="sous" style={{ marginLeft: "60%", width: "100px" }}>
              {total}
            </h6>
          </td>
          <td>
            <Button aria-label="delete" size="small" onClick={() => removeSoustotal(index)}>
              <IconButton aria-label="delete" size="small" style={{ marginLeft: "5%" }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

           
        <div className="container">
      {/* Add CSS class to reduce space */}
      <div className="space-reduction">
        <DiscountField
          label="Remise (Devise)"
          value={remisetotal2}
          onChange={(e) => setRemisetotal2(e.target.value)}
          show={showDeviseTotal}
        />
        <DiscountField
          label="Remise  (%)"
          value={remisetotal}
          onChange={(e) => setRemisetotal(e.target.value)}
          show={showPourcentageTotal}
        />
        <DiscountField
          label="Remise"
          value={totalRemise}
          show={showSommeDevise}
        />
        <DiscountField
          label="Remise"
          value={(subTotal - subTotal2).toFixed(2)}
          show={showSommePourcent}
        />
      </div>
    </div>
          <div className={styles.invoiceSummary}>
          <div className={styles.summary}>Résumé </div>
          <div className={styles.summaryItem}>
          <p>Total HT:</p>
          {showTotalHT && (<h4>{totalHorsTva}</h4>)}
  {showTotalHTPourcent &&  (<h4>{totalHorsTva}</h4>)}
  {showTotalHT_Tab && (<h4>{totalHorsTva}</h4>)}
  {montrerHT && (<h4>{totalHorsTva}</h4>)}
  {showTotalHTPourcent_Tab &&<h4>{totalHorsTva}</h4>}
          </div>
        {showDeviseTotal && (<div className={styles.summaryItem}>
        <p>Remise (Devise):</p>
        <h4>{remisetotal2}</h4>
          </div>)}
          {showPourcentageTotal && (
            <div className={styles.summaryItem}>
            <p>Remise (%):</p>
           <h4>{remisetotal}</h4>
          </div>)}
              {invoiceData.items && invoiceData.items.map((itemField,index) =>{
              return(
          <div key={index} className={styles.summaryItem}>
                <p>TVA(%):</p>
                <h4>{itemField.tva}</h4>
                </div>
              )})}
            <div className={styles.summaryItem}>
{showResumeFacture &&(<p>Total dû</p>)}
{showResumeFacture&& (<h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{total}</h4>)}
            </div>

            <div className={styles.summaryItem}>
{showSansRemise &&(<p>Total </p>)}
{showSansRemise && (<h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{total}</h4>)}
            </div>
            <div className={styles.summaryItem}>
{showResumeFacture2 &&(<p>Total dû </p>)}
{showResumeFacture2&& (<h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{total}</h4>)}
            </div>
            <div className={styles.summaryItem}>
{showResumeFactureDevise &&( <p>Total dû </p>)}
{showResumeFactureDevise && typeof subTotal4 === 'number' && ( <h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{total}</h4>)}
            </div>
            <div className={styles.summaryItem}>
{showResumeFacturePourcent &&( <p>Total dû </p>)}
{showResumeFacturePourcent && typeof subTotal2 === 'number'&&(<h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{total}</h4>)}

         
            </div>
       

        </div>


            <List>
          <ListItemButton 
      onClick={handleClick}
      className={styles.but} 
      style={{width:"200px"}}>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Ajouter une ligne" style={{color:"grey"}} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse  in={open} timeout="auto" unmountOnExit className={styles.but}  >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,backgroundColor:""}}
           onClick={addFields} variant="contained" color="success" >
            <ListItemText primary="Ajouter une ligne" style={{color:"grey"}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 ,backgroundColor:""}}
           onClick={addTitre} variant="contained" color="success">
            <ListItemText primary="Ajouter un titre" style={{color:"grey"}} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 ,backgroundColor:""}}
           onClick={addChamptext} variant="contained" color="success">
          <ListItemText primary="Ajouter un champ de texte" style={{color:"grey"}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4,backgroundColor:"" }}
           onClick={addSoustotal} variant="contained" color="success" >
            <ListItemText primary="Ajouter un sous-total" style={{color:"grey"}}/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    <Divider/>
    <table>
    <thead>
    <tr>
    <th>Note de bas de page </th>
    <th></th>
    </tr>
    </thead> 
      <tdoby>
      <td>
    <TextareaAutosize
      maxRows={4}
      aria-label="Text"
      placeholder="Entrez vos notes ici ..."
      value={note}
      onChange={(e)=>setNote(e.target.value)}
       style={{ width: "600px" ,height:"100px" }}/></td>
      <td>
       </td> 
       </tdoby>
       </table>
       </td>
       <td>
   <NestedList 
   invoiceData={invoiceData} showTva={showTva} setShowTva={setShowTva}
    shownum={shownum} setShownum={setShownum} showCode={showCode} 
    setShowCode={setShowCode}  showRefContrat={showRefContrat} setShowRefContrat={setShowRefContrat}
    ordreAchat={ordreAchat} setOrdreAchat={setOrdreAchat} showDate={showDate} setShowDate={setShowDate}
    showqte={showqte} setShowqte={setShowqte} showunite={showunite} setShowunite={setShowunite}
    showprix={showprix} setShowprix={setShowprix} showMontant={showMontant} setShowMontant={setShowMontant}
    showMontantHT={showMontantHT} setShowMontantHT={setShowMontantHT} titredoc={titredoc} setTitredoc={setTitredoc}
    showRefPaiement={showRefPaiement} setShowRefPaiement={setShowRefPaiement}
    selectedOption={selectedOption} setSelectedOption={setSelectedOption}
    inputValue={inputValue} setInputValue={setInputValue}
    inputValue2={inputValue2} setInputValue2={setInputValue2}
    inputValue3={inputValue3} setInputValue3={setInputValue3}
    showDeviseTab={showDeviseTab} setShowDeviseTab={setShowDeviseTab}
    showPourcentageTab={showPourcentageTab} setShowPourcentageTab={setShowPourcentageTab}
    showDeviseTotal={showDeviseTotal} setShowDeviseTotal={setShowDeviseTotal}
    showPourcentageTotal={showPourcentageTotal} setShowPourcentageTotal={setShowPourcentageTotal}
    showParTab={showParTab} setShowParTab={setShowParTab}  showTotal={showTotal}
     setShowTotal={setShowTotal} showMontantPourcent={showMontantPourcent} 
     setShowMontantPourcent={setShowMontantPourcent}
     showMontantHTPourcent ={showMontantHTPourcent} setShowMontantHTPourcent={setShowMontantHTPourcent}
     showTotalHT={showTotalHT} setShowTotalHT={setShowTotalHT}
     showTotalHTPourcent={showTotalHTPourcent} setShowTotalHTPourcent={setShowTotalHTPourcent}
     showSommePourcent={showSommePourcent} setShowSommePourcent ={setShowSommePourcent}
     showSommeDevise={showSommeDevise} setShowSommeDevise={setShowSommeDevise}
     showResumeFacturePourcent={showResumeFacturePourcent} setShowResumeFacturePourcent={setShowResumeFacturePourcent}
     showResumeFactureDevise={showResumeFactureDevise} showResumeFacture={showResumeFacture}
      setShowResumeFacture={setShowResumeFacture} setShowResumeFactureDevise={setShowResumeFactureDevise}
      showTotalHT_Tab={showTotalHT_Tab} setShowTotalHT_Tab={setShowTotalHT_Tab} 
      showTotalHTPourcent_Tab={showTotalHTPourcent_Tab}  setShowTotalHTPourcent_Tab={setShowTotalHTPourcent_Tab}
      showResumeFacture2={showResumeFacture2} setShowResumeFacture2={setShowResumeFacture2} 
      showSansRemise={showSansRemise} setShowSansRemise={setShowSansRemise}
      showAcompte={showAcompte} setShowAcompte={setShowAcompte}
      showAcomptePourcent_Total={showAcomptePourcent_Total} setShowAcomptePourcent_Total={setShowAcomptePourcent_Total}
      showAcompteDevise_Total ={showAcompteDevise_Total} setShowAcompteDevise_Total={setShowAcompteDevise_Total}
showAcomptePourcent_Tab={showAcomptePourcent_Tab} setShowAcomptePourcent_Tab ={setShowAcomptePourcent_Tab}
showAcompteDevise_Tab={showAcompteDevise_Tab}  setShowAcompteDevise_Tab={setShowAcompteDevise_Tab}
showMontantOriginale={showMontantOriginale} setShowMontantOriginale={setShowMontantOriginale}
montrerHT={montrerHT} setMontrerHT={setMontrerHT} saveDevise={saveDevise} setSaveDevise={setSaveDevise}
showButtonSansRemise={showButtonSansRemise} setShowButtonSansRemise={setShowButtonSansRemise}
setShowButtonAvecRemiseTotalPourcent={setShowButtonAvecRemiseTotalPourcent}
setShowButtonAvecRemiseTotalDevise={setShowButtonAvecRemiseTotalDevise}
setShowButtonAvecRemiseTabPourcent={setShowButtonAvecRemiseTabPourcent}
setShowButtonAvecRemiseTabDevise={setShowButtonAvecRemiseTabDevise}
setShowMontantOriginaleHT={setShowMontantOriginaleHT}
/>

       </td>
       </tbody>
       </table> 
       <Button type="submit" className={styles.but}>Enregistez</Button>

   
       </form>
       </div>)}
    export default ListDevis