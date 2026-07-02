const Notification = require("../models/Notification");

// ================= Create Notification =================

const createNotification = async ({
    recipient,
    sender,
    request,
    title,
    message,
    type
}) => {

    try {

        await Notification.create({
            recipient,
            sender,
            request,
            title,
            message,
            type
        });

    } catch (error) {

        console.log("Notification Error:", error);

    }

};

// ================= Get Notifications =================

const getNotifications = async (req, res) => {

    try {

        console.log("JWT User:", req.user);

        const notifications = await Notification.find({
            recipient: req.user.id
        });

        console.log("Notifications Found:", notifications);

        res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ================= MARK AS READ =================

const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndUpdate(

            req.params.id,

            {
                isRead: true
            },

            {
                new: true
            }

        );

        if (!notification) {

            return res.status(404).json({

                success: false,

                message: "Notification not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Notification marked as read",

            notification

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// ================= DELETE NOTIFICATION =================

const deleteNotification = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({

                success: false,

                message: "Notification not found"

            });

        }

        await notification.deleteOne();

        res.status(200).json({

            success: true,

            message: "Notification deleted"

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
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification
};