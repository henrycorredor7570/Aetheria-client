import { Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const DestinationDetail = () => {
    return (
        <Container className="text-center mt-5">
            <h1>Detalles de tu destino</h1>
            <Button variant='primary' as={Link} to='/destinations'>
                Destinos
            </Button>
        </Container>
    );
};

export default DestinationDetail;