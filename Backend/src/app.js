const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173","https://moodify-lac-kappa.vercel.app/"],
    credentials: true
}))

/**
 * Routes
 */

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Moodify Backend is running!"
    });
});
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

module.exports = app