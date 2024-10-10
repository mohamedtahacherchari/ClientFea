import React, {useState, useEffect ,useRef} from 'react'
import {
  //Drawer,
//  List,
 // ListItem,
  //ListItemText,
  ListItemIcon,
 // Avatar,
  //Box,
  //Typography,
} from '@mui/material';
import {
  VideoLibrary as VideoLibraryIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Tv as TvIcon,
  Home as HomeIcon,
  AccountBalance as AccountBalanceIcon,
  Spa as SpaIcon,
  Favorite as FavoriteIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  Flight as FlightIcon,
  Info as InfoIcon,
  ExitToApp as ExitToAppIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Group as GroupIcon,

} from '@mui/icons-material';
//import React, { useState, useEffect ,} from 'react';
import AppBarComponent from './AppBarComponent';
import { Avatar, Drawer, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBarComponent2 from './AppBarComponent2';
import { useSelector } from 'react-redux';
import axios from "axios";
import AvatarEditor from 'react-avatar-editor';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveIcon from '@mui/icons-material/Save'; // Importez l'icône de sauvegarde
import {IconButton} from '@mui/material';
function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState(""); // État pour stocker le titre de la page
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const { user } = auth
  const editorRef = useRef(null);
  const [avatar, setAvatar] = useState('')
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State pour stocker les coordonnées de l'image
  const editorSize = 250;


  const handleSavePosition = () => {
    // Récupérer la position actuelle de l'AvatarEditor directement à partir de l'objet référencé par editorRef.current
    const currentPosition = {
        x: editorRef.current.props.position.x,
        y: editorRef.current.props.position.y
    };
    // Enregistrer la position
    setPosition(currentPosition);
};

  const fetchPositionFromBackend = async () => {
		try {
		  const response = await axios.get('/api/user/avatar/position', {
			headers: { Authorization: token }
		  });
		  if (response.data.position) {
			setPosition(response.data.position);
		  }
		} catch (error) {
		  console.error('Error fetching avatar position:', error);
		}
	  };
  const updatePositionOnBackend = async (position, token) => {
		try {
		  await axios.patch('/api/user/avatar/position', { position }, {
			headers: { Authorization: token }
		  });
		} catch (error) {
		  console.error('Error updating avatar position:', error);
		}
	  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const logoutHandler = async () => {
    try {
        await axios.get('/api/user/logout')
        sessionStorage.removeItem('firstLogin')
        sessionStorage.removeItem('userInfo')
        window.location.reload(false);
        window.location.href = "/";
    } catch (err) {
        //window.location.href = "/";
        console.log(err)
    }
    //window.location.reload()
  }

  
  const handlePositionChange = (position) => {
		// Mettre à jour les coordonnées de l'image dans le state local
		console.log(position,"Matelot")
		setPosition(position);
		// Envoyer les nouvelles coordonnées de position au backend
		updateAvatarPosition(position);
	  };

   // Après la mise à jour réussie de la position en backend
const updateAvatarPosition = async (newPosition) => {
	try {
	  // Appel de la fonction updatePositionOnBackend avec la nouvelle position et le jeton d'authentification
	  await updatePositionOnBackend(newPosition, token);
	  console.log('Avatar position updated successfully.');
  
	  
  
	} catch (error) {
	  console.error('Error updating avatar position:', error);
	}
  };

  const OnSubmitUpdateUser = async () => {
    try {
  
        // Si une nouvelle image a été mise à jour, envoi de la nouvelle image au backend
        await axios.patch('/api/user/update', {

		  position: position // Envoyer également la position de l'image au backend

        }, {
          headers: { Authorization: token }
        });


      toast.success("Profil a été mis à jour avec succès", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } catch (err) {
      toast.error("Une erreur est survenue", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };


  const handleDrawerClose = () => {
    setDrawerOpen(false);
    updatePageTitle(); // Met à jour le titre de la page lorsque le menu est fermé
  };

  const handleItemClick = (path, title) => {
    navigate(path);
    setPageTitle(title);
  };

  const updatePageTitle = () => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/inv/NavbarLateral":
        setPageTitle("Audiovisuel");
        break;
      case "/AppNavbarEducation":
        setPageTitle("Education des enfants");
        break;
        case "/AppNavbarEntraide":
        setPageTitle("Entraide Pro");
        break;
      case "/AppNavbarEntretien":
        setPageTitle("Grands Entretiens");
        break;
        case "/AppNavbarInvestir":
          setPageTitle("Investir");
          break;
          case "/AppNavbarApprendre":
        setPageTitle("Apprendre à investir");
        break;
        case "/AppNavbarPermaculture":
          setPageTitle("Permaculture");
          break;
          case "/AppNavbarSadaqa":
            setPageTitle("Sadaqa/Deen");
            break;
            case "/AppNavbarSante":
              setPageTitle("Santé");
              break;
              case "/AppNavbarVoyage":
              setPageTitle("Voyage");
              break;
      case "/inv/myprofile":
        setPageTitle("Profile");
        break;
        case "/Sante":
        setPageTitle("Présentation du CI Santé");
        break;
        case "/Voyage":
          setPageTitle("Présentation du CI Voyages");
          break;
          case "/Spirituel":
          setPageTitle("Clôture du séminaire et rappel spirituel");
          break;
          case "/PoleIT":
          setPageTitle("Présentation Pôle FEA I.T");
          break;
          case "/PoleAdmin":
            setPageTitle("Présentation Pôle FEA Admin");
            break;
            case "/ExperienceShared":
              setPageTitle("Présentation Pôle FEA Projet - Partage d'expérience");
              break;
              case "/Invest":
                setPageTitle("Présentation Pôle FEA Invest");
                break;
                case "/Atelier":
                  setPageTitle("Atelier Covid19, et après ? que proposent les membres FEA ?");
                  break;
                  case "/Presentation":
                    setPageTitle("Presentation de l'Equipe d'organisation FEA");
                    break;
                    case "/Ouverture":
                    setPageTitle("Ouverture du séminaire du 13 juin 2020");
                    break;
      default:
        setPageTitle("");
    }
  };

  // Met à jour le titre de la page chaque fois que l'emplacement change
  useEffect(() => {
    updatePageTitle();
  }, [location]);

  useEffect(() => {
   

   setAvatar(user.avatar)
     
   // Récupérer les coordonnées de l'image depuis le backend lors du chargement de la page
   fetchPositionFromBackend();
   }
 , [user])

  return (
    <div>
    <ToastContainer />
    <AppBarComponent2 handleDrawerOpen={handleDrawerOpen} pageTitle={pageTitle} />
    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
      <div style={{ width: 300, backgroundColor: "#1877F2" }}>
        <Box
          sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
          onSubmit={OnSubmitUpdateUser}
        >
          <AvatarEditor
            ref={editorRef}
            image={avatar ? avatar : user.avatar}
            width={editorSize}
            height={editorSize}
            borderRadius={editorSize / 2}
            color={[255, 255, 255, 0.6]}
            scale={1}
            rotate={0}
            position={position}
            onPositionChange={handlePositionChange}
          />
        </Box>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="p"
          name="name"
          id="name"
          sx={{ color: "white", padding: 1 }}
        >
          {user.firstName} {user.lastName}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}
        </Typography>
      </div>
      <List>
  {/* First Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/inv/NavbarLateral", "Audiovisuel")}>
      <ListItemIcon><VideoLibraryIcon /></ListItemIcon>
      <ListItemText primary="Audiovisuel" />
    </ListItem>

 
{ user.role == 1 && 
    <ListItem button onClick={() => handleItemClick("/MyComponentReplay3", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Second Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarEducation", "Éducation des enfants")}>
      <ListItemIcon><SchoolIcon /></ListItemIcon>
      <ListItemText primary="Éducation des enfants" />
    </ListItem>

    { user.role == 1 && <ListItem button onClick={() => handleItemClick("/MyComponentReplay4", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Third Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
   <ListItem button onClick={() => handleItemClick("/AppNavbarEntraide", "Entraide Pro")}>
      <ListItemIcon><PeopleIcon /></ListItemIcon>
      <ListItemText primary="Entraide Pro" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/MyComponentReplay5", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Fourth Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarEntretien", "Grands Entretiens")}>
      <ListItemIcon><TvIcon /></ListItemIcon>
      <ListItemText primary="Grands Entretiens" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/MyComponentReplay6", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Fifth Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarInvestir", "Investir")}>
      <ListItemIcon><HomeIcon /></ListItemIcon>
      <ListItemText primary="Investir" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/MyComponentReplay7", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Sixth Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarApprendre", "Apprendre à investir")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Apprendre à investir" />
    </ListItem>

    { user.role == 1 && <ListItem button onClick={() => handleItemClick("/MyComponentReplay8", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Seventh Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarPermaculture", "Permaculture")}>
      <ListItemIcon><SpaIcon /></ListItemIcon>
      <ListItemText primary="Permaculture" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/MyComponentReplay9", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Eighth Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarSadaqa", "Sadaqa/Deen")}>
      <ListItemIcon><FavoriteIcon /></ListItemIcon>
      <ListItemText primary="Sadaqa/Deen" />
    </ListItem>

    { user.role == 1 && <ListItem button onClick={() => handleItemClick("/MyComponentReplay10", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Ninth Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarSante", "Santé")}>
      <ListItemIcon><HealthAndSafetyIcon /></ListItemIcon>
      <ListItemText primary="Santé" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/MyComponentReplay11", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Tenth Row */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/AppNavbarVoyage", "Voyages")}>
      <ListItemIcon><FlightIcon /></ListItemIcon>
      <ListItemText primary="Voyages" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/MyComponentReplay12", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  {/* Additional elements */}
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/inv/myprofile", "My Profile")}>
      <ListItemIcon><AccountCircleIcon /></ListItemIcon>
      <ListItemText primary="Mon Profile" />
    </ListItem>

    { user.role == 1 &&   <ListItem button onClick={() => handleItemClick("/admin", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
  {user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/inv/users", "Users List")}>
      <ListItemIcon><GroupIcon /></ListItemIcon>
      <ListItemText primary="List des utilisateurs" />
    </ListItem>}

    { user.role == 1 && <ListItem button onClick={() => handleItemClick("/admin", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={logoutHandler}>
      <ListItemIcon><LogoutIcon /></ListItemIcon>
      <ListItemText primary="Déconnexion" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/admin", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={() => handleItemClick("/Apropos", "About")}>
      <ListItemIcon><InfoIcon /></ListItemIcon>
      <ListItemText primary="À Propos" />
    </ListItem>

    { user.role == 1 &&  <ListItem button onClick={() => handleItemClick("/admin", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: 2 }}>
    <ListItem button onClick={logoutHandler}>
      <ListItemIcon><ExitToAppIcon /></ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItem>

    { user.role == 1 &&   <ListItem button onClick={() => handleItemClick("/admin", "Admin")}>
      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>}
  </Box>
</List>
    </Drawer>
  </div>
  );
}

export default ResponsiveAppBar;
