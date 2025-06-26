import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDvd, createDvd, updateDvd } from "../services/api";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format, parseISO } from "date-fns";

const DvdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dvd, setDvd] = useState({
    title: "",
    publicationDate: null,
    director: "",
    genre: "",
    duration: 0,
  });

  useEffect(() => {
    if (id) {
      fetchDvd();
    }
  }, [id]);

  const fetchDvd = async () => {
    try {
      const response = await getDvd(id);
      const dvdData = response.data;

      // Formatear la fecha usando date-fns
      const formattedDate = dvdData.publicationDate
        ? format(parseISO(dvdData.publicationDate.slice(0, 10)), "yyyy-MM-dd")
        : "";

      setDvd({
        ...dvdData,
        publicationDate: formattedDate,
      });
    } catch (error) {
      console.error("Error fetching DVD:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDvd({ ...dvd, [name]: value });
  };

  const handleDateChange = (date) => {
    setDvd({ ...dvd, publicationDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDvd(id, dvd);
      } else {
        await createDvd(dvd);
      }
      navigate("/dvds");
    } catch (error) {
      console.error("Error saving DVD:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar DVD" : "Añadir Nuevo DVD"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Título"
          name="title"
          value={dvd.title}
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
          value={dvd.publicationDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Director"
          name="director"
          value={dvd.director}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Género"
          name="genre"
          value={dvd.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Duración (minutos)"
          name="duration"
          type="number"
          value={dvd.duration}
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

export default DvdForm;
