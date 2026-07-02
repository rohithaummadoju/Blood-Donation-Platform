const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllRequests,
    deleteRequest,
    getTopDonors
} = require("../controllers/adminController");

router.get("/dashboard", protect, getDashboardStats);
router.get("/users", protect, getAllUsers);
router.delete("/users/:id", protect, deleteUser);
router.get("/requests", protect, getAllRequests);
router.delete("/requests/:id", protect, deleteRequest);
router.get("/leaderboard", protect, getTopDonors);
module.exports = router;