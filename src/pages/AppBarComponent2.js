import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function AppBarComponent2({handleDrawerOpen, pageTitle}) {
  return (
    <AppBar position="">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h6" component="div">
            {/* Titre peut être passé en tant que props */}
            {pageTitle}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent2;
