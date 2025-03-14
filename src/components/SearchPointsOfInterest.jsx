import React, { useState, useEffect } from "react";
import { getPointsOfInterestByDestination } from "../services/destinationService";
const SearchPointsOfInterest = ({ destinationId, onResults }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const[filterType, setFilterType] = useState("");
    const [points, setPoints ] = useState([]);

    useEffect(()=>{
        const fetchPoints = async () => {
            try {
                const response = await getPointsOfInterestByDestination(destinationId);
                setPoints(response.data);
                onResults(response.data);
            } catch (error) {
                console.error("error fetching points of interest: ", error);
            }
        };
        fetchPoints();
    },[destinationId, onResults]);

    const handleSearch = (event) =>{
        const value = event.target.value;
        setSearchTerm(value);
        filterResults(value, filterType);
    }

    const handleFilterChange = () =>{
        const value = event.target.value;
        setFilterType(value);
        filterResults(searchTerm, value);
    }

    const filterResults = (search, type) => {
        let filtered = points;
        if(search) {
            filtered = filtered.filter((point) => 
                point.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if(type) {
            filtered = filtered.filter((point) => point.type === type);
        }
        onResults(filtered);
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar punto de interés."
                value={searchTerm}
                onChange={handleSearch}
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