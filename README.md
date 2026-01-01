🚀 QuickAssist – Local Service Finder

QuickAssist is a full-stack MERN web application that helps users find and book local service providers such as plumbers, electricians, mechanics, and tutors based on their current location or selected service category.

🔗 Live Demo: https://quick-assist.onrender.com/

📌 Problem Statement

Finding reliable local service providers quickly is often difficult and unorganized. QuickAssist solves this by providing a centralized platform where users can discover, book, and pay service professionals securely.

🛠️ Tech Stack
Frontend

React.js

JavaScript

HTML5 & CSS3

Tailwind CSS

Axios

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Nodemailer

Stripe Payment Gateway

Tools & Services

MongoDB Atlas

Render (Deployment)

Mapbox (Location & Maps)

✨ Core Features

🔐 Authentication & Authorization

Separate registration for users and service providers

JWT-based secure login

Protected routes

📍 Location-Based Service Discovery

Detects user location using Geolocation API

Manual service search fallback

🔍 Search & Filter

Browse services by category

View service provider details

💳 Secure Payments

Stripe payment integration

Safe and verified transactions

📧 Email Notifications

Booking confirmation emails using Nodemailer

📱 Responsive UI

Fully responsive design for mobile and desktop

🧠 Project Architecture
Backend (MVC Pattern)

Controllers – Business logic (users, services, payments, emails)

Models – MongoDB schemas

Routes – API endpoints

Middleware – Authentication & validation

Frontend

Feature-based component structure

Reusable UI components

Utility functions for token and location handling



QuickAssist
├── client
│   ├── public
│   └── src
│       ├── components
│       ├── utils
│       ├── App.js
│       └── index.js
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── db
├── .env
├── package.json
└── README.md

dashboard

🚧 Challenges Faced

Handling authentication persistence on page refresh

Managing secure payment flow with Stripe

Dealing with Render cold start delays

Coordinating frontend–backend API communication

🔮 Future Enhancements

Real-time chat between users and providers

Geo-spatial queries for accurate distance filtering

Admin dashboard

Ratings and reviews

Push notifications
