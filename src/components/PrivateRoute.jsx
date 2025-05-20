//se usa para proteger rutas privadas en una aplicación React, 
// asegurando que el usuario esté autenticado antes de ver una página.

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {//children, que representa el componente que se quiere proteger (por ejemplo, un perfil o dashboard).
    const token = localStorage.getItem("token");// verifica si el usuario ya ha iniciado sesión (por ejemplo, si hizo login y guardó su token JWT).
    return token ? children : <Navigate to="/login"/>
}

export default PrivateRoute;