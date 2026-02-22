import React from "react";
import SearchBar from "./SearchBar";
import "./Hero.css";

/**
 * Hero Component
 * --------------
 * Sección principal de la home.
 * Contiene:
 * - Título
 * - Descripción
 * - Buscador
 */

const Hero = () => {
    //Funcion que rebibe la busqueda
    const handleSearch = (query) => {
        console.log("Buscando:", query);

    // 🔥 Luego aquí conectaremos con backend (API)
    // ejemplo futuro:
    // navigate(`/destinations?search=${query}`);
    };

    return(
        <div className="hero-container">
            <div className="hero-overlay">
                <h1>Explora el mundo antes de viajar 🌍</h1>
                <p>
                    Descubre destinos en realidad aumentada, explora puntos de interés
                    y vive experiencias inmersivas.
                </p>
                {/*Buscador*/}
                <SearchBar onSearch={handleSearch}/>

                {/*botones*/}
                <div className="hero-buttons mt-4">
                    <button className="btn btn-outline-light">
                        Ver demo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;