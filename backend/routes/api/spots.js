const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const review = require("../../db/models/review");
const spot = require("../../db/models/spot");


router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include:
        {
            model: SpotImage,
            attributes: ['url']
        }
    })

    for(let spot of spots) {
    const { id } = spot

    const reviews = await Review.findAll({
        where: {
            spotId: id
        }
    })
    let reviewForSpot = reviews.filter(review => review.spotId === spot.id)
    let starTotal = reviewForSpot.reduce((acc, curr) => acc += curr.star, 0)
    spot.avgRating = starTotal / reviewForSpot.length
    }

    // const spotImage = await SpotImage.findAll()
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

        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId)

        if(!spot || spot.ownerId !== req.user.id) {
            throw new Error()
        }

        const spotImage = await SpotImage.create({
            url,
            preview,
            spotId
        })

        res.status(201).json({ id: spotImage.id, url: spotImage.url, preview: spotImage.preview })
    } catch (err) {
        res.status(404).json( {"message": "Spot couldn't be found"})
    }
})

module.exports = router;
