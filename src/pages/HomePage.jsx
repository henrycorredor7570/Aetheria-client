import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container className='text-center mt-5'>
            <h1>Bienvenido a Aetheria</h1>
            <p>Explora destinos turísticos con realidad aumentada</p>
            <Button variant='primary' as={Link} to='/destinations'> 
                Explorar Destinos
            </Button>
        </Container>
    );
};

export default HomePage;