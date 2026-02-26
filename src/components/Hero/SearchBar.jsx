import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDestinations } from "../../services/destinationService.js";

/**
 * SearchBar Component
 * -------------------
 * Maneja el input de búsqueda de destinos.
 * 
 * * Flujo:
 * 1. Usuario escribe en el input
 * 2. Al hacer click en "Buscar", se llama a la API
 * 3. Se redirige a /destinations con los resultados
 */

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook para redirigir

    /**
     * Maneja cambios en el input
     * @param {Event} e - Evento del input
     */
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    /**
     * Maneja el envío del formulario
     * 1. Valida que no esté vacío
     * 2. Busca los destinos en el backend
     * 3. Redirige a /destinations pasando los resultados
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!query.trim()) {
            alert("Por favor ingresa un término de búsqueda");
            return;
        }

        try {
            setLoading(true);

            // Llamamos al servicio de búsqueda
            const results = await searchDestinations(query);

            // Si hay resultados, redirigimos a /destinations
            // Pasamos el término de búsqueda como parámetro en la URL
            navigate(`/destinations?search=${encodeURIComponent(query)}`, {
                state: { searchResults: results} // Pasamos los resultados en el estado
            });

            // Ejecutamos la función padre si existe
            if(onSearch) {
                onSearch(query);
            }

            //Limpiamos el input
            setQuery("");
        } catch(error) {
            console.error("Error en la búsqueda: ", error);
            alert("Error al buscar. intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Buscar destinos..."
              value={query}
              onChange={handleChange}
              disabled={loading} //deshabilitamos mientras se carga
            />
            <button 
                type="submit" 
                className="btn btn-primary ms-2"
                disabled={loading} //deshabilitamos mientras se carga
            >
                {loading ? "Buscando..." : "Buscar"}
            </button>
        </form>
    );
};

export default SearchBar;