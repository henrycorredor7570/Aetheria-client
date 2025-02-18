import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getPointsOfInterest } from "../services/destinationService";

const PointsOfInterest = ({destinationId}) => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetchPointsOfInterest = async () => {
            const data = await getPointsOfInterest(destinationId);
            setPoints(data);
        }
        fetchPointsOfInterest();
    }, [destinationId]);

    return (
        <div>
            <h3>Puntos de Interés</h3>
            <MapContainer
                center={[0,0]}// se actualizara con datos reales
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