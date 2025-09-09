
import { Link, useParams } from "react-router-dom";
// import DropDown from "../../../utils/DropDown";
import Mapbox from "../../../utils/Mapbox.js";
import useGeoLocation from "../../../utils/useGeoLocation.js";
import Navbar from "../../Global Components/Navbar/Navbar.jsx";

function Service() {
    const { serviceName } = useParams();
    // const [selected, setSelected] = useState("");
    const location = useGeoLocation();

    // const options = ["List All", "50", "120", "200"];

    return (
        <div className="bg-[#fef9f5] min-h-screen flex flex-col gap-52 md:gap-20">
            <Navbar />

            {/* Map Section */}
            <div className="w-full h-64 md:h-96 bg-gray-200">
                <Mapbox
                    lat={location?.coordinates?.lat}
                    long={location?.coordinates?.lng}
                    addOnStyle={"mt-20"}
                />
                <p className="text-center text-gray-600 text-sm mt-2">
                    Showing your current location
                </p>
            </div>

            {/* Form Section */}
            <div className="w-full px-4 sm:px-0 sm:w-1/2  mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                    {serviceName.charAt(0).toUpperCase() + serviceName.slice(1)} Service
                </h1>

                <div className="mb-4 flex justify-between text-sm text-gray-600">
                    <span>Platform Charge</span>
                    <span className="text-gray-900 font-semibold">₹ 20</span>
                </div>

                {/* <div className="mb-6 flex justify-between items-center">
                    <span className="text-sm text-gray-600 ">Select Estimated Price</span>
                    <DropDown
                        options={options}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div> */}

                <div className="mt-6 text-center">

                    <Link
                        to={`/services/serviceProvider?service=${serviceName}&lat=${location?.coordinates?.lat}&long=${location?.coordinates?.lng}`}
                    >
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                            Continue
                        </button>
                    </Link>

                    {/* {selected ? (
                        <Link
                            to={`/services/serviceProvider?service=${serviceName}&lat=${location?.coordinates?.lat}&long=${location?.coordinates?.lng}&cost=${selected}`}
                        >
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                                Continue
                            </button>
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="bg-gray-300 text-gray-500 font-medium px-6 py-3 rounded-lg cursor-not-allowed"
                        >
                            Select a service
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default Service;
