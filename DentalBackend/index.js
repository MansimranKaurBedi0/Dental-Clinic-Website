const connectMongoose = require('./db.js');
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

connectMongoose();

const app = express();
const port = 3000;

// ⭐ MUST for cookie-based auth
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ⭐ Parse JSON
app.use(express.json());

// ⭐ Parse cookies
app.use(cookieParser());

// Routes
const appointmentRoutes = require('./Routes/Appointment');
const authRoutes = require('./Routes/auth');

// Route middlewares
app.use("/user", authRoutes);          // signup/login/logout
app.use("/appointment", appointmentRoutes);  // booking, admin, etc.

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
