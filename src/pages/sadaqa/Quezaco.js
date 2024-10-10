import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowSadaqasApi } from "../../redux/actions/sadaqa/sadaqaActions";
import { sadaqa } from '../../redux/Axios/sadaqa';
import { Typography } from '@mui/material';

const Quezaco = ({ ShowSadaqasApi }) => {
  const token = useSelector(state => state.token);
  const sadaqas = useSelector(state => state.sadaqas);
  const [pdfContent, setPdfContent] = useState(null);

  const activeSadaqas = sadaqas.filter(sadaqa => sadaqa.isActive);
  const firstActiveSadaqa = activeSadaqas[0] || {};


  function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  useEffect(() => {
    ShowSadaqasApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveSadaqa && firstActiveSadaqa.pdfUrl2) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveSadaqa.pdfUrl2);
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
    <div style={{ width: '50vw', height: '50vh', margin: 0, padding: 0 }}>
      {pdfContent && (
        <iframe
          title="PDF Viewer"
          src={`${pdfContent}`}
          style={{ width: '50vw', height: '50vh', border: 'none' }}
        />
      )}
    </div>
<h1>Retrouvez dans cette section tout ce qu'il faut savoir 
  sur la Sadaqa par FEA
</h1>
<Typography variant="body1">
<iframe
     width="800"
     height="400"
     src={`https://www.youtube.com/embed/${extractVideoID(firstActiveSadaqa.youtubeLink)}`}
     title="YouTube video player"
     frameBorder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowFullScreen
   ></iframe>
</Typography>
</div>
  );
};

//export default FicheProjet;
export default connect(null, { ShowSadaqasApi })(Quezaco);
