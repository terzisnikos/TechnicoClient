import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={Link} to="/owners">Owners</Button>
      <Button color="inherit" component={Link} to="/property-items">Property Items</Button>
      <Button color="inherit" component={Link} to="/repairs">Repairs</Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
