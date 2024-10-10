import React, { useState, useEffect } from 'react';
import NavbarLateralApprendre from './NavbarLateralApprendre';
import ApprendreCard from './ApprendreCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowApprendresApi } from "../../redux/actions/apprendre/apprendreActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from './Actions';



const AppNavbar = ({ ShowApprendresApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const apprendres = useSelector(state => state.apprendres);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeApprendres = apprendres.filter(apprendre => apprendre.isActive);
  const firstActiveApprendre = activeApprendres[0] || {};
console.log(apprendres)
console.log(activeApprendres)
  useEffect(() => {
    ShowApprendresApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <ApprendreCard
        imageUrl={firstActiveApprendre.imageUrl}
        description={firstActiveApprendre.selectedClients?.[0]?.firstName}
        fonction={firstActiveApprendre.fonction}
      />
    ),
    'Notre Plan ': <PlanComponent />, // S'affiche au centre
   
    'Nos Actions': (
      <Actions
      description={firstActiveApprendre.selectedClients?.[0]?.firstName}

      />
    ), 
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
      {showHeader && firstActiveApprendre.title && firstActiveApprendre.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveApprendre.title} {firstActiveApprendre.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralApprendre onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveApprendre.title && firstActiveApprendre.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveApprendre.title} {firstActiveApprendre.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowApprendresApi })(AppNavbar);