const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const review = require("../../db/models/review");
const spot = require("../../db/models/spot");



module.exports = router;
