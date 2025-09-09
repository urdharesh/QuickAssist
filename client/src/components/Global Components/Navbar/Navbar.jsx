import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken } from "../../../utils/cookies/getUserToken";
import { removeUserToken } from "../../../utils/cookies/removeUserToken";
import { toast } from "react-toastify";
// import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [loggedIn, setLoggedIn] = useState(!!getUserToken());
    const API = process.env.REACT_APP_BACKEND_API;

    useEffect(() => {
        const fetchOnce = async () => {
            try {
                const response = await fetch(`${API}/api/handyman/getallhandyman`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                await response.json();
                // console.log("Server Started");
            } catch (error) {
                console.error("Fetch failed:", error.message);
            }
        };
        fetchOnce();
    }, []);

    const handleLogout = () => {
        removeUserToken();
        toast.success("Logged out Successfully")
        setLoggedIn(false);
        navigate("/user/login");
    };

    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);



    return (
        <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md">
            <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-14">
                <nav className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl md:text-3xl font-semibold font-montserrat  text-black">QuickAssist</span>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center space-x-10 text-base text-black">
                        <li>
                            <Link
                                to="/"
                                className="relative group font-medium transition duration-300 transform hover:scale-105"
                            >
                                Home
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services/servicePage"
                                className="relative group font-medium transition duration-300 transform hover:scale-105"
                            >
                                Services
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="relative group font-medium transition duration-300 transform hover:scale-105"
                            >
                                About
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                        <li>
                            <a
                                href="mailto:ujjawalpatidar0303@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group font-medium transition duration-300 transform hover:scale-105"
                            >
                                Contact Us
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                            </a>
                        </li>
                        <li>
                            {/* keep your Login / Logout logic unchanged here */}
                            {loggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-yellow-400 hover:bg-black hover:text-white pl-5 pr-2 py-2 rounded-full shadow-md font-semibold flex items-center gap-2 transition duration-300"
                                >
                                    Logout
                                    <span className="text-3xl transition text-white  duration-300">
                                        <BsArrowRightCircleFill />
                                    </span>
                                </button>
                            ) : (
                                <Link to="/user/login">
                                    <button className="bg-yellow-400 hover:bg-black hover:text-white pl-5 pr-2 py-2 rounded-full shadow-md font-semibold flex items-center gap-2 transition duration-300">
                                        Login / Signup
                                        <span className="text-3xl  text-white py-0.5 transition duration-300">
                                            <BsArrowRightCircleFill />
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </li>
                    </ul>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden text-3xl text-black cursor-pointer" onClick={toggleMobileMenu}>
                        {showMobileMenu ? <FaTimes /> : <FaBars />}
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${showMobileMenu ? "max-h-96 py-6 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                <ul className="flex flex-col items-center space-y-6 text-black font-medium text-lg">
                    <li>
                        <Link
                            to="/"
                            onClick={toggleMobileMenu}
                            className="relative group transition duration-300 transform hover:scale-105"
                        >
                            Home
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/services/servicePage"
                            onClick={toggleMobileMenu}
                            className="relative group transition duration-300 transform hover:scale-105"
                        >
                            Services
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            onClick={toggleMobileMenu}
                            className="relative group transition duration-300 transform hover:scale-105"
                        >
                            About
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                    <li>
                        <a
                            href="mailto:ujjawalpatidar0303@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group transition duration-300 transform hover:scale-105"
                            onClick={toggleMobileMenu}
                        >
                            Contact Us
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full" />
                        </a>
                    </li>
                    <li>
                        {/* keep your Login / Logout logic unchanged here */}
                        {loggedIn ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    toggleMobileMenu();
                                }}
                                className="bg-yellow-400 hover:bg-black hover:text-white pl-5 pr-2 py-2 rounded-full shadow-md font-semibold flex items-center gap-2 transition duration-300"
                            >
                                Logout
                                <span className="text-3xl transition text-white duration-300">
                                    <BsArrowRightCircleFill />
                                </span>
                            </button>
                        ) : (
                            <Link to="/user/login" onClick={toggleMobileMenu}>
                                <button className="bg-yellow-400 hover:bg-black hover:text-white pl-5 pr-2 py-2 rounded-full shadow-md font-semibold flex items-center gap-2 transition duration-300">
                                    Login / Signup
                                    <span className="text-3xl  text-white rounded-full py-1 transition duration-300">
                                        <BsArrowRightCircleFill />
                                    </span>
                                </button>
                            </Link>
                        )}
                    </li>
                </ul>

            </div>
        </header>

    );

}

export default Navbar;
