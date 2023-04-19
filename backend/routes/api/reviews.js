const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, User, ReviewImage } = require("../../db/models");

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//Get all Reviews of the Current User
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

    res.json({Reviews: reviews})
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    try {
    const reviewId = req.params.reviewId
    const reviews = await Review.findByPk(reviewId)
    if (!reviews) {
       throw new Error("Review couldn't be found")
    }

    if (reviews.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    }

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    if (reviewImages.length > 10) {
        return res.status(403).json({ message: "Maximum number of images for this resource was reached" })
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

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check('stars')
      .exists({ checkFalsy: true })
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];

//Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    try {
    const reviewId = req.params.reviewId
    const reviews = await Review.findByPk(reviewId)
console.log(reviews)
    const { review, stars } = req.body

    if(!reviews) {
        return res.status(404).json({ message: "Review couldn't be found" })
    } else if (reviews.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    }

    if (review) reviews.review = review
    if (stars) reviews.stars = stars

    await reviews.save()

    res.json(reviews)
} catch (err) {
    res.status(404).json({ message: err.message })
  }
})

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId)

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" })
    } else if (review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    } else {
        await review.destroy()
        res.json({ message: 'Successfully deleted' })
    }
})
module.exports = router;
