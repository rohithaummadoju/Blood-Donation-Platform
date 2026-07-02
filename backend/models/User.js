const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },

    bloodGroup: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String
    },
    location: {
        latitude: {
            type: Number,
            default: null
        },
        longitude: {
            type: Number,
            default: null
        }
    },
    role: {
        type: String,
        required: true,
        enum: ["Donor", "Recipient", "Admin"]
    },

    available: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;