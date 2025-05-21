import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%',
            minHeight: '100vh',
            color: 'white',
            paddingTop: '60px'
        }}>
            <Container className='text-center'>
                <h1 style={{ fontSize:'3rem', fontWeight:'bold', marginBottom:'1rem'}}>
                    Bienvenido a Aetheria
                </h1>
                <p style={{fontSize:'1.3rem', marginBottom:'2rem'}}>
                    Explora destinos turísticos de todo el mundo con realidad aumentada.<br/>
                    Vive experiencias inmersivas, descubre puntos de interés y comparte tus aventuras.
                </p>
                <Button variant='light' as={Link} to='/destinations' size="lg" className="me-2"> 
                    Explorar Destinos
                </Button>
                <Button variant="outline-light" as={Link} to={'/register'} size='lg'>
                    Registrarse
                </Button>
            </Container>
            <Container className="mt-5">
                <h2 className="text-center mb-4" style={{fontWeight:'bold'}}>
                    ¿Por qué elegir Aetheria?
                </h2>
                <Row className="justify-content-center">
                    <Col md={4} className="mb-4">
                        <Card bg="light" text="dark" className="h-100 shadow-sm">
                            <Card.Body className="text-center">
                                <div style={{fontSize:'2.5rem'}}>🌍</div>
                                <Card.Title className="mt-3">Explora el mundo</Card.Title>
                                <Card.Text>
                                    Descubre destinos turísticos únicos y vive nuevas aventuras en cada rincón del planeta.
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card bg="light" text="dark" className="h-100 shadow-sm">
                            <Card.Body className="text-center">
                                <div style={{fontSize: '2.5rem'}}>🕶️</div>
                                <Card.Title className="mt-3">Realidad aumentada</Card.Title>
                                <Card.Text>
                                    Sumérgete en experiencias inmersivas con tecnología de realidad aumentada integrada.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card bg="light" text="dark" className="h-100 shadow-sm">
                            <Card.Body className="text-center">
                                <div style={{fontSize:'2.5rem'}}>⭐</div>
                                <Card.Title className="mt-3">Reseñas y comunidad</Card.Title>
                                <Card.Text>
                                    Comparte tus experiencias y lee opiniones de otros viajeros para planear mejor tus viajes.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;