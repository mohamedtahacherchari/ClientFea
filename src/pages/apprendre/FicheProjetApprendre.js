import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowApprendresApi } from "../../redux/actions/apprendre/apprendreActions";

const FicheProjet = ({ ShowApprendresApi }) => {
  const token = useSelector(state => state.token);
  const apprendres = useSelector(state => state.apprendres);
  const [pdfContent, setPdfContent] = useState(null);

  const activeApprendres = apprendres.filter(apprendre => apprendre.isActive);
  const firstActiveApprendre = activeApprendres[0] || {};

  useEffect(() => {
    ShowApprendresApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveApprendre && firstActiveApprendre.pdfUrl) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveApprendre.pdfUrl);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveApprendre]);

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
export default connect(null, { ShowApprendresApi })(FicheProjet);
