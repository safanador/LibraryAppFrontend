import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Biblioteca
        </Typography>
        <Button color="inherit" component={Link} to="/books">Libros</Button>
        <Button color="inherit" component={Link} to="/magazines">Revistas</Button>
        <Button color="inherit" component={Link} to="/dvds">DVDs</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;