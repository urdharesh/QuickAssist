import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Global Components/Navbar/Navbar.jsx";




const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.15, duration: 0.6 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-transparent to-pink-200">
            <Navbar />
            <motion.div
                className=" px-6 py-20 flex items-center justify-center text-gray-800  "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="md:m-10 max-w-5xl w-full md:bg-white/70 backdrop-blur-md border-none md:border border-yellow-300/30 shadow-lg rounded-3xl p-10"
                    variants={itemVariants}
                >
                    <motion.h1
                        className="text-4xl font-bold text-black md:text-yellow-500 mb-6 text-center"
                        variants={itemVariants}
                        tabIndex={0}
                        aria-label="About Quick Assist"
                    >
                        About Quick Assist
                    </motion.h1>

                    <motion.p className="text-lg mb-6 leading-relaxed" variants={itemVariants}>
                        <strong className=" md:text-yellow-500">Quick Assist</strong> is an on-demand handyman
                        service platform designed to connect users with reliable service providers in their area.
                        From electrical repairs to plumbing, appliance installations, and general maintenance —
                        we've made it easier than ever to get help when you need it.
                    </motion.p>

                    <motion.p className="text-lg mb-10 leading-relaxed" variants={itemVariants}>
                        Our mission is to simplify your life by providing trustworthy, quick, and efficient
                        assistance for your day-to-day household problems. With real-time location tracking,
                        verified workers, and a smooth booking experience, Quick Assist ensures your peace of mind
                        while getting things done.
                    </motion.p>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
                        variants={containerVariants}
                    >
                        {[
                            {
                                title: "🛠 Verified Professionals",
                                desc: "Each handyman is background-verified, identity-checked, and reviewed to ensure safety and quality.",
                            },
                            {
                                title: "⚡ Instant Booking",
                                desc: "Book a nearby expert in just a few clicks with real-time tracking and availability status.",
                            },
                            {
                                title: "📍 Location-Based Matching",
                                desc: "We match you with professionals closest to your current location for quicker service.",
                            },
                            {
                                title: "📱 Easy to Use",
                                desc: "User-friendly interface for both service seekers and providers, making the entire process smooth.",
                            },
                            {
                                title: "🛡 Safe & Secure",
                                desc: "Data privacy and secure payment options are built into our platform to protect both users and workers.",
                            },
                        ].map((feature, index) => (
                            <motion.section
                                key={index}
                                className="bg-white border border-yellow-300 rounded-2xl p-6 shadow-md hover:shadow-yellow-400/40 transition cursor-default"
                                aria-labelledby={`feature-title-${index}`}
                                tabIndex={0}
                                variants={itemVariants}
                            >
                                <h2
                                    id={`feature-title-${index}`}
                                    className="text-xl font-semibold text-yellow-500 mb-2"
                                >
                                    {feature.title}
                                </h2>
                                <p className="text-gray-700">{feature.desc}</p>
                            </motion.section>
                        ))}
                    </motion.div>

                    <motion.p
                        className="text-gray-800 text-lg text-center leading-relaxed"
                        variants={itemVariants}
                    >
                        Whether you're a busy professional, an elderly citizen, or someone in urgent need of help —{" "}
                        <strong className="text-yellow-500">Quick Assist</strong> is built for you. Join us in
                        making daily life easier, safer, and more efficient.
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;
