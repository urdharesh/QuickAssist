import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
// import { setUserToken } from "../../utils/cookies/setUserToken";
import useGeoLocation from "../../utils/useGeoLocation";
import Otp from "./Otp";
import "./bg1.css";
import back from "./images/back.png";

const API = process.env.REACT_APP_BACKEND_API;

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [verified, setVerified] = useState(false);
    const [userId, setUserId] = useState(null);

    const location = useGeoLocation(); //getting current location of the handyman

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
            `${API}/api/user/signup`,
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
                // setUserToken(data.user_id); //set up cookie
                toast.info("Redirecting you...");
                // console.log(data);
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
        <div>
            {verified ? (
                <Otp
                    name={name}
                    password={password}
                    email={email}
                    number={number}
                    lat={location?.coordinates?.lat}
                    long={location?.coordinates?.lng}
                />
            ) : (
                <div
                    className="bg_container min-h-screen bg-gray-100 flex items-center justify-center relative px-4"
                >
                    <img
                        src={back}
                        alt="Go Back"
                        onClick={() => navigate("/")}
                        className="absolute top-4 left-4 w-8 h-8 cursor-pointer"
                    />

                    <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                            Create Account
                            <br />
                            <span className="text-base font-normal text-gray-500">
                                A few clicks away from creating your account
                            </span>
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <input
                                type="number"
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className="w-full py-2 bg-yellow-400 text-gray-800 hover:bg-black hover:text-white font-semibold rounded-lg transition"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="text-center mt-6 text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/user/login" className="text-yellow-500 font-semibold">
                                Log in!
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Signup;
