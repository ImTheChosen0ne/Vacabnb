const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");

//Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId
    const spotImage = await SpotImage.findByPk(imageId, {
        include:
        {
            model: Spot
        }
    })
    if(!spotImage) {
        const err = new Error("Spot Image couldn't be found")
        res.status(404).json({message: err.message})
    } else if (spotImage.Spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    } else {
        await spotImage.destroy()
        res.json({message: 'Successfully deleted' })
    }
})

module.exports = router;
