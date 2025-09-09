import React, { useEffect, useState } from "react";
import { gethandymanToken } from "../../../../utils/cookies/getHandymanToken";

const API = process.env.REACT_APP_BACKEND_API;

function ServiceHistory() {
    const [userSelected, setUserSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const handyman_id = gethandymanToken();
    const serviceProvided = userSelected.services;

    useEffect(() => {
        const intervalId = setInterval(() => {
            const getHandyman = async () => {
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
                    setLoading(false);
                    setUserSelected(data);
                } catch (error) {
                    console.error("Invalid JSON string:", error.message);
                }
            };

            getHandyman();
        }, 5000); // check for notifications every 5 seconds

        return () => clearInterval(intervalId);
    }, [handyman_id]);

    return (
        <div className="bg-gray-50 py-10 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">
                    Your History of Work
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-yellow-100 text-gray-700 text-sm uppercase text-left">
                            <tr>
                                <th className="py-3 px-4 border-b">Date</th>
                                <th className="py-3 px-4 border-b">Customer</th>
                                <th className="py-3 px-4 border-b">Email</th>
                                <th className="py-3 px-4 border-b">Work Done</th>
                                <th className="py-3 px-4 border-b">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {
                                loading && <tr>
                                    <td colSpan="5" className="py-6 text-center text-gray-400">
                                        Loading...
                                    </td>
                                </tr>
                            }
                            {loading === false && (userSelected?.usersSelected?.length > 0 ? (
                                userSelected.usersSelected.map((user, index) => (
                                    <tr
                                        key={`${user._id}-${index}`}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="py-3 px-4 border-b">
                                            {user?.createdAt.slice(0, 10)}
                                        </td>
                                        <td className="py-3 px-4 border-b">{user?.username}</td>
                                        <td className="py-3 px-4 border-b">{user?.email}</td>
                                        <td className="py-3 px-4 border-b">{serviceProvided}</td>
                                        <td className="py-3 px-4 border-b">{user?.contactNumber}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-6 text-center text-gray-400">
                                        No work history available.
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default ServiceHistory;
