const User = require("../models/User");

const searchDonors = async (req, res) => {
    try {
        const { bloodGroup, city } = req.query;
        console.log(req.query);
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

        console.log("Search Query:", query);

        const donors = await User.find(query).select("-password");

        console.log("Found Donors:", donors);

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