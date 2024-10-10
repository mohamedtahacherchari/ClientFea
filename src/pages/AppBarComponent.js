// AppBarComponent.jsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function AppBarComponent({handleDrawerOpen, pageTitle}) {
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Titre peut être passé en tant que props */}
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
