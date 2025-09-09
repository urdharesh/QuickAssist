// import React from "react";
// import { motion } from "framer-motion";
// import { FaSearchLocation, FaUsers, FaTools } from "react-icons/fa";
// import img1 from "./imagesHome/img1.webp";
// import img2 from "./imagesHome/img2.webp";
// import img3 from "./imagesHome/img3.webp";
// import img5 from "./imagesHome/img5.webp";
// import { Link } from "react-router-dom";

// const images = [img1, img2, img5, img3];

// const FeatureCard = ({ icon, title, description }) => (
//     <motion.div
//         className="bg-white/80 backdrop-blur-md rounded-xl p-6 w-full sm:w-72 shadow-xl"
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1.2 }}
//     >
//         <div className="mb-3">{icon}</div>
//         <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
//         <p className="text-sm text-gray-600">{description}</p>
//     </motion.div>
// );

// const LandingPage = () => {
//     return (
//         <div className="bg-gradient-to-br from-yellow-200 to-pink-200">

//             <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
//                 {/* left side: Text content */}
//                 <div className="w-full md:w-[70%] flex flex-col justify-center items-center  mt-28 sm:mt-0 text-center px-6 sm:px-12 py-8">
//                     <motion.h1
//                         className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-800"
//                         initial={{ y: -50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ duration: 1.2 }}
//                     >
//                         Find Trusted Local Services
//                     </motion.h1>
//                     <motion.p
//                         className="text-md sm:text-lg text-gray-600 mb-8 max-w-xl"
//                         initial={{ y: 50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ duration: 1.2, delay: 0.2 }}
//                     >
//                         From handyman help to home cleaning — we've got the right person for your job.
//                     </motion.p>

//                     {/* Features */}
//                     <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6  max-w-3xl mb-8">
//                         <FeatureCard
//                             icon={<FaSearchLocation size={28} className="text-yellow-500" />}
//                             title="Search Nearby"
//                             description="Locate top-rated service providers near you instantly."
//                         />
//                         <FeatureCard
//                             icon={<FaUsers size={28} className="text-yellow-500" />}
//                             title="Verified Experts"
//                             description="Work only with trusted, verified professionals."
//                         />
//                         {/* <FeatureCard
//                             icon={<FaTools size={28} className="text-yellow-500" />}
//                             title="Quick Bookings"
//                             description="Book services at your convenience with just a few clicks."
//                         /> */}
//                     </div>

//                     <Link to="/services/servicePage">
//                         <motion.button
//                             className="mt-3 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black/80 font-semibold rounded-full shadow-md hover:translate-y-[-2px] transition-transform duration-200"
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Get Started
//                         </motion.button>
//                     </Link>
//                 </div>

//                 {/* right side: Image gallery */}
//                 <div className="hidden md:grid w-full md:w-1/2 p-4 grid-cols-2 gap-6 place-items-center my-auto">
//                     {images.map((src, idx) => (
//                         <motion.img
//                             key={idx}
//                             src={src}
//                             alt={`Gallery ${idx}`}
//                             className="w-full h-40 sm:h-44 md:h-48 lg:h-52 rounded-xl shadow-md object-cover transition-transform duration-300 hover:scale-105"
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.5, delay: idx * 0.15 }}
//                         />
//                     ))}
//                 </div>




//             </div>

//         </div>

//     );
// };

// export default LandingPage;


import React from "react";
import { motion } from "framer-motion";
import { FaSearchLocation, FaUsers, FaTools } from "react-icons/fa";
import img1 from "./imagesHome/img1.webp";
import img2 from "./imagesHome/img2.webp";
import img3 from "./imagesHome/img3.webp";
import img5 from "./imagesHome/img5.webp";
import { Link } from "react-router-dom";

const images = [img1, img2, img5, img3];

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        className="bg-white/80 backdrop-blur-md rounded-xl p-6 w-full sm:w-72 shadow-md"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
    >
        <div className="mb-3">{icon}</div>
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
);

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-br from-yellow-200 to-pink-200">

            <div className="flex flex-col md:flex-row min-h-screen  overflow-hidden">
                {/* left side: Text content */}
                <div className="w-full md:w-[70%] flex flex-col justify-center items-center text-center px-6 sm:px-12 py-12">
                    <motion.h1
                        className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-800"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        Find Trusted Local Services
                    </motion.h1>
                    <motion.p
                        className="text-md sm:text-lg text-gray-600 mb-8 max-w-xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    >
                        From handyman help to home cleaning — we've got the right person for your job.
                    </motion.p>

                    {/* Features */}
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 max-w-3xl mb-8">
                        <FeatureCard
                            icon={<FaSearchLocation size={28} className="text-yellow-500" />}
                            title="Search Nearby"
                            description="Locate top-rated service providers near you instantly."
                        />
                        <FeatureCard
                            icon={<FaUsers size={28} className="text-yellow-500" />}
                            title="Verified Experts"
                            description="Work only with trusted, verified professionals."
                        />
                        <FeatureCard
                            icon={<FaTools size={28} className="text-yellow-500" />}
                            title="Quick Bookings"
                            description="Book services at your convenience with just a few clicks."
                        />
                    </div>

                    <Link to="/services/servicePage">
                        <motion.button
                            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-full shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </div>

                {/* right side: Image gallery */}
                <div className="hidden md:flex w-full md:w-1/2 p-4 flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-y-0">
                    {images.map((src, idx) => (
                        <motion.img
                            key={idx}
                            src={src}
                            alt={`Gallery ${idx}`}
                            className={` w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 ${(idx === 2 || idx === 1) && "flex-grow"} rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105`}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                        />
                    ))}
                </div>




            </div>

        </div>

    );
};

export default LandingPage;