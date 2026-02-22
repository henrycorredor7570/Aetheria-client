import React, { useState } from "react";

/**
 * SearchBar Component
 * -------------------
 * Maneja el input de búsqueda de destinos.
 */

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState("");

    //Maneja cambios en el imput
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    //Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!query.trim()) return;

        onSearch(query);//se envía al componente padre
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Buscar destinos..."
              value={query}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary ms-2">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;