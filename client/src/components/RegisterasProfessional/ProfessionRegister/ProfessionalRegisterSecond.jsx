import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import availableServices from "../../../utils/AvailableServices";
import Dropdown from "../../../utils/DropDown";
import { setHandymanToken } from "../../../utils/cookies/setHandymanToken";
import useGeoLocation from "../../../utils/useGeoLocation";
import serviceProbImg from "./images/serviceProbImg.jpg"
import back from "./images/back.png";

const API = process.env.REACT_APP_BACKEND_API;

function ProfessionalRegisterSecond(props) {
    const navigate = useNavigate();

    const location = useGeoLocation(); //getting current location of the handyman

    const [selected, setSelected] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [aadharFront, setAadharFront] = useState("");
    const [aadharBack, setAadharBack] = useState("");
    const [address, setAddress] = useState("");
    const [profile, setProfile] = useState("");

    const options = availableServices.map((service) => service.serviceName);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // new code
        if (!location.loaded || !location.coordinates?.lat || !location.coordinates?.lng) {
            toast.error("Please wait until your location is fetched.");
            return;
        }
        // end

        const data = {
            services: selected,
            name: props.name,
            email: props.email,
            otp: otp,
            password: props.password,
            phone: props.number,
            aadharNumber: aadharNumber,
            aadharFront: aadharFront != "" ? aadharFront : undefined,
            aadharBack: aadharBack != "" ? aadharBack : undefined,
            address: address,
            lat: location.coordinates?.lat,
            long: location.coordinates?.lng,
            profile: profile != "" ? profile : undefined,
        };
        // console.log(data);

        const response = await fetch(
            `${API}/api/handyman/signup/verify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        // If the OTP is correct, redirect to the dashboard
        try {
            const data = await response.json();
            // console.log(data);
            if (response.status === 200) {
                toast.success(data.msg);
                // console.log(data);
                setHandymanToken(data.handyman_id); //set up cookie
                toast.info("Redirecting you...");
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

    // const handleAadhaarFrontImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     TransformAadharFrontFileData(file);
    // };

    // const handleAadhaarBackImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     TransformAadharBackFileData(file);
    // };

    // const TransformAadharFrontFileData = (file) => {
    //     const reader = new FileReader();

    //     if (file) {
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             setAadharFront(reader.result);
    //             console.log(aadharFront);
    //         };
    //     } else {
    //         setAadharFront("");
    //     }
    // };

    // const TransformAadharBackFileData = (file) => {
    //     const reader = new FileReader();

    //     if (file) {
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             setAadharBack(reader.result);
    //         };
    //     } else {
    //         setAadharBack("");
    //     }
    // };

    return (
        <div className="min-h-screen items-center justify-center px-4 py-12">

            <div className=" w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 md:p-10 flex">
                {/* Left Image Section */}
                <div className="hidden lg:flex items-center justify-center w-full md:w-1/2 p-6">
                    <img
                        src={serviceProbImg}
                        alt="Help Service"
                        className="w-full max-w-xs object-contain"
                    />
                </div>

                {/* back image */}
                <img
                    src={back}
                    alt="Go Back"
                    onClick={() => navigate("/handyman/register")}
                    className="absolute top-4 left-4 w-6 h-6 cursor-pointer"
                />


                <div>

                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add Further Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="number"
                            placeholder="OTP"
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <Dropdown
                            options={options}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <input
                            type="text"
                            placeholder="Profile Photo URL (optional)"
                            onChange={(e) => setProfile(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />

                        <input
                            type="text"
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <input
                            type="number"
                            placeholder="Aadhar Number"
                            onChange={(e) => setAadharNumber(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Front Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg file:px-4 file:py-2 file:border-none file:bg-yellow-400 file:text-white file:font-medium hover:file:bg-yellow-500"
                            // onChange={handleAadhaarFrontImageUpload}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Back Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg file:px-4 file:py-2 file:border-none file:bg-yellow-400 file:text-white file:font-medium hover:file:bg-yellow-500"
                            // onChange={handleAadhaarBackImageUpload}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 mt-6">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="w-full bg-gray-200 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Resend OTP
                            </button>

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalRegisterSecond;
