import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMagazine, createMagazine, updateMagazine } from "../services/api";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const MagazineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [magazine, setMagazine] = useState({
    title: "",
    publicationDate: null,
    category: "",
    issueNumber: 0,
    publisher: "",
  });

  useEffect(() => {
    if (id) {
      fetchMagazine();
    }
  }, [id]);

  const fetchMagazine = async () => {
    try {
      const response = await getMagazine(id);
      setMagazine(response.data);
    } catch (error) {
      console.error("Error fetching magazine:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMagazine({ ...magazine, [name]: value });
  };

  const handleDateChange = (date) => {
    setMagazine({ ...magazine, publicationDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateMagazine(id, magazine);
      } else {
        await createMagazine(magazine);
      }
      navigate("/magazines");
    } catch (error) {
      console.error("Error saving magazine:", error);
    }
  };

  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          {id ? "Editar Revista" : "Añadir Nueva Revista"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Título"
            name="title"
            value={magazine.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <DatePicker
            label="Fecha de Publicación"
            value={magazine.publicationDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />

          <TextField
            label="Categoría"
            name="category"
            value={magazine.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Número de Edición"
            name="issueNumber"
            type="number"
            value={magazine.issueNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Editorial"
            name="publisher"
            value={magazine.publisher}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            {id ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </Container>
  );
};

export default MagazineForm;
