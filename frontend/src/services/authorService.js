import axios from "axios";

const API_URL = "http://localhost:8081/api/authors";

export const getAllAuthors = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createAuthor = async (author) => {
    await axios.post(API_URL, author);
};

export const getAuthorById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const deleteAuthor = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateAuthor = async (id, updatedAuthor) => {
    await axios.put(`${API_URL}/${id}`, updatedAuthor);
};

export const getAuthorsByIds = async (authorIds) => {
    try {
        const response = await axios.get(API_URL, {
            params: { ids: authorIds }
        });
        console.log("Authors fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching authors", error);
        return [];
    }
};
