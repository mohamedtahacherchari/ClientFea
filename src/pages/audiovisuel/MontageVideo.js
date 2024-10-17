import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import montage from './montage.jpg';
import { ShowAudiovisuelsApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MontageVideo = ({ alt, style, ShowAudiovisuelsApi }) => {
  const token = useSelector(state => state.token);
  const audiovisuels = useSelector(state => state.audiovisuels);
  const activeAudiovisuels = audiovisuels.filter(audiovisuel => audiovisuel.isActive);
  const firstActiveAudiovisuel = activeAudiovisuels[0] || {};
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigate = useNavigate(); // Utilisation de navigate

  useEffect(() => {
    ShowAudiovisuelsApi(token);
  }, [token]);

  return (
    <div style={{ marginBottom: '200px' }}>
      <img
        ref={ref}
        src={montage}
        alt={alt}
        style={{
          width: '1000px', // Augmentation de la largeur
          height: 'auto', // Ajustement automatique de la hauteur pour respecter les proportions
          ...style,
          transform: inView ? 'translateY(0)' : 'translateY(200px)',
          opacity: inView ? 1 : 0,
          transition: 'all 0.6s ease-in-out',
        }}
      />
      <div style={{ marginTop: '20px' }}>
        {/* Utilisation de navigate au lieu des liens externes */}
        <p>{firstActiveAudiovisuel.describe}</p>
        <a
  onClick={() => navigate('/inv/Video1')}
  style={{ 
    display: 'block', 
    marginBottom: 'px',
    cursor: 'pointer', // Changer le curseur pour indiquer que c'est cliquable
    color: '#007bff', // Couleur bleue par défaut pour les liens
    textDecoration: 'none' // Enlever le soulignement
  }}
  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
>
  Initiation au montage vidéo - Partie 1
</a>
<a
  onClick={() => navigate('/inv/Video2')}
  style={{ 
    display: 'block', 
    cursor: 'pointer',
    color: '#007bff',
    textDecoration: 'none'
  }}
  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
>
  Initiation au montage vidéo - Partie 2
</a>

      </div>
    </div>
  );
};

export default connect(null, { ShowAudiovisuelsApi })(MontageVideo);