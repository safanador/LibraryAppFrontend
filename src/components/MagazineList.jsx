import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMagazines, deleteMagazine } from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from '@mui/material';

const MagazineList = () => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const response = await getMagazines();
      setMagazines(response.data);
    } catch (error) {
      console.error("Error fetching magazines:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMagazine(id);
      fetchMagazines();
    } catch (error) {
      console.error("Error deleting magazine:", error);
    }
  };

  return (
    <Container>
      <h1>Revistas</h1>
      <Button component={Link} to="/magazines/new" variant="contained" color="primary" sx={{ mb: 3 }}>
        Añadir Nueva Revista
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Editorial</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {magazines.map((magazine) => (
              <TableRow key={magazine.id}>
                <TableCell>{magazine.title}</TableCell>
                <TableCell>{magazine.category}</TableCell>
                <TableCell>{magazine.issueNumber}</TableCell>
                <TableCell>{magazine.publisher}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/magazines/${magazine.id}`} color="primary" sx={{ mr: 1 }}>
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(magazine.id)} color="error">
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

export default MagazineList;