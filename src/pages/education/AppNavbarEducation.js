import React, { useState, useEffect } from 'react';
import NavbarLateralEducation from './NavbarLateralEducation';
import EducationCard from './EducationCard';
import PlanComponent from './planComponent';
import { useSelector } from 'react-redux';
import { ShowEducationsApi } from "../../redux/actions/education/educationsAction";
import { connect } from 'react-redux';
import Contact from './Contact';
import Actions from './Actions';


const AppNavbar = ({ ShowEducationsApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const educations = useSelector(state => state.educations);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeEducations = educations.filter(education => education.isActive);
  const firstActiveEducation = activeEducations[0] || {};
console.log(activeEducations)
  useEffect(() => {
    ShowEducationsApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <EducationCard
        imageUrl={firstActiveEducation.imageUrl}
        description={firstActiveEducation.selectedClients?.[0]?.firstName}
        fonction={firstActiveEducation.fonction}
      />
    ),
    'Notre Plan ': <PlanComponent />, // S'affiche au centre
    'Actions': (
      <Actions
      />
    ), 
    'Contact':(
     <Contact/>
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
      {showHeader && firstActiveEducation.title && firstActiveEducation.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveEducation.title} {firstActiveEducation.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateralEducation onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveEducation.title && firstActiveEducation.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveEducation.title} {firstActiveEducation.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowEducationsApi })(AppNavbar);