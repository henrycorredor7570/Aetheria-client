import React, { useState } from "react";
import { registerUser } from "../services/authService.js";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

/**
 * Página de registro de usuario.
 * Este formulario recoge todos los datos requeridos por el backend para crear un usuario.
 */
const RegisterPage = () => {
// Estado inicial del formulario con todos los campos requeridos por el backend
    const [ formData, setFormData ] = useState({
        userName: "",
        email: "", 
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        profile_picture: "",
        role:"user",
        terms: false
    });
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(false);

    /**
     * Maneja los cambios en los campos del formulario.
     * Actualiza el estado correspondiente según el campo editado si es checked o tipo de rol o campo normal etc..
     */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ //Se usa una función que recibe el estado anterior (prev) y retorna un nuevo objeto
            ...prev,
            [name]: type === "checkbox" ? checked : value //[name]: actualiza solo el campo que cambió.
        }));
    };

    /**
     * Valida si la url es válida para la foto de perfil
     */
    const isValidUrl = (url) => {
        try {
            if (!url) return true; //Si no ahí url, se considera válido porque la foto de perfil es opcional.
            new URL(url); //intentamos crear una url válida con el valor recibido
            return true;
        } catch {
            return false;
        }
    }
    
    /**
     * Maneja el envío del formulario
     * realiza validaciones adicionales antes de enviar al backend
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); //Previene el comportamiento por defecto del formulario (recargar la página).

        // validacion extra para la url de la imagen
        if(!isValidUrl(formData.profile_picture)){
            setError("La URL de la foto de perfil no es válida.");
            return;
        }

        //Validacion de los términos:
        if(!formData.terms){
            setError("Debes aceptar los términos y condiciones.");
            return;
        }

        try {
            await registerUser(formData);
            setSuccess(true);
            setError(null);
        } catch (err){
            setError(err.error || "Error al registrar usuario..");
        }
    };

    return (
        <Container className="mt-5" style={{maxWidth:600}}> 
            <h2>Registro de Usuario</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
                <Alert variant="success">
                    Usuario registrado exitosamente. Revisa tu correo para registrar tu cuenta.
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                {/* NOMBRE DE USUARIO */}
                <Form.Group className="mb-3">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control 
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        placeholder="Ej: juan.perez"
                    />
                </Form.Group>
                {/* EMAIL */}
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Ej: correo@ejemplo.com"
                    />
                </Form.Group>
                {/* CONTRASEÑA */}
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos"
                    />
                </Form.Group>
                {/* CONFIRMACION DE LA CONTRASEÑA*/}
                <Form.Group className="mb-3">
                    <Form.Label>Confirmar Contrasñea</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                        placeholder="Repite la contraseña"
                    />
                </Form.Group>

                <Row>
                    { /* NOMBRE */ }
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    { /* APELLIDO */}
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* FECHA DE NACIMIENTO */}
                <Form.Group classname="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* GÉNERO */}
                <Form.Group className="mb-3">
                    <Form.Label>Género</Form.Label>
                    <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                        <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
                    </Form.Select>
                </Form.Group>

                {/*  FOTO DE PERFIL */}
                <Form.Group className="mb-3">
                    <Form.Label>Foto de perfil</Form.Label>
                    <Form.Control
                        type="text"
                        name="profile_picture"
                        value={formData.profile_picture}
                        onChange={handleChange}
                        placeholder="https://ejemplo.com/mi-foto.jpg"
                    />
                </Form.Group>

                {/* ROL */}
                <Form.Group className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Por defecto, el rol es: (Usuario).
                    </Form.Text>
                </Form.Group>

                {/* TÉRMINOS Y CONDICIONES */}
                <Form.Group className="mb-3">TT
                    <Form.Check
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        label="Acepto los términos y condiciones"
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={success}>
                    Registrarse
                </Button>
            </Form>
        </Container>
    )

}

export default RegisterPage;