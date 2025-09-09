import React from "react";
import Navbar from "../Global Components/Navbar/Navbar.jsx";
import Footer from "../Global Components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="bg-gradient-to-br from-yellow-200 to-pink-200 mt-10">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MainLayout;