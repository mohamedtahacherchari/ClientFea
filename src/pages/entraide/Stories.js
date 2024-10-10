import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowEntraidesApi } from "../../redux/actions/entraide/entraideActions";

const FicheProjet = ({ ShowEntraidesApi }) => {
  const token = useSelector(state => state.token);
  const entraides = useSelector(state => state.entraides);
  const [pdfContent, setPdfContent] = useState(null);

  const activeEntraides = entraides.filter(entraide => entraide.isActive);
  const firstActiveEntraide = activeEntraides[0] || {};

  useEffect(() => {
    ShowEntraidesApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveEntraide && firstActiveEntraide.pdfUrl2) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveEntraide.pdfUrl2);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveEntraide]);

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
export default connect(null, { ShowEntraidesApi })(FicheProjet);
