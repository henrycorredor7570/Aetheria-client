import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fondo from "../assets/Leonardo_Phoenix_10_te_pongo_en_contexto_esta_es_mi_aplicacin_2.jpg";

const HomePage = () => {
    return (
        <div style={{
            position:'relative',
            background: `linear-gradient(rgba(40,40,80,0.7), rgba(40,40,80,0.7)), url(${fondo}) center/cover no-repeat`,
            minHeight: '100vh',
            color: 'white',
            paddingTop: '60px',
            backgroundAttachment: 'fixed'
        }}>

            {/* Container de mensaje de bienvenida y cuerpo de la página */}
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

            {/* Container de las tarjetas de presentacion y descripción */}
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
            <footer style={{
                background: 'rgba(30, 30, 60, 0.97',
                color:'white',
                marginTop:'60px',
                padding:'32px 0 12px 0',
                borderTopLeftRadius:'32px',
                borderTopRightRadius:'32px',
                boxShadow:'0 -2px 24px rgba(0,0,0,0.18)'
            }}>
                <Container className="text-center"> 
                    <h5 style={{fontWeight:'bold', letterSpacing:'2px', marginBottom:'12px'}}>Aetheria</h5>
                    <div style={{fontSize:'1.7rem', margin:'10px 0'}}>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{color:'white', margin:'0 12px', textDecoration:'none'}}>🐦</a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{color:'white', margin:'0 12px', textDecoration:'none'}}>📘</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{color:'white', margin:'0 12px', textDecoration:'none'}}>📸</a>
                    </div>
                    <small style={{opacity:0.8}}>© {new Date().getFullYear()} Aetheria. Todos los derechos reservados.</small>
                </Container>
            </footer>
        </div>
    );
};

export default HomePage;