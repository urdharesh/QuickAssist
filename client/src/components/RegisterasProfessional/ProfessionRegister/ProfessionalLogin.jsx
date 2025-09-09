import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { setHandymanToken } from "../../../utils/cookies/setHandymanToken";
import "./bg2.css";
import back from "./images/back.png";
import serviceProbImg from "./images/serviceProbImg.jpg"

const API = process.env.REACT_APP_BACKEND_API;

function ProfessionalLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [handymanId, setHandymanId] = useState(null);

    var cookies = new Cookies();

    useEffect(() => {
        const handymanId = cookies.get("handyman_token");
        // If cookie found, Redirect to dashboard
        if (handymanId) {
            setHandymanId(handymanId);
            toast.success("Redirecting you ...");

            // Redirect to dashboard
            setTimeout(() => {
                navigate("/handyman/dashboard");
            }, 2000);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `${API}/api/handyman/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        try {
            const data = await response.json();
            // console.log(data);
            if (response.status === 200) {
                toast.success(data.msg);
                toast.info("Redirecting you...");
                // console.log(data);
                setHandymanToken(data.handyman_id); //set up cookie
                // console.log(data);
                setTimeout(() => {
                    navigate("/handyman/dashboard");
                }, 3000);
            } else {
                console.error(`Failed with status code ${response.status}`);
                toast.error(data.msg);
            }
        } catch (error) {
            console.error("Invalid JSON string:", error.message);
        }
    };

    return (
        <div className="min-h-screen bg-yellow-100 flex items-center justify-center px-4 py-12">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

                <img
                    src={back}
                    alt="Go Back"
                    onClick={() => navigate("/handyman/register")}
                    className="absolute top-4 left-4 w-6 h-6 cursor-pointer"
                />

                {/* Image Section */}
                <div className="hidden md:flex items-center justify-center w-full md:w-1/2 p-6">

                    <img
                        src={serviceProbImg}
                        alt="Service Help"
                        className="w-full max-w-xs object-contain"
                    />
                </div>

                {/* Form Section */}
                <div className="relative w-full md:w-1/2 p-8 md:p-10">

                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Handyman Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <div className="space-y-3">
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-black transition"
                            >
                                Continue
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail("abcprofessional@gmail.com");
                                    setPassword("34abc");
                                }}
                                className="w-full text-sm text-gray-500 hover:underline"
                            >
                                Autofill Test Credentials
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <Link to="/handyman/signup" className="text-yellow-500 hover:underline font-medium">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalLogin;
