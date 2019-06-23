import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <h1>Audio Player</h1>
    </Toolbar>
  </AppBar>
);

export default Header;
