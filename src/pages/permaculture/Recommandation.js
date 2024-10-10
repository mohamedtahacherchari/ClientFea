import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowPermaculturesApi } from "../../redux/actions/permaculture/permacultureActions";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FicheProjet = ({ ShowPermaculturesApi ,description}) => {
  const token = useSelector(state => state.token);
  const permacultures = useSelector(state => state.permacultures);
  const [pdfContent, setPdfContent] = useState(null);

  const activePermacultures = permacultures.filter(permaculture => permaculture.isActive);
  const firstActivePermaculture = activePermacultures[0] || {};

  useEffect(() => {
    ShowPermaculturesApi(token);
  }, [token]);
  const navigate = useNavigate(); // Utilisation de navigate

  useEffect(() => {
    if (firstActivePermaculture && firstActivePermaculture.pdfUrl2) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActivePermaculture.pdfUrl2);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActivePermaculture]);

  return (
  <div>
    <div style={{ marginTop: '20px' }}>
        {/* Utilisation de navigate au lieu des liens externes */}
        
        <a
onClick={() => window.location.href = 'https://drive.google.com/'}

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
  Retrouver ici le drive de {description} rassemblant une mine d'or d'information sur la
  permaculture .Bonne balade !
</a>


      </div>
    <div style={{ width: '50vw', height: '50vh', margin: 0, padding: 0 }}>
      {pdfContent && (
        <iframe
          title="PDF Viewer"
          src={`${pdfContent}`}
          style={{ width: '50vw', height: '50vh', border: 'none' }}
        />
      )}
    </div>
    </div>
  );
};

//export default FicheProjet;
export default connect(null, { ShowPermaculturesApi })(FicheProjet);