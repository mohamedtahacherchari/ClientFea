import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowVoyagesApi } from "../../redux/actions/voyage/voyageActions";
import { voyage } from '../../redux/Axios/voyage';
import { Typography } from '@mui/material';

const LesDouzePays = ({ ShowVoyagesApi }) => {
  const token = useSelector(state => state.token);
  const voyages = useSelector(state => state.voyages);
  const [pdfContent, setPdfContent] = useState(null);

  const activeVoyages = voyages.filter(voyage => voyage.isActive);
  const firstActiveVoyage = activeVoyages[0] || {};


  function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  useEffect(() => {
    ShowVoyagesApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveVoyage && firstActiveVoyage.pdfUrl2) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveVoyage.pdfUrl2);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveVoyage]);

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
export default connect(null, { ShowVoyagesApi })(LesDouzePays);
