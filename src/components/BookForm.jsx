import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, createBook, updateBook } from '../services/api';
import { TextField, Button, Container } from '@mui/material';

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        pageCount: 0,
        publicationDate: ''
    });

    useEffect(() => {
        if (id) {
            fetchBook();
        }
    }, [id]);

    const fetchBook = async () => {
        const response = await getBook(id);
        setBook(response.data);
    };

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateBook(id, book);
        } else {
            await createBook(book);
        }
        navigate('/books');
    };

    return (
        <Container>
            <h1>{id ? 'Edit Book' : 'Add New Book'}</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Author"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="ISBN"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Page Count"
                    name="pageCount"
                    type="number"
                    value={book.pageCount}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Publication Date"
                    name="publicationDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={book.publicationDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    {id ? 'Update' : 'Save'}
                </Button>
            </form>
        </Container>
    );
};

export default BookForm;