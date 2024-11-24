import axios from "axios";

const API_URL = "http://localhost:8081/api/borrows";

export const getAllBorrows = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getBorrowById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createBorrow = async (borrowRequest) => {
    const response = await axios.post(API_URL, borrowRequest);
    return response.data;
};

export const markAsLost = async (id) => {
    const response = await axios.put(`${API_URL}/${id}/mark-as-lost`);
    return response.data;
};

export const returnBook = async (id) => {
    const response = await axios.put(`${API_URL}/${id}/return`);
    return response.data;
};

export const deleteBorrow = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
