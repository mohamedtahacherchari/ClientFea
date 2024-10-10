import React, { useState, useEffect } from 'react';
import NavbarLateral from './NavbarLateral';
import AudiovisualCard from './AudiovisualCard';
import PlanComponent from './PlanComponent';
import { useSelector } from 'react-redux';
import { ShowAudiovisuelsApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { connect } from 'react-redux';
import MontageVideo from './MontageVideo';
import Patenaires from './Patenaires';
import SoumettreVideo from './SoumettreVideo';
import Contact from './Contact';

const AppNavbar = ({ ShowAudiovisuelsApi }) => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const audiovisuels = useSelector(state => state.audiovisuels);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showFooter, setShowFooter] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const activeAudiovisuels = audiovisuels.filter(audiovisuel => audiovisuel.isActive);
  const firstActiveAudiovisuel = activeAudiovisuels[0] || {};
console.log(activeAudiovisuels)
  useEffect(() => {
    ShowAudiovisuelsApi(token);
  }, [token]);

  const contentData = {
    'Équipe': (
      <AudiovisualCard
        imageUrl={firstActiveAudiovisuel.imageUrl}
        description={firstActiveAudiovisuel.selectedClients?.[0]?.firstName}
        fonction={firstActiveAudiovisuel.fonction}
      />
    ),
    'Notre Plan ': <PlanComponent />, // S'affiche au centre
    'Initiation au montage vidéo': (
      <MontageVideo
      />
    ), 
    'Nos partenaires': (
      <Patenaires/>
    ), 
    'Soumettre votre propre vidéo' :(
      <SoumettreVideo/>
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
      {showHeader && firstActiveAudiovisuel.title && firstActiveAudiovisuel.selectedClients?.[0]?.firstName && (
        <div style={{ textAlign: 'center', padding: '1px', backgroundColor: '#f1f1f1' }}>
          {firstActiveAudiovisuel.title} {firstActiveAudiovisuel.selectedClients[0].firstName}
        </div>
      )}

      <div style={{ flexGrow: 1, display: 'flex', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
        <NavbarLateral onMenuItemClick={handleMenuClick} />
        {/* Affichage centralisé */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}> {/* Ajuste le marginTop ici */}
          {selectedContent}
        </div>
      </div>

      {/* Affichage du footer (uniquement si "Équipe" est sélectionné) */}
      {showFooter && firstActiveAudiovisuel.title && firstActiveAudiovisuel.selectedClients?.[0]?.firstName && (
        <div style={{ 
          position: 'fixed',  // Fixer l'élément à un endroit précis
          bottom: '60px',     // Ajustez cette valeur pour le déplacer un peu vers le haut
          width: '100%',      // Prendre toute la largeur de l'écran
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f1f1f1', 
          zIndex: 1000        // Assurer que l'élément soit au-dessus des autres éléments
        }}>
          {firstActiveAudiovisuel.title} {firstActiveAudiovisuel.selectedClients[0].firstName}
        </div>
      )}
    </div>
  );
};

export default connect(null, { ShowAudiovisuelsApi })(AppNavbar);