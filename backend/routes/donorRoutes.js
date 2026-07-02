const express = require("express");

const router = express.Router();

const {
    searchDonors,
    getMapDonors
} = require("../controllers/donorController");

router.get("/search", searchDonors);

router.get("/map", getMapDonors);

module.exports = router;