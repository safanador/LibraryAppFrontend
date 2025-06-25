import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const getBooks = () => api.get('/books');
export const getBook = (id) => api.get(`/books/${id}`);
export const createBook = (book) => api.post('/books', book);
export const updateBook = (id, book) => api.put(`/books/${id}`, book);
export const deleteBook = (id) => api.delete(`/books/${id}`);

export const getMagazines = () => api.get('/magazines');
export const getMagazine = (id) => api.get(`/magazines/${id}`);
export const createMagazine = (book) => api.post('/magazines', book);
export const updateMagazine = (id, book) => api.put(`/magazines/${id}`, book);
export const deleteMagazine = (id) => api.delete(`/magazines/${id}`);

export const getDvds = () => api.get('/dvds');
export const getDvd = (id) => api.get(`/dvds/${id}`);
export const createDvd = (book) => api.post('/dvds', book);
export const updateDvd = (id, book) => api.put(`/dvds/${id}`, book);
export const deleteDvd = (id) => api.delete(`/dvds/${id}`);

// Similar methods for magazines and DVDs