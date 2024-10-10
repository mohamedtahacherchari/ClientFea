import { useState, useEffect ,React} from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from "@mui/material/AppBar";
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../redux/actions/authAction';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Client from '../pages/Zervant/Client'
import Product from '../pages/Zervant/Product'
import User from './User/User'
import MyProfile2 from './User/MyProfile2'
import MyProfile from './Zervant/MyProfile'
import EditProfile from './User/EditProfile'
import UploadForm from './Zervant/UploadForm'
import EditUser from './User/EditUser';
import ResponsiveAppBar from './ResponsiveAppBar';
import Facture from './Zervant/Facture';
import DevisPage from './Zervant/DevisPage';
import ListDevis from './Zervant/ListDevis'
import ListClient from './Zervant/ListClient';
import ListProduct from './Zervant/ListProduct';
import ListFacture from './Zervant/ListFacture';
import Dashboard from './Zervant/Dashboard';
import BottomNavbar from './BottomNavbar';
import Calendar from './event/Clander'
import AddEvents from './event/AddEvents';
import UpdateEvent from './event/UpdateEvent';
import BackgroundPhoto from './event/accueil';
import 'leaflet/dist/leaflet.css';
import MapsComponent from './event/Maps/MapsComponent';
import MonComposant from './info/MonComposant ';
import MonComposant2 from './info/MonComposant2';
import LinkToOrganigramme from './info/LinkToOrganigramme';
import LinkToReseaux from './info/LinkToReseaux';
import SeminairesIcon2 from './info/SeminairesIcon2';
import LivretBlanc from './info/LivretBlanc';
import Podcast from './info/Podcast';
import Challenge from './info/Challenge';
import Video from './info/Video';
import Equipe2 from './info/Equipe2';
import LinkToModeration from './info/LinkToModeration';
import LinkToContact from './info/LinkToContact';
import MyComponentReplay from './Replay/MoncomposantReplay';
import MyComponentReplay2 from './Replay/MoncomposantReplay2';
import MyComponentReplay3 from './audiovisuel/MyComponentReplay3';
import HomeReplay from './Replay/HomeReplay';
import Sante from './Replay/Routes/Sante';
import Sadaqa from './Replay/Routes/Sadaqa';
import Voyage from './Replay/Routes/Voyage';
import Audiovisuel from './Replay/Routes/Audiovisuel';
import Spirituel from './Replay/Routes/Spirituel';
import PoleIT from './Replay/Routes/PoleIT';
import PoleAdmin from './Replay/Routes/PoleAdmin';
import Elearning from './Replay/Routes/Elearning';
import ExperienceShared from './Replay/Routes/ExperienceShared';
import Invest from './Replay/Routes/Invest';
import Atelier from './Replay/Routes/Atelier';
import Presentation from './Replay/Routes/Presentation';
import Ouverture from './Replay/Routes/Ouverture';
import EventById from './Replay/EventById';
import PDFViewerComponent from './Replay/Pdf/PDFViewerComponent ';
//import MyPDFViewer from './Replay/PdfUrl';
import AddInfo from './info/AddInfo'
import InfoByIdById from './info/InfoById';
import EditInfo from './info/EditInfo';
import MapComponent from '../components/MapComponent'
import UserMap from '../components/UserMap';
import NavbarLateral from './audiovisuel/NavbarLateral';
import AddAudiovisuel from './audiovisuel/AddAudiovisuel';
import AudiovisualCard from './audiovisuel/AudiovisualCard';
import AppNavbar from './audiovisuel/AppNavbar';
import UpdateAudiovisuel from './audiovisuel/UpdateAudiovisuel';
import FicheProjet from './audiovisuel/FicheProjet';
import MontageVideo from './audiovisuel/MontageVideo';
import Video1 from './audiovisuel/Video1';
import Video2 from './audiovisuel/Video2';
import Patenaires from './audiovisuel/Patenaires';
import Youtube1 from './audiovisuel/Youtube1';
import Youtube2 from './audiovisuel/Youtube2';
import AddEducation from './education/addEducation';
import MyComponentReplay4 from './education/MyComponentReplay4';
import UpdateEducation from './education/UpdateEducation';
import AppNavbarEducation from './education/AppNavbarEducation';
import FicheProjetEducation from './education/FicheProjetEducation';
import AppNavbarEntraide from './entraide/AppNavbarEntraide';
import AddEntraide from './entraide/AddEntraide';
import MyComponentReplay5 from './entraide/MyComponentReplay5';
import UpdateEntraide from './entraide/UpdateEntraide';
import FicheProjetEntraide from './entraide/FicheProjetEntraide';
import AddEntretien from './entretien/AddEntretien';
import MyComponentReplay6 from './entretien/MyComponentReplay6';
import AppNavbarEntretien from './entretien/AppNavbarEntretien';
import UpdateEntretien from './entretien/UpdateEntretien';
import FicheProjetEntretien from './entretien/FicheProjetEntretien';

