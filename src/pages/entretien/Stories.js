import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowEntretiensApi } from "../../redux/actions/entretien/entretienActions";

const FicheProjet = ({ ShowEntretiensApi }) => {
  const token = useSelector(state => state.token);
  const entretiens = useSelector(state => state.entretiens);
  const [pdfContent, setPdfContent] = useState(null);

  const activeEntretiens = entretiens.filter(entretien => entretien.isActive);
  const firstActiveEntretien = activeEntretiens[0] || {};

  useEffect(() => {
    ShowEntretiensApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveEntretien && firstActiveEntretien.pdfUrl2) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveEntretien.pdfUrl2);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveEntretien]);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {pdfContent && (
        <iframe
          title="PDF Viewer"
          src={`${pdfContent}`}
          style={{ width: '100vw', height: '100vh', border: 'none' }}
        />
      )}
    </div>
  );
};

//export default FicheProjet;
export default connect(null, { ShowEntretiensApi })(FicheProjet);
