import axios from 'axios';

const API_URL = "http://localhost:3000/";

export const getdestinations = () => {
    try {
        const response = await axios.get(API_URL)
    } catch (error) {
        console.error("Error al obtener los destinos", error);
        return [];
        
    }
}