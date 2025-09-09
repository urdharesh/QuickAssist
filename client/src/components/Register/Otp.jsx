import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserToken } from "./../../utils/cookies/setUserToken";
// import "./Otp.css";

const API = process.env.REACT_APP_BACKEND_API;

function Otp(props) {
    const navigate = useNavigate();

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
        const otpArray = clipboardData.split("").slice(0, otp.length);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        // Send the entered OTP to the backend for verification
        const response = await fetch(

            `${API}/api/user/signup/verify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contactNumber: props.number,
                    otp: enteredOtp,
                    email: props.email,
                    username: props.name,
                    password: props.password,
                    lat: props.lat,
                    long: props.long,
                }),
            }
        );
        // If the OTP is correct, redirect to the dashboard
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
                // redirect to signup if shown "This Email ID is not registered. Try Signing Up instead!"
                setTimeout(() => {
                    // Set success message
                    toast.info("Redirecting you to SignUp...");
                }, 1700);

                // Redirect to dashboard
                setTimeout(() => {
                    navigate("/user/signup");
                }, 3000);
            }
        } catch (error) {
            console.error("Invalid JSON string:", error.message);
        }
    };

    const handleResendOtp = async () => {
        try {
            // Send a request to the backend to resend the OTP
            const response = await fetch(
                `${API}/api/user/signup/resendOtp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contactNumber: props.number,
                        email: props.email,
                    }),
                }
            );
            const data = await response.json();
            if (response.status === 200) {
                // If the OTP is sent successfully, show a success message
                toast.success("in resend otp: " + data.msg);
            } else {
                // If there was an error in sending the OTP, show an error message
                toast.error("in resend otp: " + data.msg);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div
            className=" min-h-screen bg-gray-100 flex items-center justify-center relative px-4"
        >
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Enter the 6-digit code sent to
                    <br />
                    <span className="text-yellow-500">{props.email}</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                value={digit}
                                maxLength={1}
                                onChange={(e) => handleChange(e, index)}
                                onPaste={handleOnPaste}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(ref) => (otpInputs.current[index] = ref)}
                                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-yellow-400 text-gray-800 hover:bg-black hover:text-white font-semibold rounded-lg transition"
                    >
                        Verify
                    </button>

                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className="w-full py-2 border text-gray-600 rounded-lg hover:bg-gray-100 transition"
                    >
                        Resend OTP
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Otp;
