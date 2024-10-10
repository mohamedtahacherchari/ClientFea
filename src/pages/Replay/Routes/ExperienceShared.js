import React from 'react';
import { Typography, Link, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
//import GoogleDrivePdfViewer from '../../info/GoogleDrivePdfViewer ';
import AtefImage from '../../../image/experienceShared.PNG';

const ExperienceShared = () => {
   // const fileId = '10-m25387jaiJOSAb389wjxhOfwYDcIh4';

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <img src={AtefImage} alt="Présentation FEA" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">Séminaire FEA(21 à 50 min)</Typography>
        <Typography variant="body1">
          <EventIcon /> Date de l'intervention: 13 juin 2020
        </Typography>
        <Typography variant="body1">Intervenant: Nidal</Typography>
        <Typography variant="body1">
          <Link href="https://drive.google.com/file/d/1oy4BkGtS15ZXw4bZhxDLbIdUXY4AODhj/view" target="_blank">Lien vers la vidéo</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ExperienceShared;
