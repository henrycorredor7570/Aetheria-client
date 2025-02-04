import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "../pages/HomePage";
// import DestinationPage from "../pages/DestinationsPage";
// import DestinationDetail from "../pages/DestinationDetail";
// import ProfilePage from "../pages/ProfilePage";
import NavBar from "../components/Navbar";

const AppRouter = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                {/* <Route path="/" element={<HomePage/>}/>
                <Route path="/destinations" element={<DestinationPage/>}/>
                <Route path="/destination/:id" element={<DestinationDetail/>}/>
                <Route path="/profile" element={<ProfilePage/>}/> */}
            </Routes>
        </Router>
    );
};

export default AppRouter;