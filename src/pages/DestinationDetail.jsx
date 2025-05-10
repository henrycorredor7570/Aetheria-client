// Este archivo se encarga de mostrar el detalle de un destino específico, incluyendo su imagen, descripción, 
// ubicación en un mapa y puntos de interés. También permite visualizar un modelo en realidad aumentada.

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationById, getPointsOfInterestByDestination } from '../services/destinationService';
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PointsOfInterest from "../components/PointsOfInterest";
import SearchPointsOfInterest from '../components/SearchPointsOfInterest';
import ARViewer from "../components/ARViewer";
import 'leaflet/dist/leaflet.css';

const DestinationDetail = () => {
    const {id} = useParams();
    const [destination, setDestination] = useState(null);
    const [pointsOfInterest, setPointsOfInterest] = useState([]);
    const [filteredPoints, setFilteredPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedModel, setSelectedModel] = useState("");   

    useEffect(()=>{
        const fetchData = async() => {
            try {
                const destinationData = await getDestinationById(id);
                const pointsData = await getPointsOfInterestByDestination(id);
                console.log(pointsData);
                
                setDestination(destinationData);
                setPointsOfInterest(pointsData);
                setFilteredPoints(pointsData);// al inicio todos los puntos se muestran
            } catch (error) {
                console.error("Error al cargar los datos: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSelectModel = (modelUrl) => {
        setSelectedModel(modelUrl);
    };

    if(loading){
        return (
            <Container className='text-center mt-5'>
                <Spinner animation="border" role="status">
                    <span className='visually-hidden'>Cargando destino...</span>
                </Spinner>
            </Container>
        )
    }

    if(!destination){
       return(
        <Container className='text-center mt-5'>
            <h3>No se encontró el destino</h3>
        </Container>
       )
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img variant='top' src={destination.image_url} alt={destination.name}/>
                        <Card.Body>
                            <Card.Title>{destination.name}</Card.Title>
                            <Card.Text>{destination.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <h4>Ubicación</h4>
                    <MapContainer
                        center={[destination.latitude, destination.longitude]}
                        zoom={13}
                        style={{height: "300px", width:"100%"}}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={[destination.latitude, destination.longitude]}>
                            <Popup>{destination.name}</Popup>
                        </Marker>
                    </MapContainer> 
                </Col>
            </Row>
            <Col md={6}>
                    <SearchPointsOfInterest
                        destinationId = {destination.id}
                        onResults={setFilteredPoints} //se estan pasando todos los puntos de interes
                    />
            </Col>
            <Row className='mt-4'>
                <Col>
                    <PointsOfInterest points={filteredPoints}/>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col> 
                    <h4>Realidad Aumentada</h4>
                    <button 
                        className="btn btn-primary"
                        onClick={() => handleSelectModel(destination.arModelUrl)}
                    >
                        Ver en AR
                    </button>
                    {selectedModel && <ARViewer modelUrl={selectedModel}/>}
                </Col>
            </Row>
        </Container>
    );
};

export default DestinationDetail;