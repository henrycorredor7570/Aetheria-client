import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        return response.data;
    } catch(error){
        console.error("Error al registrar usuario.", error);
        throw error.response.data;
    }
};


export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión.", error);
        throw error.response.data;
    }
}