import AddInvestir from './investir/AddInvestir';
import MyComponentReplay7 from './investir/MyComponentReplay7';
import AppNavbarInvestir from './investir/AppNavbarInvestir';
import UpdateInvestir from './investir/UpdateInvestir';
import FicheProjetInvestir from './investir/FicheProjetInvestir';
import AddApprendre from './apprendre/AddApprendre';
import UpdateApprendre from './apprendre/UpdateApprendre';
import MyComponentReplay8 from './apprendre/MyComponentReplay8';
import AppNavbarApprendre from './apprendre/AppNavbarApprendre';
import FicheProjetApprendre from './apprendre/FicheProjetApprendre';
import AddPermaculture from './permaculture/AddPermaculture';
import UpdatePermaculture from './permaculture/UpdatePermaculture';
import MyComponentReplay9 from './permaculture/MyComponentReplay9';
import AppNavbarPermaculture from './permaculture/AppNavbarPermaculture';
import FicheProjetPermaculture from './permaculture/FicheProjetPermaculture';
import AddSadaqa from './sadaqa/AddSadaqa';
import UpdateSadaqa from './sadaqa/UpdateSadaqa';
import MyComponentReplay10 from './sadaqa/MyComponentReplay10';
import AppNavbarSadaqa from './sadaqa/AppNavbarSadaqa'
import AddSante from './sante/AddSante';
import UpdateSante from './sante/UpdateSante';
import AppNavbarSante from './sante/AppNavbarSante';
import MyComponentReplay11 from './sante/MyComponentReplay11';
import AddVoyage from './voyage/AddVoyage';
import UpdateVoyage from './voyage/UpdateVoyage';
import AppNavbarVoyage from './voyage/AppNavbarVoyage';
import MyComponentReplay12 from './voyage/MyComponentReplay12';
import Apropos from './Apropos/Apropos'
import Users from './User/User';

  const drawerWidth = 270;



