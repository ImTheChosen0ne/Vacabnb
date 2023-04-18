const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId)
    if(spotImage) {
        await spotImage.destroy()
        res.json({ message: 'Successfully deleted' })
    } else {
        const err = new Error("Spot Image couldn't be found")
        err.statusCode = 404
        res.json({message: err.message})
    }
})

module.exports = router;
