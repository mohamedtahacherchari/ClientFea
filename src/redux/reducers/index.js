import {combineReducers} from 'redux'
import auth from './authReducer'
import users from './usersReducer'
import token from './tokenReducer'
import softSkills from './softskillReducer'
import hardSkills from './hardskillReducer'
import candidats from './candidatReducer'
import process from './processReducer'
import processidReducer from './processidReducer'
import client from './clientReducer'
import clientfs from './zervantReducers/ClientfReducer'
import products from './zervantReducers/ProductReducer'
import factures from './zervantReducers/FactureReducer'
import facturesAdmin from './zervantReducers/FactureReducerAdmin'
import devisAdmin from './zervantReducers/DevisReducerAdmin'
import productAdmin from './zervantReducers/ProductReducerAdmin'
import clientAdmin from './zervantReducers/ClientReducerAdmin'


import devis from './zervantReducers/DevisReducer'



import {

    clientfUpdateReducer,
    clientfDetailsReducer,
    clientfCreateReducer,
    clientfListReducer
}
from './zervantReducers/ClientfReducer'
import {

    productUpdateReducer,
    productDetailsReducer,
    productCreateReducer,
    productListReducer
}
from './zervantReducers/ProductReducer'
import {

    factureUpdateReducer,
    factureDetailsReducer,
    factureCreateReducer,
    factureListReducer,
    factureLastTotalReducer,
    envoyerMailSansRemiseReducer,
    envoyerMailAvecRemiseTotalEnPourcentageReducer,
    envoyerMailAvecRemiseTotalEnDeviseReducer,
    envoyerMailAvecRemiseParLigneEnPourcentageReducer,
    envoyerMailAvecRemiseParLigneEnDeviseReducer
}
from './zervantReducers/FactureReducer'
import {

    devisUpdateReducer,
    devisDetailsReducer,
    devisCreateReducer,
    devisListReducer,
    envoyerMailSansRemiseReducer2,
    envoyerMailAvecRemiseTotalEnPourcentageReducer2,
    envoyerMailAvecRemiseTotalEnDeviseReducer2,
    envoyerMailAvecRemiseParLigneEnPourcentageReducer2,
    envoyerMailAvecRemiseParLigneEnDeviseReducer2
    
}
from './zervantReducers/DevisReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
  } from './zervantReducers/UserReducer'
  import errorReducer from "./event/errorReducer";
  import {
    eventUpdateReducer,
    eventDetailsReducer,
} from "./event/eventReducer";
  import EventReducer from "./event/eventReducer";
  import EventsReducer from "./event/eventsReducer";
  import modalReducer from "./event/modelReducer"
  import {
    infoUpdateReducer,
    infoDetailsReducer,
} from "./info/infoReducer";
  import InfoReducer from "./info/infoReducer";
  import InfosReducer from "./info/infosReducer";
  import modalReducer2 from "./info/modelReducer2"
  import {
    audiovisuelUpdateReducer,
    audiovisuelDetailsReducer,
    audiovisuelStatusReducer,
} from "./audiovisuel/audiovisuelReducer";
  import AudiovisuelReducer from "./audiovisuel/audiovisuelReducer";
  import AudiovisuelsReducer from "./audiovisuel/audiovisuelsReducer";
  import modalReducer3 from "./audiovisuel/modelReducer3"

  import {
    educationUpdateReducer,
    educationDetailsReducer,
    educationStatusReducer,
} from "./education/educationReducer";
  import EducationReducer from "./education/educationReducer";
  import EducationsReducer from "./education/educationsReducer";
  import modalReducer4 from "./education/modelReducer4"


  import {
    entraideUpdateReducer,
    entraideDetailsReducer,
    entraideStatusReducer,
} from "./entraide/entraideReducer";
  import EntraideReducer from "./entraide/entraideReducer";
  import EntraidesReducer from "./entraide/entraidesReducer";
  import modalReducer5 from "./entraide/modelReducer5"

  import {
    entretienUpdateReducer,
    entretienDetailsReducer,
    entretienStatusReducer,
} from "./entretien/entretienReducer";
  import EntretienReducer from "./entretien/entretienReducer";
  import EntretiensReducer from "./entretien/entretiensReducer";
  import modalReducer6 from "./entretien/modelReducer6"

  import {
    investirUpdateReducer,
    investirDetailsReducer,
    investirStatusReducer,
} from "./investir/investirReducer";
  import InvestirReducer from "./investir/investirReducer";
  import InvestirsReducer from "./investir/investirsReducer";
import ApprendreReducer, { apprendreDetailsReducer, apprendreStatusReducer, apprendreUpdateReducer } from './apprendre/apprendreReducer'
import ApprendresReducer from './apprendre/apprendresReducer'
  //import modalReducer6 from "./entretien/modelReducer6"
  import PermacultureReducer, { permacultureDetailsReducer, permacultureStatusReducer, permacultureUpdateReducer } from './permaculture/permacultureReducer'
  import PermaculturesReducer from './permaculture/permaculturesReducer'

  import SadaqaReducer, { sadaqaDetailsReducer, sadaqaStatusReducer, sadaqaUpdateReducer } from './sadaqa/sadaqaReducer'
  import SadaqasReducer from './sadaqa/sadaqasReducer'


  import SanteReducer, { santeDetailsReducer, santeStatusReducer, santeUpdateReducer } from './sante/santeReducer'
  import SantesReducer from './sante/santesReducer'
