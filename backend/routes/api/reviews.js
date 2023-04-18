const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");
// const review = require("../../db/models/review");
// const spot = require("../../db/models/spot");

router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ['id', 'userId', 'spotId', 'review', 'stars'],
        include: [
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        },
        ]
    })

    res.json({reviews})
})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    try {
    const reviewId = req.params.reviewId
    const reviews = await Review.findByPk(reviewId)
    if (!reviews) {
       new Error("Review couldn't be found")
    }
    const { url } = req.body

    const reviewImage = await ReviewImage.create({
        reviewId: reviewId,
        url,
    })

    res.json({id: reviewImage.id, url: reviewImage.url})
    } catch (err) {
    res.status(404).json({message: err.message})
    }
})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    try {
    const reviewId = req.params.reviewId
    const reviews = await Review.findByPk(reviewId)

    const { review, stars } = req.body

    // if (review.userId !== req.user.id) {
    //     requireAuth()
    // }

    if (review) reviews.review = review
    if (stars) reviews.stars = stars

    await reviews.save()

    res.json(reviews)
    } catch (err) {
    next(err);
}
})


module.exports = router;
