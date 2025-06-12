import { BrowserRouter , Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DestinationPage from "../pages/DestinationsPage";
import DestinationDetail from "../pages/DestinationDetail";
import ProfilePage from "../pages/ProfilePage";
import NavBar from "../components/Navbar";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import VerifiedPage from "../pages/VerifiedPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/destinations" element={<DestinationPage/>}/>
                <Route path="/destination/:id" element={<DestinationDetail/>}/>
                <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/verified" element={<VerifiedPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;