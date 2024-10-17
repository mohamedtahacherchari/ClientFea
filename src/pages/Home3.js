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
                    <Route path="/inv/clander" element={<Calendar/>}></Route>
                    <Route path="/inv/events/add" element={<AddEvents/>}/>
                    <Route path="/inv/event/:id/update" element={<UpdateEvent/>}/>
                    <Route path="/inv/Accueil" element={<BackgroundPhoto/>}/>
                     <Route path="/inv/maps" element={<MapsComponent/>}/>
                     <Route path="/inv/info" element={<MonComposant/>}/>
                     <Route path="/inv/info2" element={<MonComposant2/>}/>
                     <Route path="/inv/LinkToOrganigramme" element={<LinkToOrganigramme/>}/>
                     <Route path="/inv/LinkToReseaux" element={<LinkToReseaux/>}/>
                     <Route path="/inv/SeminairesIcon2" element={<SeminairesIcon2/>}/>
                     <Route path="/inv/LivretBlanc" element={<LivretBlanc/>}/>
                     <Route path="/inv/Podcast" element={<Podcast/>}/>
                     <Route path="/inv/Challenge" element={<Challenge/>}/>
                     <Route path="/inv/Video" element={<Video/>}/>
                     <Route path="/inv/LinkToModeration" element={<LinkToModeration/>}/>
                     <Route path="/inv/LinkToContact" element={<LinkToContact/>}/>
                     <Route path="/inv/MyComponentReplay" element={<MyComponentReplay/>}/>
                     <Route path="/inv/MyComponentReplay2" element={<MyComponentReplay2/>}/>
                     <Route path="/inv/Equipe2" element={<Equipe2/>}/>
                     <Route path="/inv" element={<HomeReplay/>}/>
                     <Route path='/inv/Sante' element={<Sante/>} />
                     <Route path='/inv/Sadaqa' element={<Sadaqa/>} />
                     <Route path='/inv/Voyage' element={<Voyage/>} />
                     <Route path='/inv/Audiovisuel' element={<Audiovisuel/>} />
                     <Route path='/inv/Spirituel' element={<Spirituel/>} />
                     <Route path='/inv/PoleIT' element={<PoleIT/>} />
                     <Route path='/inv/PoleAdmin' element={<PoleAdmin/>} />
                     <Route path='/inv/Elearning' element={<Elearning/>} />
                     <Route path='/inv/ExperienceShared' element={<ExperienceShared/>} />
                     <Route path='/inv/Invest' element={<Invest/>} />
                     <Route path='/inv/Atelier' element={<Atelier/>} />
                     <Route path='/inv/Presentation' element={<Presentation/>}/>
                     <Route path='/inv/Ouverture' element={<Ouverture/>}/>
                     <Route path='/inv/event/:id' element={<EventById/>}/>
                    {/* <Route path='/PDFViewerComponent/:id' element={<PDFViewerComponent/>}/>*/}
                   {/* <Route path='/eve' element={<MyPDFViewer/>}/>*/}
                   <Route path='/inv/AddInfo' element={<AddInfo/>}/>
                   <Route path='/inv/AddAudiovisuel' element={<AddAudiovisuel/>}/>
                   <Route path='/inv/info/:id' element={<InfoByIdById/>}/>
                   <Route path='/inv/EditInfo/:id' element={<EditInfo/>}/>
                   <Route path='/inv/mapComponent' element={<MapComponent/>}/>
                   <Route path='/inv/UserMap' element={<UserMap/>}/>
                   <Route path='/inv/inv/NavbarLateral' element={<AppNavbar/>}/>
                   <Route path='/inv/MyComponentReplay3' element={<MyComponentReplay3/>}/>
                   <Route path='/inv/AudiovisualCard' element={<AudiovisualCard/>}/>
                   <Route path='/inv/AppNavbar' element={<AppNavbar/>}/>
                   <Route path='/inv/UpdateAudiovisuel/:id' element={<UpdateAudiovisuel/>}/>
                   <Route path='/inv/FicheProjet' element={<FicheProjet/>}/>
                   <Route path='/inv/FicheProjetEducation' element={<FicheProjetEducation/>}/>
                   <Route path='/inv/MontageVideo' element={<MontageVideo/>}/>
                   <Route path='/inv/Video1' element={<Video1/>}/>
                   <Route path='/inv/Video2' element={<Video2/>}/>
                   <Route path='/inv/Patenaires' element={<Patenaires/>}/>
                   <Route path='/inv/Youtube1' element={<Youtube1/>}/>
                   <Route path='/inv/Youtube2' element={<Youtube2/>}/>
                   <Route path='/inv/addEducation' element={<AddEducation/>}/>
                   <Route path='/inv/MyComponentReplay4' element={<MyComponentReplay4/>}/>
                   <Route path='/inv/UpdateEducation/:id' element={<UpdateEducation/>}/>
                   <Route path='/inv/AppNavbarEducation' element={<AppNavbarEducation/>}/>
                   <Route path='/inv/AppNavbarEntraide' element={<AppNavbarEntraide/>}/>
                   <Route path='/inv/addEntraide' element={<AddEntraide/>}/>
                   <Route path='/inv/MyComponentReplay5' element={<MyComponentReplay5/>}/>
                   <Route path='/inv/UpdateEntraide/:id' element={<UpdateEntraide/>}/>
                   <Route path='/inv/FicheProjetEntraide' element={<FicheProjetEntraide/>}/>
                   <Route path='/inv/addEntretien' element={<AddEntretien/>}/>
                   <Route path='/inv/MyComponentReplay6' element={<MyComponentReplay6/>}/>
                   <Route path='/inv/AppNavbarEntretien' element={<AppNavbarEntretien/>}/>
                   <Route path='/inv/addEntretien' element={<AddEntretien/>}/>
                   <Route path='/inv/MyComponentReplay6' element={<MyComponentReplay6/>}/>
                   <Route path='/inv/UpdateEntretien/:id' element={<UpdateEntretien/>}/>
               <Route path='/inv/FicheProjetEntretien' element={<FicheProjetEntretien/>}/>

               <Route path='/inv/addInvestir' element={<AddInvestir/>}/>
                   <Route path='/inv/MyComponentReplay7' element={<MyComponentReplay7/>}/>
                   <Route path='/inv/AppNavbarInvestir' element={<AppNavbarInvestir/>}/>
                   <Route path='/inv/UpdateInvestir/:id' element={<UpdateInvestir/>}/>
               <Route path='/inv/FicheProjetInvestir' element={<FicheProjetInvestir/>}/>

               <Route path='/inv/addApprendre' element={<AddApprendre/>}/>
               <Route path='/inv/UpdateApprendre/:id' element={<UpdateApprendre/>}/>
               <Route path='/inv/MyComponentReplay8' element={<MyComponentReplay8/>}/>
               <Route path='/inv/AppNavbarApprendre' element={<AppNavbarApprendre/>}/>
               <Route path='/inv/FicheProjetApprendre' element={<FicheProjetApprendre/>}/>


               <Route path='/inv/addPermaculture' element={<AddPermaculture/>}/>
               <Route path='/inv/UpdatePermaculture/:id' element={<UpdatePermaculture/>}/>
               <Route path='/inv/MyComponentReplay9' element={<MyComponentReplay9/>}/>
               <Route path='/inv/AppNavbarPermaculture' element={<AppNavbarPermaculture/>}/>
               <Route path='/inv/FicheProjetPermaculture' element={<FicheProjetPermaculture/>}/>

               <Route path='/inv/addSadaqa' element={<AddSadaqa/>}/>
               <Route path='/inv/UpdateSadaqa/:id' element={<UpdateSadaqa/>}/>
               <Route path='/inv/MyComponentReplay10' element={<MyComponentReplay10/>}/>
               <Route path='/inv/AppNavbarSadaqa' element={<AppNavbarSadaqa/>}/>


               <Route path='/inv/addSante' element={<AddSante/>}/>
               <Route path='/inv/UpdateSante/:id' element={<UpdateSante/>}/>
               <Route path='/inv/AppNavbarSante' element={<AppNavbarSante/>}/>
               <Route path='/inv/MyComponentReplay11' element={<MyComponentReplay11/>}/>

               <Route path='/inv/addVoyage' element={<AddVoyage/>}/>
               <Route path='/inv/UpdateVoyage/:id' element={<UpdateVoyage/>}/>
               <Route path='/inv/AppNavbarVoyage' element={<AppNavbarVoyage/>}/>
               <Route path='/inv/MyComponentReplay12' element={<MyComponentReplay12/>}/>


               <Route path='/inv/Apropos' element={<Apropos/>}/>






              






                


   










             

























                    </Routes>
          </Box>
      <BottomNavbar/>
     </div>
    </ThemeProvider>)}

export default Home