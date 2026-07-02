const User = require("../models/User");

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {

    try {

        const {
            name,
            phone,
            city,
            address
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.city = city || user.city;
        user.address = address || user.address;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ================= UPDATE AVAILABILITY =================
const updateAvailability = async (req, res) => {

    try {

        const { available } = req.body;

        const user = await User.findByIdAndUpdate(

            req.user.id,

            {
                available
            },

            {
                new: true
            }

        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Availability Updated Successfully",
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ================= UPDATE LOCATION =================

const updateLocation = async (req, res) => {

    try {

        const { latitude, longitude } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        user.location = {
            latitude,
            longitude
        };

        await user.save();

        res.status(200).json({
            success: true,
            message: "Location Updated Successfully",
            user
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
    getProfile,
    updateProfile,
    updateAvailability,
    updateLocation
};