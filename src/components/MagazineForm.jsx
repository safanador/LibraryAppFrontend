import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMagazine, createMagazine, updateMagazine } from "../services/api";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { format, parseISO } from "date-fns";

const MagazineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [magazine, setMagazine] = useState({
    title: "",
    publicationDate: new Date(),
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

      const magazineData = response.data;

      // Formatear la fecha usando date-fns
      const formattedDate = magazineData.publicationDate
        ? format(parseISO(magazineData.publicationDate.slice(0, 10)), "yyyy-MM-dd")
        : "";

      setMagazine({
        ...magazineData,
        publicationDate: formattedDate,
      });
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

        <TextField
          label="Fecha de Publicación"
          name="publicationDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={magazine.publicationDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
