import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

const API = process.env.REACT_APP_BACKEND_API;

function HandymanProfile() {
    const location = useLocation();
    const handyman_id = new URLSearchParams(location.search).get("handyman_id");
    const [handymanData, setHandymanData] = useState(null);

    // console.log(handyman_id);

    useEffect(() => {
        const fetchHandyman = async () => {
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
                // console.log(data);

                if (response.status == 200) {
                    setHandymanData(data);
                } else {
                    console.error(`Failed with status code ${response.status}`);
                }
            } catch (error) {
                console.error("Invalid JSON string:", error.message);
            }
        };
        fetchHandyman();
    }, []);

    return (
        <>
            <DashboardNavbar />
            <div className="bg-gray-50 py-10 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Photo */}
                        <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-gray-200 shadow-md">
                            <img
                                src={handymanData?.profile}
                                alt="Handyman Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Profile Details */}
                        <div className="text-gray-700 w-full">
                            <h2 className="text-2xl font-bold text-yellow-500 mb-2">{handymanData?.name}</h2>
                            <p className="text-base mb-1"><span className="font-semibold">Phone:</span> +91 {handymanData?.phone}</p>
                            <p className="text-base mb-1"><span className="font-semibold">Occupation:</span> {handymanData?.services}</p>
                            <p className="text-base mb-1"><span className="font-semibold">Aadhar Number:</span> {handymanData?.aadharNumber}</p>
                            <p className="text-base"><span className="font-semibold">Joined on:</span> {handymanData?.createdAt?.slice(0, 10)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default HandymanProfile;
