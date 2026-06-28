const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/api/donors", donorRoutes);
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