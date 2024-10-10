import React, { useState, useEffect } from 'react';
import NavbarLateralEntraide from './NavbarLateralEntraide';
import EntraideCard from './EntraideCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowEntraidesApi } from "../../redux/actions/entraide/entraideActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from './Actions';
import Rejoignez from './Rejoignez';
import Stories from './Stories';
import FeedBack from './FeedBack';
import Recommandation from './Recommandation';


const AppNavbar = ({ ShowEntraidesApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const entraides = useSelector(state => state.entraides);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeEntraides = entraides.filter(entraide => entraide.isActive);
  const firstActiveEntraide = activeEntraides[0] || {};
console.log(entraides)
console.log(activeEntraides)
  useEffect(() => {
    ShowEntraidesApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <EntraideCard
        imageUrl={firstActiveEntraide.imageUrl}
        description={firstActiveEntraide.selectedClients?.[0]?.firstName}
        fonction={firstActiveEntraide.fonction}
      />
    ),
    'Rejoignez-nous': (
      <Rejoignez
      />
    ), 
    'Notre Plan ': <PlanComponent />, // S'affiche au centre
    'Nos success stories': (
      <Stories
      />
    ), 
    'FEA Feed Back': (
      <FeedBack
      />
    ), 
    'FEA Recommandations': (
      <Recommandation
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
      {showHeader && firstActiveEntraide.title && firstActiveEntraide.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveEntraide.title} {firstActiveEntraide.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralEntraide onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveEntraide.title && firstActiveEntraide.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveEntraide.title} {firstActiveEntraide.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowEntraidesApi })(AppNavbar);