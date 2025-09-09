import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "./BookingDone.css";
import call from "./images/call.png";
import confirm from "./images/confirm.png";
import profilecircle from "./images/profilecircle.png";

function BookingDone() {
    const location = useLocation();
    const navigate = useNavigate();

    const lat = new URLSearchParams(location.search).get("lat");
    const long = new URLSearchParams(location.search).get("long");
    const cost = new URLSearchParams(location.search).get("cost");
    const gst = Math.round(cost * 0.18);
    const total = 20 + parseFloat(cost) + parseFloat(gst);
    const handyman_id = new URLSearchParams(location.search).get("handyman_id");

    const [handymanData, setHandymanData] = useState("");
    const [copied, setCopied] = useState(false);

    const API = process.env.REACT_APP_BACKEND_API;

    useEffect(() => {
        const fetchHandymanDetails = async () => {
            const response = await fetch(
                `${API}/api/handyman/gethandyman`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        handyman_id: handyman_id,
                    }),
                }
            );
            try {
                const data = await response.json();
                if (response.status === 200) {
                    toast.success(data.msg);
                    setHandymanData(data);
                } else {
                    console.error(`Failed with status code ${response.status}`);
                    toast.error(data.msg);
                }
            } catch (error) {
                console.error("Invalid JSON string:", error.message);
            }
        };

        fetchHandymanDetails();
    }, []);

    // calculate the distance between two points using the haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    // Convert degrees to radians
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    // Estimate the time it will take for the handyman to reach the user's location
    function estimateTimeOfArrival(handymanData, userLat, userLong) {
        const distance = calculateDistance(
            handymanData.lat,
            handymanData.long,
            userLat,
            userLong
        );

        const averageSpeed = 30; // km/h
        const timeInHours = distance / averageSpeed;
        const timeInMinutes = timeInHours * 60;
        return timeInMinutes;
    }

    const estimatedTime = estimateTimeOfArrival(handymanData, lat, long);

    const handlePaymentClick = (e) => {
        e.preventDefault();
        navigate(`/user/payment?total=${total}`);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(handymanData?.phone);
        setCopied(true);
    };

    return (
        <div className="bg-gradient-to-br to-yellow-100 from-green-100">

            <div className=" max-w-5xl mx-auto px-4 py-10 space-y-8">
                {/* Booking Summary */}
                <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                    <div className="flex items-center gap-3 text-green-600 text-xl font-semibold">
                        <img src={confirm} alt="" className="w-6 h-6" />
                        <span>Booking Confirmed</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <img
                            src={profilecircle}
                            alt=""
                            className="w-20 h-20 rounded-full border border-gray-300"
                        />
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            A handyman has been assigned at your place today. <br />
                            Our executive will arrive as per schedule. <br />
                            <span className="text-lg text-orange-400">An <span className="font-bold text-red-500">OTP</span> has been sent to your registered Email address. Share it with the handyman upon his arrival.</span>
                        </p>
                    </div>

                    <div className="text-center text-gray-800">
                        Handyman will arrive at your location in
                        <br />
                        <span className="text-3xl font-bold text-yellow-500">
                            {parseInt(estimatedTime.toFixed(0)) + 3} min
                        </span>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                    <div className="text-xl font-semibold text-gray-800 border-b pb-2">Payment Summary</div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Platform Charge</span>
                            <span>20</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Handyman Charges</span>
                            <span>{cost}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>GST</span>
                            <span>{gst}</span>
                        </div>
                    </div>

                    <div className="flex justify-between font-semibold text-gray-800 border-t pt-4">
                        <span>Total</span>
                        <span>{total}</span>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handlePaymentClick}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>

                {/* End Container */}
                <div className="flex flex-col sm:flex-row items-center justify-between bg-yellow-100 rounded-xl px-6 py-4 gap-4">
                    <div>
                        <div className="text-lg font-semibold text-yellow-800">Booking Confirmed</div>
                        <div className="text-sm text-yellow-700">
                            Call the handyman in case you face any issue
                        </div>
                    </div>
                    <button
                        onClick={handleCopyToClipboard}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow transition"
                    >
                        <img src={call} alt="call" className="w-4 h-4" />
                        <span>+91 {handymanData?.phone}</span>
                        {copied && <span className="ml-2 text-sm text-white">Copied!</span>}
                    </button>
                </div>
            </div>
        </div>

    );
}

export default BookingDone;
