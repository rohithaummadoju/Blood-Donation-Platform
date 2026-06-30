const BloodRequest = require("../models/BloodRequest");
const User = require("../models/User");

// Create Blood Request
const createRequest = async (req, res) => {
    try {

        const recipient = req.user.id;
        const donor = req.params.donorId;

        const {
            bloodGroup,
            hospital,
            city,
            units,
            reason,
            urgency
        } = req.body;

        const donorUser = await User.findById(donor);

        if (!donorUser) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        const request = await BloodRequest.create({
            recipient,
            donor,
            bloodGroup,
            hospital,
            city,
            units,
            reason,
            urgency
        });

        res.status(201).json({
            success: true,
            message: "Blood Request Sent Successfully",
            request
        });

    } catch (error) {

        console.log("========= ERROR =========");
        console.log(error);
        console.log("=========================");
        res.status(500).json({
            success: false,
            message: error.message
    });
}
};

// Get all requests for logged in donor
const getMyRequests = async (req, res) => {

    try {

        const donorId = req.user.id;

        const requests = await BloodRequest.find({
            donor: donorId
        })
            .populate("recipient", "name phone city bloodGroup");

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Accept or Reject Request
const updateRequestStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const request = await BloodRequest.findByIdAndUpdate(

            req.params.requestId,

            { status },

            { new: true }

        );

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Status Updated",
            request
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
const getDonorRequests = async (req, res) => {
    try {

        console.log("Logged in user:", req.user);

        const donorId = req.user.id;

        console.log("Donor ID from token:", donorId);

        const requests = await BloodRequest.find({
            donor: donorId
        })
        .populate("recipient", "name phone city")
        .sort({ createdAt: -1 });

        console.log("Requests found:", requests);

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Donation History (Accepted Requests)
const getDonationHistory = async (req, res) => {

    try {

        const donorId = req.user.id;

        const history = await BloodRequest.find({
            donor: donorId,
            status: "Accepted"
        })
        .populate("recipient", "name phone city bloodGroup")
        .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            history
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const getRecipientRequests = async (req, res) => {
    try {

        const recipientId = req.user.id;

        const requests = await BloodRequest.find({
            recipient: recipientId
        })
        .populate("donor", "name phone city bloodGroup")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const cancelRequest = async (req, res) => {

    try {

        const request = await BloodRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

        // Only the recipient who created it can cancel
        if (request.recipient.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });

        }

        if (request.status !== "Pending") {

            return res.status(400).json({
                success: false,
                message: "Only pending requests can be cancelled"
            });

        }

        request.status = "Cancelled";

        await request.save();

        res.status(200).json({
            success: true,
            message: "Request Cancelled Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const acceptRequest = async (req, res) => {

    try {

        const request = await BloodRequest.findByIdAndUpdate(

            req.params.id,

            {
                status: "Accepted"
            },

            {
                new: true
            }

        );

        res.status(200).json({

            success: true,

            message: "Request Accepted",

            request

        });

    } catch (error) {

        console.log(error);

    }

};

const rejectRequest = async (req, res) => {
    try {

        const request = await BloodRequest.findByIdAndUpdate(
            req.params.id,
            {
                status: "Rejected"
            },
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Request Rejected",
            request
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};
module.exports = {
    createRequest,
    getMyRequests,
    updateRequestStatus,
    getDonorRequests,
    getDonationHistory,
    getRecipientRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest
};