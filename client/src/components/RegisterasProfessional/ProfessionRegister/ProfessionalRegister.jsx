import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import ProfessionalRegisterSecond from "./ProfessionalRegisterSecond";
import serviceProbImg from "./images/serviceProbImg.jpg"
import back from "./images/back.png";

const API = process.env.REACT_APP_BACKEND_API;

function ProfessionalRegister() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [verified, setVerified] = useState(false);
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
            `${API}/api/handyman/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            }
        );
        try {
            const data = await response.json();
            // console.log(data);
            if (response.status === 200) {
                toast.success(data.msg);
                toast.info("Redirecting you...");
                setVerified(true);
            } else {
                console.error(`Failed with status code ${response.status}`);
                toast.error(data.msg);
            }
        } catch (error) {
            console.error("Invalid JSON string:", error.message);
        }
    };

    return (
        <div className="min-h-screen bg-yellow-100 flex items-center justify-center px-4">
            {verified ? (
                <ProfessionalRegisterSecond
                    name={name}
                    email={email}
                    password={password}
                    number={number}
                />
            ) : (
                <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

                    <img
                        src={back}
                        alt="Go Back"
                        onClick={() => navigate("/handyman/register")}
                        className="absolute top-4 left-4 w-6 h-6 cursor-pointer"
                    />

                    {/* Left Image Section */}
                    <div className="hidden md:flex items-center justify-center w-full md:w-1/2 p-6">
                        <img
                            src={serviceProbImg}
                            alt="Help Service"
                            className="w-full max-w-xs object-contain"
                        />
                    </div>

                    {/* Signup Form Section */}
                    <div className="relative w-full md:w-1/2 p-8 md:p-10">

                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                            Create Account
                        </h2>
                        <p className="text-center text-sm text-gray-500 mb-6">
                            Create your handyman account
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
                            >
                                Next
                            </button>

                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/handyman/login" className="text-yellow-500 hover:underline font-medium">
                                    Log in!
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

}

export default ProfessionalRegister;
