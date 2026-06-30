const User = require("../models/User");

// Get Logged-in User
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

// Update Availability
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

module.exports = {
    getProfile,
    updateAvailability
};