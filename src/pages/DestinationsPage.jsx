import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getDestinations } from '../services/destinationService';
import { searchDestinations } from "../services/destinationService";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

/**
 * DestinationsPage Component
 * 
 * Maneja dos escenarios:
 * 1. Mostrar todos los destinos (carga inicial)
 * 2. Mostrar resultados de búsqueda (cuando viene del SearchBar)
 */
const DestinationPage = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [error, setError ] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Obtenemos los parámetros de búsqueda de la URL
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const search = searchParams.get("search");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                // Si hay un parámetro de búsqueda en la URL
                if(search){
                    setSearchTerm(search);
                    //Bucamos en el backend
                    data = await searchDestinations(search);

                } else {
                    // Si no hay búsqueda, obtenemos todos los destinos
                    data = await getDestinations();
                }

                setDestinations(data);
            } catch (error){
                console.error("Error al cargar destinos", error);
                setError("Error al cargar los destinos");
                setDestinations([]);
            } finally {
                setLoading(false);
            };
        };
        fetchData();
    }, [search]); // Se ejecuta cuando cambia el parámetro 'search'

    // Estado de carga
    if(loading) {
        return (
            <Container className="mt-4 text-center">
                <p>Cargando destinos...</p>
            </Container>
        );
    }

    return (
        <Container className='mt-4'>
            <h2 className="text-center mb-4">
                {searchTerm ? `Resultados para: "${searchTerm}"` : "Explora tus destinos y libera tus sentidos"}
            </h2>

            {/*Mostrar mensaje de error si existe*/}
            {searchTerm && (
                <Alert variant="info">
                    Se encontraron <strong>{destinations.length}</strong> destino(s)
                </Alert>
            )}
            <Row>
                {destinations.length > 0 ? (
                    destinations.map((destination) => (
                        <Col md={4} key={destination.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Img 
                                    variant="top" 
                                    src={destination.image_url} 
                                    alt={destination.name}
                                    style={{height: '200px', objectFit: 'cover'}}
                                />
                                <Card.Body>
                                    <Card.Title>{destination.name}</Card.Title>
                                    <Card.Text className="text-muted">
                                        {destination.country}
                                    </Card.Text>
                                    <Card.Text>
                                        {destination.description.substring(0, 100)}...
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        as={Link} 
                                        to={`/destination/${destination.id}`}
                                    >
                                        Ver Detalles
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col md={12} className="text-center">
                        <Alert variant="warning">
                            No hay destinos disponibles {searchTerm && `para "${searchTerm}"`}
                        </Alert>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default DestinationPage;