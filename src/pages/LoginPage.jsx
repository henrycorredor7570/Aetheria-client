import { useState, useEffect } from "react";
import { loginUser } from "../services/authService.js";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginPage  = () => {
    const [credentials, setCredentials ] = useState({email: "",password: ""});
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    //Manejo de cambios en los campos del formulario
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    //Envío del formulario
    const handleSubmit = async(e) => {
        e.preventDefault();//Previene que se recargue la página al enviar el formulario.
        try {
            const data = await loginUser(credentials);
            localStorage.setItem("token", data.token); //se guarda el token el el local storage
            navigate("/profile");// redirigir al perfil
        }catch(err){
            setError(err.error || "Error al iniciar sesión.")
        }
    };

    /*
    1. Detecta si hay un token en la URL.
    2. Lo guarda en localStorage.
    3. Luego te manda a la página /profile.
    */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
            navigate("/profile");
        }
    }, [navigate]);

    return(
        <Container className="mb-5">
            <h2>Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
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
                <GoogleLoginButton/>
            </Form>
        </Container>
    )
};

export default LoginPage;