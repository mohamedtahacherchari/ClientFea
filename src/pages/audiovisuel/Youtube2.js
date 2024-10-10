import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowAudiovisuelsApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { Typography } from '@mui/material';

const Youtube2 = ({ ShowAudiovisuelsApi }) => {
  const token = useSelector(state => state.token);
  const audiovisuels = useSelector(state => state.audiovisuels);
 // const [pdfContent, setPdfContent] = useState(null);

  const activeAudiovisuels = audiovisuels.filter(audiovisuel => audiovisuel.isActive);
  const firstActiveAudiovisuel = activeAudiovisuels[0] || {};

  function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  useEffect(() => {
    ShowAudiovisuelsApi(token);
  }, [token]);
console.log(firstActiveAudiovisuel.googleDriveVideoUrl)


  return (
    
        <Typography variant="body1">
         <iframe
              width="1200"
              height="1200"
              src={`https://www.youtube.com/embed/${extractVideoID(firstActiveAudiovisuel.youtubeLink2)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        </Typography>
    
    
  );
};

//export default FicheProjet;
export default connect(null, { ShowAudiovisuelsApi })(Youtube2);