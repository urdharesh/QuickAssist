import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import map_start_end from "./images/map_start_end.png";
import Mapbox from "../../../utils/Mapbox";

const API = process.env.REACT_APP_BACKEND_API;

function Map() {
    const navigate = useNavigate();
    const location = useLocation();

    const [userData, setUserData] = useState(null);
    const user_id = new URLSearchParams(location.search).get("user_id");

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpInputs = useRef([]);

    const handleChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);

        // move to the next input box if a digit is entered
        if (e.target.value !== "" && index < otp.length - 1) {
            otpInputs.current[index + 1].focus();
        }
    };

    const handleOnPaste = (e) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData("text/plain");
        const otpArray = clipboardData.split("").slice(0, otp?.length);
        const newOtp = [...otp];
        otpArray.forEach((digit, index) => {
            newOtp[index] = digit;
            if (digit !== "" && index < otp.length - 1) {
                otpInputs.current[index + 1].focus();
            }
        });
        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        // delete the previous input box if Backspace is pressed
        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
            otpInputs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(
                `${API}/api/user/getuser`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id }),
                }
            );
            // const data = await response.json();
            // setUserData(data);

            // Prevent parsing empty response
            const text = await response.text();
            if (!text) {
                console.error("Empty response from server");
                return;
            }

            const data = JSON.parse(text);
            setUserData(data);
        };
        fetchUserData();
    }, [user_id]);

    const handleOpenMaps = () => {
        if (userData && userData?.lat && userData?.long) {
            const url = `https://www.google.com/maps/search/?api=1&query=${userData?.lat},${userData?.long}`;
            window.open(url, "_blank");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        const response = await fetch(
            `${API}/api/handyman/jobstartotp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp: enteredOtp,
                    email: userData.email,
                }),
            }
        );
        try {
            const data = await response.json();
            if (response.status === 200) {
                toast.success(data.msg);
                setTimeout(() => {
                    navigate(`/handyman/workdone?user_id=${user_id}`);
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
        <div className="bg-gray-50 py-10 px-4">
            <Mapbox lat={userData?.lat} long={userData?.long} addOnStyle={"mt-2"} />
            <p className="text-center text-gray-600 text-sm mt-2 capitalize">
                Showing customer current location
            </p>
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Map Section */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center space-y-4">
                    <div className="w-full max-w-md">
                        <img src={map_start_end} alt="Map Direction" className="w-full rounded-md" />
                    </div>
                    <div>
                        <button
                            onClick={handleOpenMaps}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-full shadow transition"
                        >
                            Click here to open Map
                        </button>
                    </div>
                </div>

                {/* OTP Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-md p-6 space-y-6 text-center"
                >
                    <div className="text-lg font-semibold text-gray-800">
                        Enter the 6-digit job start code sent to the user
                        <p className="text-sm font-normal text-gray-500">
                            (Upon reaching the destination)
                        </p>
                    </div>

                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                type="text"
                                key={index}
                                value={digit}
                                maxLength={1}
                                onChange={(e) => handleChange(e, index)}
                                onPaste={handleOnPaste}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(ref) => (otpInputs.current[index] = ref)}
                                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        ))}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Map;
