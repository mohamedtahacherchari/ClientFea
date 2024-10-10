import React from 'react';
import { Typography, Link, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AtefImage from '../../../image/PresentationCISante.png';
//import GoogleDrivePdfViewer from '../../info/GoogleDrivePdfViewer ';


const Sante = () => {
   // const fileId = '10-m25387jaiJOSAb389wjxhOfwYDcIh4';

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <img src={AtefImage} alt="Présentation FEA" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">Présentation FEA</Typography>
        <Typography variant="body1">
          <EventIcon /> Date de l'intervention: 25 juin 2020
        </Typography>
        <Typography variant="body1">Intervenant: Khalid & Hanna</Typography>
        <Typography variant="body1">
          <Link href="https://drive.google.com/file/d/1C6OeegmMeyyBa4PKS8BAPmxFNDe_PbI7/view?usp=drive_link" target="_blank">Lien vers la vidéo</Link>
        </Typography>
        <Typography variant="body1">
          <Link href="#" target="_blank">Lien vers l'audio</Link>
        </Typography>
        <Typography variant="body1">
          <Link href="https://drive.google.com/file/d/10-m25387jaiJOSAb389wjxhOfwYDcIh4/view?usp=drive_link" target="_blank">Lien vers les documents</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Sante;
