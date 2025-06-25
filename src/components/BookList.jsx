import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Table, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await getBooks();
        setBooks(response.data);
    };

    const handleDelete = async (id) => {
        await deleteBook(id);
        fetchBooks();
    };

    return (
        <Container>
            <h1>Libros</h1>
            <Button component={Link} to="/books/new" variant="contained" color="primary">
                Añadir nuevo libro
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>
                                <Button component={Link} to={`/books/${book.id}`} color="primary">
                                    Editar
                                </Button>
                                <Button onClick={() => handleDelete(book.id)} color="secondary">
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default BookList;