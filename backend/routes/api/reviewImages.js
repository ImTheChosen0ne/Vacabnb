const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Review, ReviewImage } = require("../../db/models");

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId

    const reviewImage = await ReviewImage.findByPk(imageId, {
        include:
        {
            model: Review
        }
    })

    if(!reviewImage) {
        const err = new Error("Review Image couldn't be found")
        err.statusCode = 404
        res.status(404).json({message: err.message})
    } else if (reviewImage.Review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    } else {
        await reviewImage.destroy()
        res.json({ message: 'Successfully deleted' })
    }
})

module.exports = router;
