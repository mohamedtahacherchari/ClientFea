import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowAudiovisuelsApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";

const FicheProjet = ({ ShowAudiovisuelsApi }) => {
  const token = useSelector(state => state.token);
  const audiovisuels = useSelector(state => state.audiovisuels);
  const [pdfContent, setPdfContent] = useState(null);

  const activeAudiovisuels = audiovisuels.filter(audiovisuel => audiovisuel.isActive);
  const firstActiveAudiovisuel = activeAudiovisuels[0] || {};

  useEffect(() => {
    ShowAudiovisuelsApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveAudiovisuel && firstActiveAudiovisuel.pdfUrl) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveAudiovisuel.pdfUrl);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveAudiovisuel]);

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
export default connect(null, { ShowAudiovisuelsApi })(FicheProjet);
