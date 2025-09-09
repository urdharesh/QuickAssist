import React from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_BACKEND_API;

function PopUp(props) {
    const navigate = useNavigate();
    const { notificationData } = props;

    const handleAccept = () => {
        fetch(`${API}/api/acceptnotification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                handyman_id: notificationData[0].handyman_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                navigate(
                    `/handyman/jobstartotp?user_id=${notificationData[0].user_id}`
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDecline = () => {
        fetch(`${API}/api/rejectnotification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                handyman_id: notificationData[0].handyman_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    New Service Request
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Name:</span>{" "}
                        {notificationData[0].user?.username}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Email:</span>{" "}
                        {notificationData[0].user?.email}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Contact:</span>{" "}
                        {notificationData[0].user?.contactNumber}
                    </div>
                </div>

                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleAccept}
                        className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleDecline}
                        className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>

    );
}

export default PopUp;
