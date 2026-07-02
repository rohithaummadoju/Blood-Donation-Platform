const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    updateAvailability,
    updateLocation
} = require("../controllers/userController");

// Get logged-in user's profile
router.get("/profile", protect, getProfile);

// Update profile
router.put("/profile", protect, updateProfile);

// Update donor availability
router.put("/availability", protect, updateAvailability);
// Update user location
router.put("/location", protect, updateLocation);
module.exports = router;