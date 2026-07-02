const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes=require("./routes/requestRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests",requestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Blood Donation Platform API");
});

app.get("/about", (req, res) => {
    res.send("About Blood Donation Platform");
});

app.get("/contact", (req, res) => {
    res.send("Contact us at support@blooddonation.com");
});

app.get("/help", (req, res) => {
    res.send("Help Center");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});