const Home = (props) => {
        const dispatch = useDispatch()

        const token = useSelector(state => state.token)

        const auth = useSelector(state => state.auth)
    

 

    const theme = useTheme();

        const [dark, setDark] = useState(false);

    const darkTheme = createTheme({
        typography: {
            fontFamily: 'Whyte',
        },
        palette:{
                        mode:'dark',
                }
    })

        const lightTheme = createTheme({
        typography: {
            fontFamily: 'Whyte',
        },
                palette:{
                        background : {
                                mode: 'light',
                                default: "#f8f8f8"
                        },
                }
        })
 
        useEffect(() => {
                const firstLogin = sessionStorage.getItem('firstLogin')
                if(firstLogin){
                const getToken = async () => {
                        const res = await axios.post('/api/user/refresh_token', null)
                        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
                }
                getToken()
                }
        },[auth.isLogged, dispatch])

       useEffect(() => {
                if(token){
                const getUser = () => {
                        dispatch(dispatchLogin())

                        return fetchUser(token).then(res => {
                        dispatch(dispatchGetUser(res))
                        })
                }
                getUser()
                }
        },[token, dispatch])

    return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}
   
    >
            <CssBaseline />
    
       <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ResponsiveAppBar />
          <Box
                component="main"
                sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}>
              <Routes>
                    <Route path='/*' element={<BackgroundPhoto/>} />
                    <Route path="/inv/upload" element={<UploadForm/>} />
                    <Route path="//inv/users" element={<Users/>} />

                    <Route path="/inv/myProfile" element={<MyProfile/>} />
                    <Route path="/clander" element={<Calendar/>}></Route>
                    <Route path="/events/add" element={<AddEvents/>}/>
                    <Route path="/event/:id/update" element={<UpdateEvent/>}/>
                    <Route path="/Accueil" element={<BackgroundPhoto/>}/>
                     <Route path="/maps" element={<MapsComponent/>}/>
                     <Route path="/info" element={<MonComposant/>}/>
                     <Route path="/info2" element={<MonComposant2/>}/>
                     <Route path="/LinkToOrganigramme" element={<LinkToOrganigramme/>}/>
                     <Route path="/LinkToReseaux" element={<LinkToReseaux/>}/>
                     <Route path="/SeminairesIcon2" element={<SeminairesIcon2/>}/>
                     <Route path="/LivretBlanc" element={<LivretBlanc/>}/>
                     <Route path="/Podcast" element={<Podcast/>}/>
                     <Route path="/Challenge" element={<Challenge/>}/>
                     <Route path="/Video" element={<Video/>}/>
                     <Route path="/LinkToModeration" element={<LinkToModeration/>}/>
                     <Route path="/LinkToContact" element={<LinkToContact/>}/>
                     <Route path="/MyComponentReplay" element={<MyComponentReplay/>}/>
                     <Route path="/MyComponentReplay2" element={<MyComponentReplay2/>}/>
                     <Route path="/Equipe2" element={<Equipe2/>}/>
                     <Route path="/" element={<HomeReplay/>}/>
                     <Route path='/Sante' element={<Sante/>} />
                     <Route path='/Sadaqa' element={<Sadaqa/>} />
                     <Route path='/Voyage' element={<Voyage/>} />
                     <Route path='/Audiovisuel' element={<Audiovisuel/>} />
                     <Route path='/Spirituel' element={<Spirituel/>} />
                     <Route path='/PoleIT' element={<PoleIT/>} />
                     <Route path='/PoleAdmin' element={<PoleAdmin/>} />
                     <Route path='/Elearning' element={<Elearning/>} />
                     <Route path='/ExperienceShared' element={<ExperienceShared/>} />
                     <Route path='/Invest' element={<Invest/>} />
                     <Route path='/Atelier' element={<Atelier/>} />
                     <Route path='/Presentation' element={<Presentation/>}/>
                     <Route path='/Ouverture' element={<Ouverture/>}/>
                     <Route path='/event/:id' element={<EventById/>}/>
                    {/* <Route path='/PDFViewerComponent/:id' element={<PDFViewerComponent/>}/>*/}
                   {/* <Route path='/eve' element={<MyPDFViewer/>}/>*/}
                   <Route path='/AddInfo' element={<AddInfo/>}/>
                   <Route path='/AddAudiovisuel' element={<AddAudiovisuel/>}/>
                   <Route path='/info/:id' element={<InfoByIdById/>}/>
                   <Route path='/EditInfo/:id' element={<EditInfo/>}/>
                   <Route path='/mapComponent' element={<MapComponent/>}/>
                   <Route path='/UserMap' element={<UserMap/>}/>
                   <Route path='/inv/NavbarLateral' element={<AppNavbar/>}/>
                   <Route path='/MyComponentReplay3' element={<MyComponentReplay3/>}/>
                   <Route path='/AudiovisualCard' element={<AudiovisualCard/>}/>
                   <Route path='/AppNavbar' element={<AppNavbar/>}/>
                   <Route path='/UpdateAudiovisuel/:id' element={<UpdateAudiovisuel/>}/>
                   <Route path='/FicheProjet' element={<FicheProjet/>}/>
                   <Route path='/FicheProjetEducation' element={<FicheProjetEducation/>}/>
                   <Route path='/MontageVideo' element={<MontageVideo/>}/>
                   <Route path='/Video1' element={<Video1/>}/>
                   <Route path='/Video2' element={<Video2/>}/>
                   <Route path='/Patenaires' element={<Patenaires/>}/>
                   <Route path='/Youtube1' element={<Youtube1/>}/>
                   <Route path='/Youtube2' element={<Youtube2/>}/>
                   <Route path='/addEducation' element={<AddEducation/>}/>
                   <Route path='/MyComponentReplay4' element={<MyComponentReplay4/>}/>
                   <Route path='/UpdateEducation/:id' element={<UpdateEducation/>}/>
                   <Route path='/AppNavbarEducation' element={<AppNavbarEducation/>}/>
                   <Route path='/AppNavbarEntraide' element={<AppNavbarEntraide/>}/>
                   <Route path='/addEntraide' element={<AddEntraide/>}/>
                   <Route path='/MyComponentReplay5' element={<MyComponentReplay5/>}/>
                   <Route path='/UpdateEntraide/:id' element={<UpdateEntraide/>}/>
                   <Route path='/FicheProjetEntraide' element={<FicheProjetEntraide/>}/>
                   <Route path='/addEntretien' element={<AddEntretien/>}/>
                   <Route path='/MyComponentReplay6' element={<MyComponentReplay6/>}/>
                   <Route path='/AppNavbarEntretien' element={<AppNavbarEntretien/>}/>
                   <Route path='/addEntretien' element={<AddEntretien/>}/>
                   <Route path='/MyComponentReplay6' element={<MyComponentReplay6/>}/>
                   <Route path='/UpdateEntretien/:id' element={<UpdateEntretien/>}/>
               <Route path='/FicheProjetEntretien' element={<FicheProjetEntretien/>}/>

               <Route path='/addInvestir' element={<AddInvestir/>}/>
                   <Route path='/MyComponentReplay7' element={<MyComponentReplay7/>}/>
                   <Route path='/AppNavbarInvestir' element={<AppNavbarInvestir/>}/>
                   <Route path='/UpdateInvestir/:id' element={<UpdateInvestir/>}/>
               <Route path='/FicheProjetInvestir' element={<FicheProjetInvestir/>}/>

               <Route path='/addApprendre' element={<AddApprendre/>}/>
               <Route path='/UpdateApprendre/:id' element={<UpdateApprendre/>}/>
               <Route path='/MyComponentReplay8' element={<MyComponentReplay8/>}/>
               <Route path='/AppNavbarApprendre' element={<AppNavbarApprendre/>}/>
               <Route path='/FicheProjetApprendre' element={<FicheProjetApprendre/>}/>


               <Route path='/addPermaculture' element={<AddPermaculture/>}/>
               <Route path='/UpdatePermaculture/:id' element={<UpdatePermaculture/>}/>
               <Route path='/MyComponentReplay9' element={<MyComponentReplay9/>}/>
               <Route path='/AppNavbarPermaculture' element={<AppNavbarPermaculture/>}/>
               <Route path='/FicheProjetPermaculture' element={<FicheProjetPermaculture/>}/>

               <Route path='/addSadaqa' element={<AddSadaqa/>}/>
               <Route path='/UpdateSadaqa/:id' element={<UpdateSadaqa/>}/>
               <Route path='/MyComponentReplay10' element={<MyComponentReplay10/>}/>
               <Route path='/AppNavbarSadaqa' element={<AppNavbarSadaqa/>}/>


               <Route path='/addSante' element={<AddSante/>}/>
               <Route path='/UpdateSante/:id' element={<UpdateSante/>}/>
               <Route path='/AppNavbarSante' element={<AppNavbarSante/>}/>
               <Route path='/MyComponentReplay11' element={<MyComponentReplay11/>}/>

               <Route path='/addVoyage' element={<AddVoyage/>}/>
               <Route path='/UpdateVoyage/:id' element={<UpdateVoyage/>}/>
               <Route path='/AppNavbarVoyage' element={<AppNavbarVoyage/>}/>
               <Route path='/MyComponentReplay12' element={<MyComponentReplay12/>}/>


               <Route path='/Apropos' element={<Apropos/>}/>






              






                


   










             

























                    </Routes>
          </Box>
      <BottomNavbar/>
     </div>
    </ThemeProvider>)}

export default Home