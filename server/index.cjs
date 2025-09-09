const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const port = process.env.PORT || 8000;

// use middlewares
// Set up CORS

__dirname = path.resolve();

const allowedOrigins = [
    "http://localhost:3000", //for development
    "http://localhost:8000", //for development
    "https://quick-assist.onrender.com"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// app.use(cors({
//     origin: 'https://quick-assist.onrender.com',
//     credentials: true,
// }));
// app.use(cors());
app.use(express.json());

// MongoDB Connection
const con = require("./db/connection");

// Using Routes
app.use("/api", require("./routes/route"));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/notificationRoutes"));
app.use("/api", require("./routes/paymentRoutes"));



// // if (process.env.NODE_ENV === "production") {
// // serve React build
// app.use(express.static(path.join(__dirname, "client", "build")));

// app.get("*", (_, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
// // } else {
// // dev mode test route
// //     app.get("/", (req, res) => {
// //         res.send("API running in development mode 🚀");
// //     });
// // }

// // ONLY serve static files in production
// if (process.env.NODE_ENV === "production") {
//     // Serve React build
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// } else {
//     // Development mode test route
//     app.get("/", (req, res) => {
//         res.send("API running in development mode 🚀");
//     });
// }




con.then((db) => {
    if (!db) return process.exit(1);
    else {
        // listen to the http server
        app.listen(port, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Server is running on: http://localhost:${port}`);
            }
        });
        app.on("error", (err) =>
            console.log("Failed to Connect with HTTP Server: " + err)
        );
    }
    // error in mongodb connection
}).catch((error) => {
    console.log("Connection failed...!" + error);
});
