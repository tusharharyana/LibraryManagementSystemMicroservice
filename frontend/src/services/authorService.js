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
        const authors = await Promise.all(
            authorIds.map(async (id) => {
                const response = await axios.get(`${API_URL}/${id}`);
                return response.data;
            })
        );
        console.log("Authors fetched:", authors);
        return authors;
    } catch (error) {
        console.error("Error fetching authors", error);
        return [];
    }
};

