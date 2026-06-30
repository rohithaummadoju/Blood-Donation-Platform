const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createRequest,
    updateRequestStatus,
    getDonorRequests,
    getDonationHistory,
    getRecipientRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest
} = require("../controllers/requestController");

// Create blood request
router.post("/:donorId", protect, createRequest);

// Donor Dashboard
router.get("/donor", protect, getDonorRequests);
router.get("/history", protect, getDonationHistory);
// Recipient Dashboard
router.get("/recipient", protect, getRecipientRequests);

// Update request status
router.put("/:requestId", protect, updateRequestStatus);

// Accept / Reject
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);

// Cancel request
router.put("/:id/cancel", protect, cancelRequest);

module.exports = router;