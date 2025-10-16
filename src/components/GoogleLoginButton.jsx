const GoogleLoginButton = () => {
    const handleLogin = () => {
        window.location.href  ='http://localhost:3000/auth/google';
    };
    return (
        <button className="btn btn-danger w-100 mb-3" onClick={handleLogin}>
            Iniciar sesión con Google
        </button>
    );
};

export default GoogleLoginButton;