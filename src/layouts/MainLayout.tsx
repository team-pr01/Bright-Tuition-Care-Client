import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
    const location = useLocation();
    return (
        <div> 
            <Navbar/>
            <Outlet/>
            {
                location?.pathname !== "/job-board" && <Footer/>
            }
        </div>
    );
};

export default MainLayout;