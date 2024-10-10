import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowAudiovisuelsApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { Typography } from '@mui/material';

const Video2 = ({ ShowAudiovisuelsApi }) => {
  const token = useSelector(state => state.token);
  const audiovisuels = useSelector(state => state.audiovisuels);
 // const [pdfContent, setPdfContent] = useState(null);

  const activeAudiovisuels = audiovisuels.filter(audiovisuel => audiovisuel.isActive);
  const firstActiveAudiovisuel = activeAudiovisuels[0] || {};

  useEffect(() => {
    ShowAudiovisuelsApi(token);
  }, [token]);
console.log(firstActiveAudiovisuel.googleDriveVideoUrl)


  return (
    
        <Typography variant="body1">
          La vidéo :
          <video controls style={{ width: '100%' }}>
            <source src={firstActiveAudiovisuel.googleDriveVideoUrl2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Typography>
    
    
  );
};

//export default FicheProjet;
export default connect(null, { ShowAudiovisuelsApi })(Video2);