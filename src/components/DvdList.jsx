import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDvds, deleteDvd } from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from '@mui/material';

const DvdList = () => {
  const [dvds, setDvds] = useState([]);

  useEffect(() => {
    fetchDvds();
  }, []);

  const fetchDvds = async () => {
    try {
      const response = await getDvds();
      setDvds(response.data);
    } catch (error) {
      console.error("Error fetching DVDs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDvd(id);
      fetchDvds();
    } catch (error) {
      console.error("Error deleting DVD:", error);
    }
  };

  return (
    <Container>
      <h1>DVDs</h1>
      <Button component={Link} to="/dvds/new" variant="contained" color="primary" sx={{ mb: 3 }}>
        Añadir Nuevo DVD
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Duración (min)</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dvds.map((dvd) => (
              <TableRow key={dvd.id}>
                <TableCell>{dvd.title}</TableCell>
                <TableCell>{dvd.director}</TableCell>
                <TableCell>{dvd.genre}</TableCell>
                <TableCell>{dvd.duration}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/dvds/${dvd.id}`} color="primary" sx={{ mr: 1 }}>
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(dvd.id)} color="error">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DvdList;