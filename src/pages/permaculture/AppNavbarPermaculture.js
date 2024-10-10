import React, { useState, useEffect } from 'react';
import NavbarLateralPermaculture from './NavbarLateralPermaculture';
import PermacultureCard from './PermacultureCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowPermaculturesApi } from "../../redux/actions/permaculture/permacultureActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from './Actions';
import Recommandation from './Recommandation';


const AppNavbar = ({ ShowPermaculturesApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const permacultures = useSelector(state => state.permacultures);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activePermacultures = permacultures.filter(permaculture => permaculture.isActive);
  const firstActivePermaculture = activePermacultures[0] || {};
console.log(permacultures)
console.log(activePermacultures)
  useEffect(() => {
    ShowPermaculturesApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <PermacultureCard
        imageUrl={firstActivePermaculture.imageUrl}
        description={firstActivePermaculture.selectedClients?.[0]?.firstName}
        fonction={firstActivePermaculture.fonction}
      />
    ),
    'Notre Plan': <PlanComponent />, // S'affiche au centre
   
    'Nos Actions': (
      <Actions
      />
    ), 
    'Nos recommandations pour vous former': (
      <Recommandation
      description={firstActivePermaculture.selectedClients?.[0]?.firstName}

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
      {showHeader && firstActivePermaculture.title && firstActivePermaculture.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActivePermaculture.title} {firstActivePermaculture.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralPermaculture onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActivePermaculture.title && firstActivePermaculture.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActivePermaculture.title} {firstActivePermaculture.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowPermaculturesApi })(AppNavbar);