import VoyageReducer, { voyageDetailsReducer, voyageStatusReducer, voyageUpdateReducer } from './voyage/voyageReducer'
import VoyagesReducer from './voyage/voyagesReducer'


export default combineReducers({
    auth,
    users,
    token,
    softSkills,
    hardSkills,
    candidats,
    process,
    client,
    processidReducer,
    clientfs,
    clientAdmin,
    clientfUpdate: clientfUpdateReducer,
    clientfDetails : clientfDetailsReducer,
    clientfCreate: clientfCreateReducer,
    clientfList :  clientfListReducer,
    products,
    productAdmin,
    productUpdate: productUpdateReducer,
    productDetails : productDetailsReducer,
    productCreate: productCreateReducer,
    productList :  productListReducer,
    factures,
    facturesAdmin,
    factureUpdate: factureUpdateReducer,
    factureDetails : factureDetailsReducer,
    factureCreate: factureCreateReducer,
    factureList : factureListReducer,
    devis,
    devisAdmin,
    devisUpdate: devisUpdateReducer,
    devisDetails : devisDetailsReducer,
    devisCreate: devisCreateReducer,
    devisList : devisListReducer,
    userLogin : userLoginReducer,
    userRegister:  userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList : userListReducer,
    userDelete: userDeleteReducer,
    userUpdate:userUpdateReducer,
    factureLastTotal: factureLastTotalReducer,
    envoyerMailSansRemise :envoyerMailSansRemiseReducer,
    envoyerMailAvecRemiseTotalEnPourcentage :envoyerMailAvecRemiseTotalEnPourcentageReducer,
    envoyerMailAvecRemiseTotalEnPourcentage :envoyerMailAvecRemiseTotalEnDeviseReducer,
    envoyerMailAvecRemiseParLigneEnPourcentage: envoyerMailAvecRemiseParLigneEnPourcentageReducer,
    envoyerMailAvecRemiseParLigneEnDevise: envoyerMailAvecRemiseParLigneEnDeviseReducer,
    envoyerMailSansRemise : envoyerMailSansRemiseReducer2,
    envoyerMailAvecRemiseTotalEnPourcentage :envoyerMailAvecRemiseTotalEnPourcentageReducer2,
    envoyerMailAvecRemiseTotalEnDevise :envoyerMailAvecRemiseTotalEnDeviseReducer2,
    envoyerMailAvecRemiseParLigneEnPourcentage :envoyerMailAvecRemiseParLigneEnPourcentageReducer2,
    envoyerMailAvecRemiseParLigneEnDevise : envoyerMailAvecRemiseParLigneEnDeviseReducer2,
    event: EventReducer ,
    eventUpdate :eventUpdateReducer,
    eventDetails :eventDetailsReducer,
    events: EventsReducer,
    modalStatus: modalReducer,
    error: errorReducer,
    info: InfoReducer,
    infoUpdate : infoUpdateReducer,
    infoDetails : infoDetailsReducer,
    infos: InfosReducer,
    modalStatus2: modalReducer2,
    audiovisuel: AudiovisuelReducer,
    audiovisuelUpdate : audiovisuelUpdateReducer,
    audiovisuelDetails : audiovisuelDetailsReducer,
    audiovisuels: AudiovisuelsReducer,
    modalStatus3: modalReducer3,
    audiovisuelStatus :audiovisuelStatusReducer,
    education: EducationReducer,
    educationUpdate : educationUpdateReducer,
    educationDetails : educationDetailsReducer,
    educations: EducationsReducer,
    educationStatus : educationStatusReducer,
    modalStatus4: modalReducer4,
    entraide: EntraideReducer,
    entraideUpdate : entraideUpdateReducer,
    entraideDetails : entraideDetailsReducer,
    entraides: EntraidesReducer,
    entraideStatus : entraideStatusReducer,
    modalStatus5: modalReducer5,
    entretien: EntretienReducer,
    entretienUpdate : entretienUpdateReducer,
    entretienDetails : entretienDetailsReducer,
    entretiens: EntretiensReducer,
    entretienStatus : entretienStatusReducer,
    modalStatus6: modalReducer6,
    investir: InvestirReducer,
    investirUpdate : investirUpdateReducer,
    investirDetails : investirDetailsReducer,
    investirs: InvestirsReducer,
    investirStatus : investirStatusReducer,
    apprendre: ApprendreReducer,
    apprendreUpdate : apprendreUpdateReducer,
    apprendreDetails : apprendreDetailsReducer,
    apprendres: ApprendresReducer,
    apprendreStatus : apprendreStatusReducer,
     permaculture: PermacultureReducer,
    permacultureUpdate : permacultureUpdateReducer,
    permacultureDetails : permacultureDetailsReducer,
    permacultures: PermaculturesReducer,
    permacultureStatus : permacultureStatusReducer,
    sadaqa: SadaqaReducer,
    sadaqaUpdate : sadaqaUpdateReducer,
    sadaqaDetails : sadaqaDetailsReducer,
    sadaqas: SadaqasReducer,
    sadaqaStatus : sadaqaStatusReducer,


    sante: SanteReducer,
    santeUpdate : santeUpdateReducer,
    santeDetails : santeDetailsReducer,
    santes: SantesReducer,
    santeStatus : santeStatusReducer,

    voyage: VoyageReducer,
    voyageUpdate : voyageUpdateReducer,
    voyageDetails : voyageDetailsReducer,
    voyages: VoyagesReducer,
    voyageStatus : voyageStatusReducer,

    })



















