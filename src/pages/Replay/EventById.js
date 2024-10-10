import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowEventsApi } from "../../redux/actions/event";
import { PDFViewer, Document, Page } from '@react-pdf/renderer';

const EventById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const events = useSelector(state => state.events);
  const event = events && events.find(event => event.id === id);
  const [pdfContent, setPdfContent] = useState(null);
console.log(pdfContent,"hello Taha ")

  useEffect(() => {
    dispatch(ShowEventsApi(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (event && event.pdfUrl) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(event.pdfUrl);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [event]);

  if (!event) {
    return <Typography variant="h6">Événement non trouvé</Typography>;
  }

  const eventDate = new Date(event.start);
  const heure = eventDate.getHours();
  const minute = eventDate.getMinutes();
  const ampm = heure >= 12 ? 'PM' : 'AM';
  const heure12h = heure % 12 || 12;

  function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }


  return (
    <Grid container spacing={2} alignItems="center">
      {event.imageUrl && (
        <Grid item xs={12}>
          <img src={event.imageUrl} alt={event.title} style={{ width: '100%' }} />
        </Grid>
      )}
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">{event.title}</Typography>
        <Typography variant="body1">
          <EventIcon /> Date de l'intervention: {eventDate.toLocaleDateString()} {heure12h}:{minute < 10 ? '0' + minute : minute} {ampm}
        </Typography>
        <div>Les intervenants: 
      {event.selectedClients.map(client => (
        <div key={client._id}>
          <Typography variant="body1">{`${client.firstName} ${client.lastName}`} </Typography>
        </div>
      ))}
    </div>
        {event.googleDriveVideoUrl && (
          <Typography variant="body1">
            La vidéo :
            <video controls style={{ width: '100%' }}>
              <source src={event.googleDriveVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Typography>
        )}
         {event.youtubeLink && event.youtubeLink.trim() !== "" && (
          <Typography variant="body1">
            La vidéo sur YouTube"
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${extractVideoID(event.youtubeLink)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Typography>
        )}
        {pdfContent && (
          <Typography variant="body1">
            Le plan 
            <div style={{width: '100%', height: '500px', overflow: 'auto' }}>
              <iframe
                title="PDF Viewer"
                src={`${pdfContent}`}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </Typography>
        )}
        
      </Grid>
    </Grid>
  );
}

export default EventById;
