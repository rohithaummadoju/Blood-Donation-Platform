const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            phone,
            age,
            gender,
            bloodGroup,
            city,
            address,
            role
        } = req.body;

        // Check if user already exists
        // Debug logs
console.log("=== REGISTER REQUEST ===");
console.log("Email:", email);

const mongoose = require("mongoose");
console.log("Mongo readyState:", mongoose.connection.readyState);
console.log("Database:", mongoose.connection.name);

// Check if user already exists
const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("================================");
        console.log("Original Password :", password);
        console.log("Hashed Password   :", hashedPassword);
        console.log("================================");

        // Save user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            age,
            gender,
            bloodGroup,
            city,
            address,
            role
        });
        await sendEmail(

    user.email,

    "Welcome to On Live Blood Share",

    `
    <div style="font-family:Arial;padding:20px">

        <h2 style="color:#d9534f;">
            🩸 Welcome to On Live Blood Share
        </h2>

        <p>Hello <strong>${user.name}</strong>,</p>

        <p>
            Your account has been created successfully.
        </p>

        <table
            style="border-collapse:collapse;"
            cellpadding="8"
        >

            <tr>

                <td><strong>Name</strong></td>

                <td>${user.name}</td>

            </tr>

            <tr>

                <td><strong>Email</strong></td>

                <td>${user.email}</td>

            </tr>

            <tr>

                <td><strong>Role</strong></td>

                <td>${user.role}</td>

            </tr>

        </table>

        <br>

        <p>
            Thank you for becoming a part of our mission to save lives through blood donation.
        </p>

        <hr>

        <p style="color:gray;">
            Team On Live Blood Share
        </p>

    </div>
    `
);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("Entered Password :", password);
        console.log("Stored Password  :", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password Match :", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};