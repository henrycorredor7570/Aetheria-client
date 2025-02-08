import { useState, useEffect } from "react";
import { getDestinations } from '../services/destinationService';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const DestinationPage = () => {
    const [destinations, setDestinations] = useState([]);
    console.log(destinations)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDestinations();
            setDestinations(data);
        };
        fetchData();
    }, []);

    return (
        <Container className='mt-4'>
            <h2 className="text-center">Explora tus destinos y libera tus sentidos</h2>
            <Row>
                {destinations.length > 0 ? (
                    destinations.map((destination) => (
                        <Col md={4} key={destination.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={destination.image_url} alt={destination.name}/>
                                <Card.Body>
                                    <Card.Title>{destination.name}</Card.Title>
                                    <Card.Text>{destination.description.substring(0,100)}...</Card.Text>
                                    <Button variant="primary" as={Link} to={`/destination/${destination.id}`}>
                                        Ver Detalles
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No hay destinos disponibles</p>
                )}
            </Row>
        </Container>
    );
};

export default DestinationPage;