import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getDestinations = async () => {
    try {
        const response = await axios.get(`${API_URL}/destinations`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los destinos", error);
        return [];
        
    }
}

export const getDestinationById = async(id) => {
    try {
        const response = await axios.get(`${API_URL}/destinations/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener destino",error);
        return [];
        
    }
}

export const getPointsOfInterestByDestination = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/pointsofinterest/destination/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el punto de interes", error);
        return [];
    }
}
