// BottomNavbar.jsx
import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home as HomeIcon, Event as EventIcon, Map as MapIcon, Replay as ReplayIcon, Info as InfoIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBarComponent from './AppBarComponent'; // Importer le composant AppBarComponent

function BottomNavbar() {
  const [value, setValue] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState(""); // État pour le titre sélectionné
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour gérer les clics sur les éléments de la barre de navigation inférieure
  const handleItemClick = (label, index, path) => {
    setValue(index);
    setSelectedTitle(label); // Met à jour le titre sélectionné avec le label correspondant
    navigate(path);
  };

  // Met à jour le titre sélectionné chaque fois que l'emplacement change
  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/Accueil":
        setSelectedTitle("Accueil");
        setValue(0);
        break;
      case "/Clander": // Correction du chemin
        setSelectedTitle("Agenda");
        setValue(1);
        break;
      case "/UserMap":
        setSelectedTitle("Info Map");
        setValue(2);
        break;
      case "/MyComponentReplay":
        setSelectedTitle("Replay");
        setValue(3);
        break;
      case "/info":
        setSelectedTitle("Info");
        setValue(4);
        break;
      default:
        setSelectedTitle("");
        setValue(0);
    }
  }, [location]);

  return (
    <div style={{ zIndex: 9999 }}> {/* Donner un z-index élevé pour garantir que le BottomNavbar apparaît au-dessus des autres composants */}
      {/* Utiliser AppBarComponent avec les propriétés appropriées */}
      <AppBarComponent pageTitle={selectedTitle} />
      {/* Barre de navigation inférieure */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1 }}
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} onClick={() => handleItemClick("Accueil", 0, "/Accueil")} />
        <BottomNavigationAction label="Agenda" icon={<EventIcon />} onClick={() => handleItemClick("Agenda", 1, "/Clander")} />
        <BottomNavigationAction label="Info Map" icon={<MapIcon />} onClick={() => handleItemClick("Info Map", 2, "/UserMap")} />
        <BottomNavigationAction label="Replay" icon={<ReplayIcon />} onClick={() => handleItemClick("Replay", 3, "/MyComponentReplay")} />
        <BottomNavigationAction label="Info" icon={<InfoIcon />} onClick={() => handleItemClick("Info", 4, "/info2")} />
      </BottomNavigation>
    </div>
  );
}

export default BottomNavbar;

