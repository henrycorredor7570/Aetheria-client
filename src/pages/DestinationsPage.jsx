import { Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const DestinationPage = () => {
    return (
        <Container className='text-center mt-5'>
            <h1>Explora tus destinos y libera tus sentidos</h1>
            <Button variant='primary' as={Link} to='/'>
                Home
            </Button>
        </Container>
    );
};

export default DestinationPage;