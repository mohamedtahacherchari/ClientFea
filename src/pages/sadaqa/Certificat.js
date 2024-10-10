import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowSadaqasApi } from "../../redux/actions/sadaqa/sadaqaActions";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Certificat = ({ ShowSadaqasApi ,description}) => {
  const token = useSelector(state => state.token);
  const sadaqas = useSelector(state => state.sadaqas);
  const [pdfContent, setPdfContent] = useState(null);

  const activeSadaqas = sadaqas.filter(sadaqa => sadaqa.isActive);
  const firstActiveSadaqa = activeSadaqas[0] || {};

  useEffect(() => {
    ShowSadaqasApi(token);
  }, [token]);
  const navigate = useNavigate(); // Utilisation de navigate

  useEffect(() => {
    if (firstActiveSadaqa && firstActiveSadaqa.pdfUrl3) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveSadaqa.pdfUrl3);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveSadaqa]);

  return (
  <div>

    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {pdfContent && (
        <iframe
          title="PDF Viewer"
          src={`${pdfContent}`}
          style={{ width: '100vw', height: '100vh', border: 'none' }}
        />
      )}
    </div>
    </div>
  );
};

//export default FicheProjet;
export default connect(null, { ShowSadaqasApi })(Certificat);