const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");
const review = require("../../db/models/review");
const spot = require("../../db/models/spot");


router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include:[
        {
            model: SpotImage,
        },
        {
            model: Review,
        },
    ]
    })


    res.json({spots})
})

router.get('/current', async (req, res, next) => {
    const user = await User.findAll({
        include:
        {
            model: Spot,
        }
    })

    res.json({user})
})

router.get('/:spotId', async (req, res, next) => {
    try{
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId,{
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                ttributes: ['id', 'firstName', 'lastName']
        }
    ]
    })

    if (!spot) throw new Error()

    res.json(spot)
} catch (err) {
    res.status(404).json({message: "Spot couldn't be found"})
}
})

router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201).json(spot)
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    try {
        const { url, preview } = req.body

        const spotId = parseInt(req.params.spotId)
        const spot = await Spot.findByPk(spotId)

        if(!spot || spot.ownerId !== req.user.id) {
            throw new Error("Spot couldn't be found")
        }

        const spotImage = await SpotImage.create({
            url,
            preview,
            spotId
        })

        res.status(201).json({ id: spotImage.id, url: spotImage.url, preview: spotImage.preview })
    } catch (err) {
        res.status(404).json( {message: err.message})
    }
})

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if (address) spot.address = address
    if (city) spot.city = city
    if (state) spot.state = state
    if (country) spot.country = country
    if (lat) spot.lat = lat
    if (lng) spot.lng = lng
    if (name) spot.name = name
    if (description) spot.description = description
    if (price) spot.price = price

    await spot.save()

    res.json(spot)
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(spot) {
        await spot.destroy()
        res.json('Successfully deleted')
    } else {
        const err = new Error("Spot couldn't be found")
        err.statusCode = 404
        res.json({message: err.message})
    }
})

router.get('/:spotId/reviews', async (req, res, next) => {
    try {
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId)
        if(!spot) {
            throw new Error("Spot couldn't be found")
        }

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        },
        ]
    })

    res.json({reviews})
    } catch (err) {
        res.status(404).json( {message: err.message})
    }
})

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId)

        const spot = await Spot.findByPk(spotId)
        if(!spot) {
            throw new Error("Spot couldn't be found")
        }
        const { review, stars } = req.body

        const reviews = await Review.create({
            userId: req.user.id,
            spotId: spotId,
            review,
            stars
        })

    res.status(201).json({id: reviews.id,
        userId: reviews.userId,
        spotId: reviews.spotId,
        review: reviews.review,
        stars: reviews.stars,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt})
    } catch (err) {
        res.status(404).json( {message: err.message})
    }
})

module.exports = router;
