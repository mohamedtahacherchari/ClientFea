import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowAudiovisuelsApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";
import './Partenaires.css'; // Assure-toi que le chemin d'importation est correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Partenaires = ({ ShowAudiovisuelsApi }) => {
  const token = useSelector(state => state.token);
  const audiovisuel = useSelector(state => state.audiovisuels);
  const [pdfContent, setPdfContent] = useState(null);

  const activeAudiovisuels = audiovisuel.filter(audiovisuel => audiovisuel.isActive);
  const firstActiveAudiovisuel = activeAudiovisuels[0] || {};
  const navigate = useNavigate(); // Utilisation de navigate

  useEffect(() => {
    ShowAudiovisuelsApi(token);
  }, [token]);

  return (
    <div className="container">
      {firstActiveAudiovisuel.describe2}
      <a
  onClick={() => navigate('/Youtube1')}
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
 {firstActiveAudiovisuel.youtubeTitre}
</a>
<a
  onClick={() => navigate('/Youtube2')}
  style={{ 
    display: 'block', 
    cursor: 'pointer',
    color: '#007bff',
    textDecoration: 'none'
  }}
  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
>
  {firstActiveAudiovisuel.youtubeTitre2}
</a>
    </div>
  );
};

export default connect(null, { ShowAudiovisuelsApi })(Partenaires);
