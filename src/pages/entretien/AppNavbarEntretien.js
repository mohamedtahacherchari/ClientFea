import React, { useState, useEffect } from 'react';
import NavbarLateralEntretien from './NavbarLateralEntretien';
import EntretienCard from './EntretienCard';
import PlanComponent from './PlanComponent';
import { useSelector } from 'react-redux';
import { ShowEntretiensApi } from "../../redux/actions/entretien/entretienActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from './Actions';
import Rejoignez from './Rejoignez';
import Stories from './Stories';
import FeedBack from './FeedBack';
import Recommandation from './Recommandation';


const AppNavbar = ({ ShowEntretiensApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const entretiens = useSelector(state => state.entretiens);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeEntretiens = entretiens.filter(entretien => entretien.isActive);
  const firstActiveEntretien = activeEntretiens[0] || {};
console.log(entretiens)
console.log(activeEntretiens)
  useEffect(() => {
    ShowEntretiensApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <EntretienCard
        imageUrl={firstActiveEntretien.imageUrl}
        description={firstActiveEntretien.selectedClients?.[0]?.firstName}
        fonction={firstActiveEntretien.fonction}
      />
    ),
    'Notre Plan ': <PlanComponent />, // S'affiche au centre
    'Liste des intervenants': (
      <Stories
      />
    ), 
    'Nos Grands Entretiens': (
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
      {showHeader && firstActiveEntretien.title && firstActiveEntretien.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveEntretien.title} {firstActiveEntretien.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralEntretien onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveEntretien.title && firstActiveEntretien.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveEntretien.title} {firstActiveEntretien.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowEntretiensApi })(AppNavbar);