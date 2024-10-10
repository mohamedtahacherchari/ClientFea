import React, { useState, useEffect } from 'react';
import NavbarLateralSante from './NavbarLateralSante';
import SanteCard from './santeCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowSantesApi } from "../../redux/actions/sante/santeActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from '../sante/Actions';
const AppNavbar = ({ ShowSantesApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const santes = useSelector(state => state.santes);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeSantes = santes.filter(sante => sante.isActive);
  const firstActiveSante = activeSantes[0] || {};
console.log(santes)
console.log(activeSantes)
  useEffect(() => {
    ShowSantesApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <SanteCard
        imageUrl={firstActiveSante.imageUrl}
        description={firstActiveSante.selectedClients?.[0]?.firstName}
        fonction={firstActiveSante.fonction}
      />
    ),
    'Notre Plan': <PlanComponent />, // S'affiche au centre
     'Nos actions' :<Actions/> ,
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
      {showHeader && firstActiveSante.title && firstActiveSante.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveSante.title} {firstActiveSante.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralSante onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveSante.title && firstActiveSante.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveSante.title} {firstActiveSante.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowSantesApi })(AppNavbar);