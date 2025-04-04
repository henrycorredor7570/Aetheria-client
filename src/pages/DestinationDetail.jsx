// Este archivo se encarga de mostrar el detalle de un destino específico, incluyendo su imagen, descripción, 
// ubicación en un mapa y puntos de interés. También permite visualizar un modelo en realidad aumentada.

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationById } from '../services/destinationService';
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PointsOfInterest from "../components/PointsOfInterest";
import ARViewer from "../components/ARViewer";
import 'leaflet/dist/leaflet.css';

const DestinationDetail = () => {
    const {id} = useParams();
    const [destination, setDestination ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedModel, setSelectedModel] = useState("");    

    useEffect(()=>{
        const fetchDestination = async() => {
            try {
                const data = await getDestinationById(id);
                setDestination(data);
            } catch (error) {
                console.error("Error fetching destination: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDestination();
    }, [id]);

    const handleSelectModel = (modelUrl) => {
        setSelectedModel(modelUrl);
    };

    if(loading){
        return (
            <Container className='text-center mt-5'>
                <Spinner animation="border" role="status">
                    <span className='visually-hidden'>Cargando...</span>
                </Spinner>
            </Container>
        )
    }

    if(!destination){
       return(
        <Container className='text-center mt-5'>
            <h3>Destino no encontrado</h3>
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
            
            <Row className='mt-4'>
                <Col>
                    <PointsOfInterest destinationId={id}/>
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