const User = require("../models/User");

const searchDonors = async (req, res) => {
    try {
        const { bloodGroup, city } = req.query;

        const query = {
            role: "Donor",
            available: true,
        };

        if (bloodGroup) {
            query.bloodGroup = bloodGroup;
        }

        if (city) {
            query.city = city;
        }

        const donors = await User.find(query).select("-password");

        res.status(200).json({
            success: true,
            count: donors.length,
            donors,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    searchDonors,
};