import React, { useState } from "react";
import { registerUser } from "../services/authService.js";
import { Container, Form, Button, Alert } from "react-bootstrap";

const RegisterPage = () => {
//   ****FALTA AGREGAR EL ROLE DEL USUARIO DE UN CHEKLIST PUEDE SER****
    const [ formData, setFormData ] = useState({
        username: "",
        email: "", 
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        profile_picture: "",
        terms: false
    });
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(false);

    //Esta función actualiza el campo del formulario que se está editando:
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // el name no es el name del usuario como tal, 
        // si no de los atributos que se piden en cada campo del formulario (Form.control) mas adelante: name="name", name="email", name="password"

    };
    //Funcion para el envío del formulario:
    const handleSubmit = async (e) => {
        e.preventDefault(); //Previene el comportamiento por defecto del formulario (recargar la página).
        try {
            await registerUser(formData);
            setSuccess(true);
            setError(null);
        } catch (err){
            setError(err.error || "Error al registrar usuario..");
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