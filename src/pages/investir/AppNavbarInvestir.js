import React, { useState, useEffect } from 'react';
import NavbarLateralInvestir from './NavbarLateralInvestir';
import InvestirCard from './InvestirCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowInvestirsApi } from "../../redux/actions/investir/investirActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from './Actions';
import Rejoignez from './Rejoignez';
import Stories from './Stories';
import FeedBack from './FeedBack';
import Recommandation from './Recommandation';


const AppNavbar = ({ ShowInvestirsApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const investirs = useSelector(state => state.investirs);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeInvestirs = investirs.filter(investir => investir.isActive);
  const firstActiveInvestir = activeInvestirs[0] || {};
console.log(investirs)
console.log(activeInvestirs)
  useEffect(() => {
    ShowInvestirsApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <InvestirCard
        imageUrl={firstActiveInvestir.imageUrl}
        description={firstActiveInvestir.selectedClients?.[0]?.firstName}
        fonction={firstActiveInvestir.fonction}
      />
    ),
    'Notre Plan': <PlanComponent />, // S'affiche au centre
   
    'Nos Investissements disponible': (
      <Stories
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
      {showHeader && firstActiveInvestir.title && firstActiveInvestir.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveInvestir.title} {firstActiveInvestir.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralInvestir onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveInvestir.title && firstActiveInvestir.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveInvestir.title} {firstActiveInvestir.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowInvestirsApi })(AppNavbar);