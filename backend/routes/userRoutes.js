const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateAvailability
} = require("../controllers/userController");

// Get logged-in user's profile
router.get("/profile", protect, getProfile);

// Update donor availability
router.put("/availability", protect, updateAvailability);

module.exports = router;