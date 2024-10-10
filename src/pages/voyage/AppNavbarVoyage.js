import React, { useState, useEffect } from 'react';
import NavbarLateralVoyage from './NavbarLateralVoyage';
import VoyageCard from './VoyageCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowVoyagesApi } from "../../redux/actions/voyage/voyageActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from '../voyage/Actions';
import LesDouzePays from './LesDouzePays';
import Conciergerie from './Conciergerie';
import Sites from './Sites';
const AppNavbar = ({ ShowVoyagesApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const voyages = useSelector(state => state.voyages);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeVoyages = voyages.filter(voyage => voyage.isActive);
  const firstActiveVoyage = activeVoyages[0] || {};
console.log(voyages)
console.log(activeVoyages)
  useEffect(() => {
    ShowVoyagesApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <VoyageCard
        imageUrl={firstActiveVoyage.imageUrl}
        description={firstActiveVoyage.selectedClients?.[0]?.firstName}
        fonction={firstActiveVoyage.fonction}
      />
    ),
    'Notre Plan': <PlanComponent />, // S'affiche au centre
    'Les 12 pays que nous découvrions ensemble' :<LesDouzePays/> ,
    'FEA Conciergerie Voyages': <Conciergerie/>,
    'Sites que nous recommandons' :<Sites/>,
    'Contact':(
     <Contact/>
    ),
  };

  const handleMenuClick = (itemName) => {
    setSelectedContent(contentData[itemName] || null);

    if (itemName === 'Équipe') {
      setShowFooter(true);
      setShowHeader(true); 
    } else {
      setShowFooter(false);
      setShowHeader(false); 
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* Affichage en haut (uniquement si "Équipe" est sélectionné) */}
      {showHeader && firstActiveVoyage.title && firstActiveVoyage.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveVoyage.title} {firstActiveVoyage.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralVoyage onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveVoyage.title && firstActiveVoyage.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveVoyage.title} {firstActiveVoyage.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowVoyagesApi })(AppNavbar);