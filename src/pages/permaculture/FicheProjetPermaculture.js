import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowPermaculturesApi } from "../../redux/actions/permaculture/permacultureActions";

const FicheProjet = ({ ShowPermaculturesApi }) => {
  const token = useSelector(state => state.token);
  const permacultures = useSelector(state => state.permacultures);
  const [pdfContent, setPdfContent] = useState(null);

  const activePermacultures = permacultures.filter(permaculture => permaculture.isActive);
  const firstActivePermaculture = activePermacultures[0] || {};

  useEffect(() => {
    ShowPermaculturesApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActivePermaculture && firstActivePermaculture.pdfUrl) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActivePermaculture.pdfUrl);
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
export default connect(null, { ShowPermaculturesApi })(FicheProjet);
