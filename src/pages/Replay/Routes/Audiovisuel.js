import React from 'react';
import { Typography, Link, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AtefImage from '../../../image/Audiovisuel.png';
//import GoogleDrivePdfViewer from '../../info/GoogleDrivePdfViewer ';


const Audiovisuel = () => {
   // const fileId = '10-m25387jaiJOSAb389wjxhOfwYDcIh4';

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <img src={AtefImage} alt="Présentation FEA" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">Présentation FEA</Typography>
        <Typography variant="body1">
          <EventIcon /> Date de l'intervention: 21 juin 2020
        </Typography>
        <Typography variant="body1">Intervenant: Adlene</Typography>
        <Typography variant="body1">
          <Link href="https://drive.google.com/file/d/1Sx5-VLsrAA2amSR0I_u9sCsUbafdqZEN/view?usp=sharing" target="_blank">Lien vers la vidéo</Link>
        </Typography>
        <Typography variant="body1">
          <Link href="https://drive.google.com/file/d/1YzFJKV0RX8biXSTxLQl_fT16_N25Frec/view?usp=drive_link" target="_blank">Lien vers les documents</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Audiovisuel;
