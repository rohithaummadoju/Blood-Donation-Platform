const BloodRequest = require("../models/BloodRequest");
const User = require("../models/User");
const { createNotification } = require("./notificationController");
const sendEmail = require("../utils/sendEmail");
// ================= CREATE REQUEST =================

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

        // Create Notification for Donor

        await createNotification({

            recipient: donor,

            sender: recipient,

            request: request._id,

            title: "New Blood Request",

            message: "A new blood request has been sent to you.",

            type: "request"

        });
        await sendEmail(
    donorUser.email,
    "🩸 New Blood Request Received",
    `
    <div style="font-family:Arial;padding:20px">

        <h2 style="color:#dc3545;">
            🩸 New Blood Request
        </h2>

        <p>Hello <strong>${donorUser.name}</strong>,</p>

        <p>
            You have received a new blood request.
        </p>

        <table cellpadding="8">

            <tr>
                <td><strong>Blood Group</strong></td>
                <td>${bloodGroup}</td>
            </tr>

            <tr>
                <td><strong>Hospital</strong></td>
                <td>${hospital}</td>
            </tr>

            <tr>
                <td><strong>City</strong></td>
                <td>${city}</td>
            </tr>

            <tr>
                <td><strong>Urgency</strong></td>
                <td>${urgency}</td>
            </tr>

        </table>

        <br>

        <p>
            Please login to your account and respond to the request.
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

// ================= GET MY REQUESTS =================

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

// ================= UPDATE REQUEST STATUS =================

const updateRequestStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const request = await BloodRequest.findByIdAndUpdate(

            req.params.requestId,

            {

                status

            },

            {

                new: true

            }

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
// ================= GET DONOR REQUESTS =================

const getDonorRequests = async (req, res) => {

    try {

        const donorId = req.user.id;

        const requests = await BloodRequest.find({

            donor: donorId

        })

        .populate("recipient", "name phone city bloodGroup")

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

// ================= DONATION HISTORY =================

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

// ================= RECIPIENT REQUESTS =================

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
// ================= CANCEL REQUEST =================

const cancelRequest = async (req, res) => {

    try {

        const request = await BloodRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

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

// ================= ACCEPT REQUEST =================

const acceptRequest = async (req, res) => {
    console.log("Accept Request API Called");

    try {

        console.log("===== ACCEPT REQUEST =====");

        const request = await BloodRequest.findById(req.params.id);

        console.log("Request:", request);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

        request.status = "Accepted";

        await request.save();

        console.log("Status Updated");

        await createNotification({

            recipient: request.recipient,

            sender: request.donor,

            request: request._id,

            title: "Blood Request Accepted",

            message: "Your blood request has been accepted by the donor.",

            type: "accepted"

        });

        console.log("Notification Created");

        const recipientUser = await User.findById(request.recipient);

        console.log("Recipient:", recipientUser);

        if (recipientUser) {

            console.log("Sending Email to:", recipientUser.email);

            await sendEmail(
                recipientUser.email,
                "🩸 Blood Request Accepted - On Live Blood Share",
                `
                <div style="max-width:650px;margin:0 auto;font-family:Arial,sans-serif;background:#f8f9fa;padding:30px;border-radius:10px;border:1px solid #ddd;">

                <div style="text-align:center;">
                <h1 style="color:#dc3545;margin-bottom:5px;">
                    🩸 On Live Blood Share
                </h1>
                <p style="color:#666;font-size:16px;">
                    Save Lives Digitally
                </p>
                </div>

                <hr style="margin:20px 0;">

                 <h2 style="color:#28a745;">
                ✅ Blood Request Accepted
                </h2>

                <p>Dear <strong>${recipientUser.name}</strong>,</p>

                <p>
                    We are pleased to inform you that your blood request has been
                <strong style="color:green;">accepted</strong> by a donor.
                </p>

                <div style="background:#ffffff;padding:15px;border-radius:8px;border-left:5px solid #28a745;margin:20px 0;">
                <h3 style="margin-top:0;">Request Details</h3>

                <p><strong>Blood Group:</strong> ${request.bloodGroup}</p>
                <p><strong>Hospital:</strong> ${request.hospital}</p>
                <p><strong>City:</strong> ${request.city}</p>
                <p><strong>Status:</strong> Accepted ✅</p>
            </div>

            <p>
                Please log in to your account to view the request details and coordinate the donation.
            </p>

            <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.FRONTEND_URL}/login"
                style="background:#dc3545;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;font-weight:bold;">
                    Login to Your Account
            </a>
            </div>

            <hr>

            <p style="font-size:14px;color:#666;">
                Thank you for choosing <strong>On Live Blood Share</strong>.
                Every donation has the potential to save a life.
            </p>

            <p style="font-size:14px;color:#666;">
                Regards,<br>
                <strong>On Live Blood Share Team</strong>
            </p>

            </div>
            `
        );
    }

        res.status(200).json({

            success: true,

            message: "Request Accepted",

            request

        });

    } catch (error) {

        console.log("ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// ================= REJECT REQUEST =================

const rejectRequest = async (req, res) => {

    try {

        const request = await BloodRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

        request.status = "Rejected";

        await request.save();

        await createNotification({

            recipient: request.recipient,

            sender: request.donor,

            request: request._id,

            title: "Blood Request Rejected",

            message: "Your blood request has been rejected by the donor.",

            type: "rejected"

        });
        const recipientUser = await User.findById(request.recipient);

if (recipientUser) {

    await sendEmail(
        recipientUser.email,
        "❌ Blood Request Update - On Live Blood Share",
        `
        <div style="max-width:650px;margin:0 auto;font-family:Arial,sans-serif;background:#f8f9fa;padding:30px;border-radius:10px;border:1px solid #ddd;">

            <div style="text-align:center;">
                <h1 style="color:#dc3545;">🩸 On Live Blood Share</h1>
                <p style="color:#666;">Save Lives Digitally</p>
            </div>

            <hr>

            <h2 style="color:#dc3545;">❌ Blood Request Update</h2>

            <p>Dear <strong>${recipientUser.name}</strong>,</p>

            <p>
                We regret to inform you that your blood request was not accepted by the donor.
            </p>

            <div style="background:#fff;padding:15px;border-left:5px solid #dc3545;border-radius:8px;">
                <p><strong>Blood Group:</strong> ${request.bloodGroup}</p>
                <p><strong>Hospital:</strong> ${request.hospital}</p>
                <p><strong>City:</strong> ${request.city}</p>
                <p><strong>Status:</strong> Rejected ❌</p>
            </div>

            <p style="margin-top:20px;">
                Don't lose hope. Please log in and search for other available donors.
            </p>

            <div style="text-align:center;margin:30px 0;">
                <a href="${process.env.FRONTEND_URL}/login"
                   style="background:#dc3545;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;font-weight:bold;">
                    Find Another Donor
                </a>
            </div>

            <hr>

            <p style="font-size:14px;color:#666;">
                Thank you for using <strong>On Live Blood Share</strong>.
            </p>

        </div>
        `
    );
}

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