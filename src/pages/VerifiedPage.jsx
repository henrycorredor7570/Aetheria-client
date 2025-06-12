import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const VerifiedPage = () => (
    <Container className="text-center mt-5">
        <h2>¡Correo verificado correctamente!</h2>
        <p>Ya puedes iniciar sesión en Aetheria.</p>
        <Button as={Link} to="/login" variant="primary">
            Ir a iniciar sesión
        </Button>
    </Container>
)

export default VerifiedPage;