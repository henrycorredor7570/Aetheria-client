import { useState } from "react";
import { loginUser } from "../services/authService.js";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage  = () => {
    const [credentials, setCredentials ] = useState({email: "",password: ""});
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await loginUser(credentials);
            localStorage.setItem("token", data.token); //se guarda el token el el local storage
            navigate("/profile");// redirigir al perfil
        }catch(err){
            setError(err.error || "Error al iniciar sesión.")
        }
    };

    return(
        <Container className="mb-5">
            <h2>Iniciar Sesión</h2>
            {error && <Alert varinat="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>  
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit">Iniciar Sesión</Button>
            </Form>
        </Container>
    )
};

export default LoginPage;