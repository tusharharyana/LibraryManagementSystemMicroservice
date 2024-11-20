import axios from "axios";

const API_URL = "http://localhost:8081/api/books";

export const getAllBooks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createBook = async (book) => {
    await axios.post(API_URL, book);
};

export const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateBook = async (bookId, updatedBook) => {
    try {
        const response = await axios.put(`${API_URL}/${bookId}`, updatedBook);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
    }
};

export const getBookById  = async (bookId) =>{
    try {
        const response = await axios.get(`${API_URL}/${bookId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book by ID:', error);
    }
};