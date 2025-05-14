import React, { useState, useEffect } from "react";
import { getPointsOfInterestByDestination } from "../services/destinationService";
const SearchPointsOfInterest = ({ destinationId, onResults }) => { //onResults: Función que se ejecuta cuando se obtienen los resultados y se los pasa al componente padre.
    const [searchTerm, setSearchTerm] = useState(""); //Almacena el término de búsqueda ingresado por el usuario.
    const [filterType, setFilterType] = useState(""); //Guarda el tipo de filtro seleccionado (Ej: Monumento, Museo, Parque).
    const [points, setPoints] = useState([]); //Guarda la lista de puntos de interés obtenidos desde el backend.

    useEffect(() => {
    const fetchPoints = async () => {
        try {
            const response = await getPointsOfInterestByDestination(destinationId);
            setPoints(response);
            onResults(response); //Ejecuta para pasar los resultados al componente padre.
        } catch (error) {
            console.error("Error fetching points of interest:", error);
        }
    };

    fetchPoints();
    }, [destinationId, onResults]);

    //Manejo del Input de Búsqueda
    //Esta función se ejecuta cuando el usuario escribe en el input de búsqueda.
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        filterResults(value, filterType);
    };

    //Manejo del Selector de Filtro
    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterType(value);
        filterResults(searchTerm, value);
    };

    //Filtrado de Resultados
    const filterResults = (search, type) => {
        let filtered = points;
        //Si hay un término de búsqueda (search) → Filtra los puntos cuyo nombre (point.name) 
        //contenga el texto ingresado (ignorando mayúsculas/minúsculas).
        if (search) {
            filtered = filtered.filter((point) => point.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (type) {
            filtered = filtered.filter((point) => point.type === type);
        }
        onResults(filtered); //Finalmente, se ejecuta onResults(filtered) para actualizar los resultados en el componente padre.
    };

    //Renderizado del Componente
    return (
        <div className="mb-3">
            <input 
                type="text" className="form-control" placeholder="Buscar punto de interés..." value={searchTerm} onChange={handleSearch}
            />
            <select className="form-select mt-2" value={filterType} onChange={handleFilterChange}>
                <option value="">Todos los tipos</option>
                <option value="Monumento">Monumento</option>
                <option value="Museo">Museo</option>
                <option value="Parque">Parque</option>
            </select>
        </div> 
    );
};

export default SearchPointsOfInterest;
    

