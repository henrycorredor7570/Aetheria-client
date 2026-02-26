import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Obtiene todos los destinos desde el backend
 */
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

/**
 * Busca destinos en el backend
 * @param {string} query - Término de búsqueda
 * @returns {Array} - Array de destinos que coinciden con la búsqueda
 * 
 * Ejemplo: searchDestinations("París") 
 * Busca en: nombre, descripción y país
 */

export const searchDestinations = async (query) => {
    try {
        // Si no hay query, retorna un array vacío
        if (!query || query.trim() === ""){
            return [];
        }

        // Realiza la solicitud GET al backend con el término de búsqueda
        const response = await axios.get(`${API_URL}/destinations`, {
            params: {
                search: query.trim() // Pasamos el término como parámetro
            }
        });

        return response.data;
    } catch (error){
        console.error("Error al buscar destinos", error);
        return [];
    }
};
