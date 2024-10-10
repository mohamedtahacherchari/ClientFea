import React, { useState, useEffect } from 'react';
import NavbarLateralSadaqa from './NavbarLateralSadaqa';
import SadaqaCard from './sadaqaCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowSadaqasApi } from "../../redux/actions/sadaqa/sadaqaActions";
import { connect } from 'react-redux';
import Contact from './Contact';
import Quezaco from './Quezaco'
import Focus from './Focus'
import Regle from './Regle'
import Certificat from './Certificat'
import Actions from '../sadaqa/Actions';
const AppNavbar = ({ ShowSadaqasApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const sadaqas = useSelector(state => state.sadaqas);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeSadaqas = sadaqas.filter(sadaqa => sadaqa.isActive);
  const firstActiveSadaqa = activeSadaqas[0] || {};
console.log(sadaqas)
console.log(activeSadaqas)
  useEffect(() => {
    ShowSadaqasApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <SadaqaCard
        imageUrl={firstActiveSadaqa.imageUrl}
        description={firstActiveSadaqa.selectedClients?.[0]?.firstName}
        fonction={firstActiveSadaqa.fonction}
      />
    ),
    'Notre Plan': <PlanComponent />, // S'affiche au centre
    'Quezaco Sprint Sadaqa': <Quezaco/>,
    'Focus Sadaqa du moment' : <Focus/>,
    'Certificats de remerciement':  <Certificat/>,
    'Régles des Sprints-Sadaqa': <Regle/>,
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
      {showHeader && firstActiveSadaqa.title && firstActiveSadaqa.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveSadaqa.title} {firstActiveSadaqa.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralSadaqa onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveSadaqa.title && firstActiveSadaqa.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveSadaqa.title} {firstActiveSadaqa.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowSadaqasApi })(AppNavbar);