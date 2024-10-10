import React from 'react';
import { Typography, Link, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

import AtefImage from '../../../image/sadaqa.png';

const Sadaqa = () => {

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <img src={AtefImage} alt="Présentation FEA" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">Présentation FEA</Typography>
        <Typography variant="body1">
          <EventIcon /> Date de l'intervention: 24 juin 2020
        </Typography>
        <Typography variant="body1">
        Intervenant: Kamel & Aziza & Yassine & Hajer
        
        </Typography>
     
        <Typography variant="body1">
          <Link href="https://drive.google.com/file/d/12LlXQiHeiRfeLy57P1LsFT2dYzRtbJHi/view?usp=drive_link" target="_blank">Lien vers les documents</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Sadaqa;
