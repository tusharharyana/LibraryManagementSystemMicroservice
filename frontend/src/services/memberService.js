import axios from "axios";

const API_URL = "http://localhost:8081/api/members";

export const getAllMembers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getMemberById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createMember = async (member) => {
    await axios.post(API_URL, member);
};

export const updateMember = async (id, updatedMember) => {
    await axios.put(`${API_URL}/${id}`, updatedMember);
};

export const deleteMember = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
