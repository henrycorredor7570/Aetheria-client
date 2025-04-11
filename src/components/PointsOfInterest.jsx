// Este componente obtiene y muestra los puntos de interés de un destino, ubicándolos en un mapa interactivo.
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const PointsOfInterest = ({ points }) => {

    if(!points || points.length === 0){
        return <p>No hay puntos de interés registrados para este destino.</p>;
    }

    return (
        <div>
            <h3>Puntos de Interés</h3>
            <MapContainer
                center={[points[0]?.latitude || 0, points[0]?.longitude || 0]}// se actualizara con datos reales
                zoom={13}
                style={{height:"400px",width:"100%"}}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {points.map((point => (
                    <Marker key={point.id} position={[point.latitude, point.longitude]}>
                        <Popup>
                            <strong>{point.name}</strong>
                            <p>{point.description}</p>
                        </Popup>
                    </Marker>
                )))}
            </MapContainer>
        </div>
    );
};

export default PointsOfInterest;