const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   DB CONNECT
========================= */
connectDB();

/* =========================
   ROUTES
========================= */
app.use("/", authRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);

// Health check route (used by uptime monitor)
app.get("/api/health", (req, res) => {
   res.status(200).send("Server is alive ✅");
});

/* =========================
   START SERVER
========================= */
app.listen(5000, '0.0.0.0', () => console.log("Server running on 5000"));