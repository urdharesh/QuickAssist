import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { setUserToken } from "./../../utils/cookies/setUserToken";
import back from "./images/back.png";
import "./bg1.css";

function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(null);
    const API = process.env.REACT_APP_BACKEND_API;

    var cookies = new Cookies();

    useEffect(() => {
        const userId = cookies.get("user_token");
        // If cookie found, Redirect to dashboard
        if (userId) {
            setUserId(userId);
            toast.success("Redirecting you ...");

            // Redirect to dashboard
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `${API}/api/user/login`,
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
                setUserToken(data.user_id); //set up cookie
                // console.log(data);
                setTimeout(() => {
                    navigate("/");
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
        <div className="bg_container min-h-screen bg-gray-100 flex items-center justify-center relative px-4">
            <img
                src={back}
                alt="Go Back"
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 w-8 h-8 cursor-pointer"
            />

            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    User Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-yellow-400 text-gray-800 hover:bg-black hover:text-white font-semibold rounded-lg transition "
                    >
                        Continue
                    </button>

                    <button
                        type="button"
                        className="w-full py-2 border text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => {
                            setEmail("abc@gmail.com");
                            setPassword("34abc");
                        }}
                    >
                        Use Test Credentials
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/user/signup" className="text-yellow-500 font-semibold">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
