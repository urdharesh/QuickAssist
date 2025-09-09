import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ServicePerson from "./ServicePerson";

const API = process.env.REACT_APP_BACKEND_API;

function ServiceProvider() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const service = searchParams.get('service'); // 'handy man'
    const serviceSelected = new URLSearchParams(location.search).get("service");
    const [handymen, setHandymen] = useState(null);
    const [sortedHandymen, setSortedHandymen] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    useEffect(() => {
        const fetchHandymen = async () => {
            await fetch(
                `${API}/api/handyman/getallhandyman`
            )
                .then((response) => response.json())
                .then((handymen) => setHandymen(handymen));
        };

        fetchHandymen();
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

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    useEffect(() => {
        // assuming serviceSelected is a string containing the selected service
        const filteredHandymen = handymen?.filter(
            (handyman) => handyman.services.toLowerCase() === serviceSelected
        );
        // Fetch handymen data from the backend
        // setLat(new URLSearchParams(location.search).get("lat"));
        // setLong(new URLSearchParams(location.search).get("long"));
        setLat(parseFloat(new URLSearchParams(location.search).get("lat")));
        setLong(parseFloat(new URLSearchParams(location.search).get("long")));

        // Sort handymen based on their distance from the user
        const sortedHandymen = filteredHandymen?.sort((a, b) => {
            const distanceA = calculateDistance(lat, long, a?.lat, a?.long);
            const distanceB = calculateDistance(lat, long, b?.lat, b?.long);
            return distanceA - distanceB;
        });
        setSortedHandymen(sortedHandymen);

    }, [handymen, lat, long]);

    const filteredProviders = sortedHandymen?.filter(
        (provider) => provider.services?.toLowerCase() === service?.toLowerCase()
    ) || [];

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">{service} near your location</h1>
                    <p className="text-gray-600">Choose one to proceed for the booking</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {filteredProviders.length != 0 && filteredProviders.map((provider) =>

                        <ServicePerson key={provider.handyman_id} {...provider} />)}
                </div>

                {filteredProviders.length == 0 && (<div className=" text-center py-10 text-gray-500 text-lg">
                    <p>
                        No <span className="font-semibold text-gray-700 ">{service}</span> service
                        providers have registered yet.
                    </p>
                    <p>Please check back later!</p>
                </div>)}

            </div>
        </div>

    );
}

export default ServiceProvider;
