import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowInvestirsApi } from "../../redux/actions/investir/investirActions";

const FicheProjet = ({ ShowInvestirsApi }) => {
  const token = useSelector(state => state.token);
  const investirs = useSelector(state => state.investirs);
  const [pdfContent, setPdfContent] = useState(null);

  const activeInvestirs = investirs.filter(investir => investir.isActive);
  const firstActiveInvestir = activeInvestirs[0] || {};

  useEffect(() => {
    ShowInvestirsApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveInvestir && firstActiveInvestir.pdfUrl) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveInvestir.pdfUrl);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveInvestir]);

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
export default connect(null, { ShowInvestirsApi })(FicheProjet);
