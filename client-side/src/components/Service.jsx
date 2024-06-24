import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
export const getList = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lists:', error);
        throw error;
    }
};

export const createList = async (listData) => {
    try {
        const response = await axios.post(`${API_URL}/list`, listData);
        return response.data;
    } catch (error) {
        console.error('Error creating list:', error);
        throw error;
    }
};

export const deleteListById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/list/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting list:', error);
        throw error;
    }
};

export const deleteListByName = async (name) => {
    try {
        const response = await axios.delete(`${API_URL}/lists/name/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting list by name:', error);
        throw error;
    }
};
