import { useState } from "react";
import { registerUser } from "../services/authService.js";
import { Container, Form, Button, Alert } from "react-bootstrap";

const RegisterPage = () => {
    const [ formData, setFormData ] = useState({name: "", email: "", password: ""});
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setSuccess(true);
            setError(null);
        } catch (error){
            setError(error || "Error al registrar usuario.");
        }
    };

    return (
        <Container className="mt-5"> 
            <h2>Registro</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Usuario registrado exitosamente</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit">Registrarse</Button>
            </Form>
        </Container>
    )

}

export default RegisterPage;