import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowInfosApi } from "../../redux/actions/info";

const InfoById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const infos = useSelector(state => state.infos);
  const info = infos && infos.find(info => info.id === id);
  const [pdfContent, setPdfContent] = useState(null);

  useEffect(() => {
    dispatch(ShowInfosApi(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (info && info.pdfUrl) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(info.pdfUrl);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [info]);

  if (!info) {
    return <Typography variant="h6">Information non trouvée</Typography>;
  }

  const infoDate = new Date(info.start);
  const formattedDate = `${infoDate.toLocaleDateString()} ${infoDate.getHours() % 12 || 12}:${infoDate.getMinutes().toString().padStart(2, '0')} ${infoDate.getHours() >= 12 ? 'PM' : 'AM'}`;

  function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <h1>{info.describe}</h1>
      {info.imageUrl && (
        <Grid item xs={12}>
          <img src={info.imageUrl} alt={info.title} style={{ width: '100%' }} />
        </Grid>
      )}
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">{info.title}</Typography>
      { /* <Typography variant="body1">
          <EventIcon /> Date de l'intervention: {formattedDate}
        </Typography>}
        {/*<Typography variant="body1">Intervenant: {info.presenter}</Typography>*/}
        {info.googleDriveVideoUrl && (
          <Typography variant="body1">
            La vidéo :
            <video controls style={{ width: '100%' }}>
              <source src={info.googleDriveVideoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
          </Typography>
        )}
        {pdfContent && (
          <Typography variant="body1">
            PDF :
            <div style={{ width: '1000px', height: '1000px', overflow: 'auto' }}>
              <iframe
                title="PDF Viewer"
                src={pdfContent}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </Typography>
        )}
        {info.youtubeLink && info.youtubeLink.trim() !== "" && (
          <Typography variant="body1">
            La vidéo :
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${extractVideoID(info.youtubeLink)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default InfoById;
