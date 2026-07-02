const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");

// Dashboard Statistics
// Dashboard Statistics
const getDashboardStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalDonors = await User.countDocuments({
            role: "Donor"
        });

        const totalRecipients = await User.countDocuments({
            role: "Recipient"
        });

        const totalRequests = await BloodRequest.countDocuments();

        const acceptedRequests = await BloodRequest.countDocuments({
            status: "Accepted"
        });

        const rejectedRequests = await BloodRequest.countDocuments({
            status: "Rejected"
        });

        const pendingRequests = await BloodRequest.countDocuments({
            status: "Pending"
        });
        const chartData = {
            labels: ["Accepted", "Rejected", "Pending"],
            datasets: [
            {
                label: "Blood Requests",
                data: [
                    acceptedRequests,
                    rejectedRequests,
                    pendingRequests
                ],
                backgroundColor: [
                    "#28a745",
                    "#dc3545",
                    "#ffc107"
                ]
            }
        ]
    };

    res.status(200).json({
        success: true,
        stats: {
            totalUsers,
            totalDonors,
            totalRecipients,
            totalRequests,
            acceptedRequests,
            rejectedRequests,
            pendingRequests
        },
        chartData
    });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get All Users
const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Delete User
const deleteUser = async (req, res) => {

    try {

        // Prevent admin from deleting themselves
        if (req.user.id === req.params.id) {

            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account."
            });

        }

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get All Blood Requests
const getAllRequests = async (req, res) => {

    try {

        const requests = await BloodRequest.find()
            .populate("recipient", "name")
            .populate("donor", "name")
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

// Delete Blood Request
const deleteRequest = async (req, res) => {

    try {

        const request = await BloodRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

        await BloodRequest.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Request deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const getTopDonors = async (req, res) => {

    try {

        const donors = await BloodRequest.aggregate([

            {
                $match: {
                    status: "Accepted"
                }
            },

            {
                $group: {
                    _id: "$donor",
                    donations: { $sum: 1 }
                }
            },

            {
                $sort: {
                    donations: -1
                }
            },

            {
                $limit: 10
            }

        ]);

        const leaderboard = [];

        for (const donor of donors) {

            const user = await User.findById(donor._id).select(
                "name bloodGroup city"
            );

            if (user) {

                leaderboard.push({

                    _id: user._id,

                    name: user.name,

                    bloodGroup: user.bloodGroup,

                    city: user.city,

                    donations: donor.donations

                });

            }

        }

        res.status(200).json({

            success: true,

            leaderboard

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
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllRequests,
    deleteRequest,
    getTopDonors
};