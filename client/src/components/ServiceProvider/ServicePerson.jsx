import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserToken } from "./../../utils/cookies/getUserToken";
import { FaPhoneAlt } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const API = process.env.REACT_APP_BACKEND_API;

function ServicePerson({
    handyman_id,
    name,
    address,
    createdAt,
    usersSelected,
    profile,
    phone,
}) {
    const location = useLocation();
    const user_id = getUserToken();

    const lat = new URLSearchParams(location.search).get("lat");
    const long = new URLSearchParams(location.search).get("long");
    // const cost = new URLSearchParams(location.search).get("cost");
    const cost = 200;


    const createdAtDate = new Date(createdAt);

    // Calculate the number of days since the handyman joined the platform
    const today = new Date();
    const diffTime = today.getTime() - createdAtDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    // Set the memberSince variable to the number of days since the handyman joined the platform
    const memberSince = `${diffDays} days`;

    const jobsCompleted = usersSelected.length;

    const [isLoading, setIsLoading] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);

    const handleSelect = () => {
        setIsLoading(true);
        setShowCountdown(true);
        fetch(`${API}/api/createnotification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lat: lat,
                long: long,
                user_id: user_id,
                handyman_id: handyman_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(true);
                setIsAccepted(false);
                const interval = setInterval(() => {
                    fetch(
                        `${API}/api/getnotification`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                handyman_id: handyman_id,
                            }),
                        }
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log("hey" + data[0].status);
                            // console.log(data);
                            if (data[0]?.status === "accepted") {
                                // console.log("in" + data[0].status);
                                setIsAccepted(true);
                                setIsLoading(false);
                                clearInterval(interval);
                            } else if (data[0]?.status === "rejected") {
                                setIsAccepted(false);
                                setIsLoading(false);
                                clearInterval(interval);
                            }
                        });
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    return (

        <div className="bg-white mt-2 flex flex-row items-center h-auto rounded-xl shadow-md overflow-hidden transition hover:scale-[1.01] hover:shadow-lg w-full max-w-md mx-auto sm:max-w-full">
            {/* Image */}
            <div className="w-1/3 h-full sm:p-4 md:p-0">
                <img
                    src={profile}
                    alt={name}
                    className="w-full h-full object-contain object-center"
                />
            </div>

            {/* Info + Actions */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{name}</h2>
                    <p className="text-sm text-gray-500 line-clamp-1">{address}</p>
                    <p className="text-sm text-gray-600 mt-1">Member for {memberSince}</p>
                    <p className="text-sm text-gray-600">Completed {jobsCompleted} jobs</p>
                    {/* {distance !== undefined && (
                        <p className="text-gray-600 text-sm">{distance.toFixed(2)} km away</p>
                    )} */}
                </div>

                {/* Call Now Button (inside card, green with shimmer) */}
                <button
                    onClick={() => window.location.href = `tel:${phone}`}
                    className="flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg
                 hover:bg-green-600 transition-colors duration-300 text-sm
                 animate-shimmer mt-4 w-max"
                    style={{
                        background: 'linear-gradient(270deg, #22c55e, #4ade80, #22c55e)',
                        backgroundSize: '600% 600%',
                        animation: 'shimmer 3s ease-in-out infinite',
                    }}
                >
                    <FiPhoneCall size={20} />
                    Call Now
                    <style>{`
        @keyframes shimmer {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>
                </button>

                {/* Action Button */}
                <div className="mt-4">
                    {isLoading ? (
                        <span className="text-sm text-yellow-600">Waiting for handyman to respond...</span>
                    ) : isAccepted ? (
                        <Link
                            to={`/user/bookingsummary?lat=${lat}&long=${long}&cost=${cost}&handyman_id=${handyman_id}`}
                        >
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition">
                                Move Forward
                            </button>
                        </Link>
                    ) : showCountdown ? (
                        <button className="w-full bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm" disabled>
                            Request Rejected
                        </button>
                    ) : (
                        <button
                            onClick={handleSelect}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            Send a Request
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
}

export default ServicePerson;
