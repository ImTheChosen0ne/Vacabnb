const express = require("express");
const router = express.Router();

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { Op } = require("sequelize");

const validateQuerys = [
    check('page')
      .exists({ checkFalsy: true })
      .isFloat({ min: 1 })
      .withMessage("Page must be greater than or equal to 1"),
    check('size')
      .exists({ checkFalsy: true })
      .isFloat({ min: 1 })
      .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
      .optional()
      .isDecimal({ decimal_digits: '1,2' })
      .withMessage("Minimum latitude is invalid"),
    check('maxLat')
      .optional()
      .isDecimal({ decimal_digits: '1,2' })
      .withMessage("Maximum latitude is invalid"),
    check('minLng')
      .optional()
      .isDecimal({ decimal_digits: '1,2' })
      .withMessage("Minimum longitude is invalid"),
    check('maxLng')
      .optional()
      .isDecimal({ decimal_digits: '1,2' })
      .withMessage("Maximum longitude is invalid"),
    check('minPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
  ];

//Get all Spots
router.get('/', validateQuerys, async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const pagination = {}

    page = !isNaN(page) && page > 0 ? parseInt(page) : 1
    size = !isNaN(size) && size > 0 ? parseInt(size) : 20

    const where = {};
    if (page > 10 ) page = 10
    if (size > 20 ) size = 20

    if (minLat) {
        where.lat = { [Op.gte]: minLat }
    }
    if (maxLat) {
        where.lat = { [Op.lte]: maxLat }
    }

    if (minLng) {
        where.lng = { [Op.gte]: minLng }
    }

    if (maxLng) {
        where.lng = { [Op.lte]: maxLng }
    }

    if (minPrice) {
        where.price = { [Op.gte]: minPrice }
    }

    if (maxPrice) {
        where.price = { [Op.lte]: maxPrice }
    }

    if (minLat && maxLat) {
        where.lat = { [Op.between]: [minLat, maxLat] }
    }

    if (minLng && maxLng) {
        where.lng = { [Op.between]: [minLng, maxLng] }
    }

    if (minPrice && maxPrice) {
        where.price = { [Op.between]: [minPrice, maxPrice] }
    }


    pagination.limit = size;
    pagination.offset = size * (page - 1)

    const spots = await Spot.findAll({
        where,
        ...pagination,
        raw: true,
    });

      for (let i = 0; i < spots.length; i++) {
        const spot = spots[i]

        const reviews = await Review.findAll({
          attributes: ['stars'],
          where: {
            spotId: spot.id,
          },
        });

          let count = 0

          for (let j = 0; j < reviews.length; j++) {
            const review = reviews[j]
            count += review.stars
          }

          spot.avgRating = count / reviews.length;

        const url = await SpotImage.findOne({
          attributes: ['url'],
          where: {
            spotId: spot.id,
          },
        });

        if (url) {
          spot.previewImage = url.url
        }

      }

      res.json({ spots, page, size });
  });

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        raw: true,
        where: {
            ownerId: req.user.id
        }
    })

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i]

        const reviews = await Review.findAll({
          attributes: ['stars'],
          where: {
            spotId: spot.id,
          },
        });

          let count = 0

          for (let j = 0; j < reviews.length; j++) {
            const review = reviews[j]
            count += review.stars
          }

          spot.avgRating = count / reviews.length;

        const url = await SpotImage.findOne({
          attributes: ['url'],
          where: {
            spotId: spot.id,
          },
        });

        if (url) {
          spot.previewImage = url.url
        }

      }

    res.json({spots})
})

//Get details of a Spot from an id
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
                attributes: ['id', 'firstName', 'lastName']
        }
    ]
    })

    if (!spot) throw new Error("Spot couldn't be found")

    res.json(spot)
} catch (err) {
    res.status(404).json({ message: err.message})
}
})

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
    //   .isLength({ min: 0, max: 50 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];

//Create Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
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

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

        const { url, preview } = req.body

        const spotId = parseInt(req.params.spotId)
        const spot = await Spot.findByPk(spotId)

        if(!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" })
        } else if (spot.ownerId !== req.user.id) {
            return res.status(403).json({ message:"Forbidden" })
        }

        const spotImage = await SpotImage.create({
            url,
            preview,
            spotId
        })

        res.status(201).json({ id: spotImage.id, url: spotImage.url, preview: spotImage.preview })
})

//Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    } else if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    }

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

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    } else if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    } else {
        await spot.destroy()
        res.json({ message: 'Successfully deleted' })
    }
})

//Get all Reviews by a Spot's id
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

    res.json({Reviews: reviews})
    } catch (err) {
        res.status(404).json( {message: err.message})
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

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId)

        const spot = await Spot.findByPk(spotId)
        if(!spot) {
            throw new Error("Spot couldn't be found")
        }

        const existingReview = await Review.findOne({
            where: {
                spotId: spotId,
                userId: req.user.id
            }
        })

        if (existingReview){
            return res.status(500).json({ message: "User already has a review for this spot" })
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

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    try {
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId)
        if(!spot) {
            throw new Error("Spot couldn't be found")
        }
        if (spot.ownerId === req.user.id) {
        const bookings = await Booking.findAll({
        // attributes: ['id', 'spotId'],
        where: {
            spotId: spotId
        },
        include: [
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
        ]
    })

     return res.json({ Bookings: bookings})
    } else {
        const bookings = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate' ],
            where: {
                spotId: spotId
            },
        })

     return res.json({ Bookings: bookings})
    }
    } catch (err) {
        res.status(404).json( {message: err.message})
    }
})


//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    try {
        const spotId = parseInt(req.params.spotId)

        const spot = await Spot.findByPk(spotId)

        if(!spot) {
            throw new Error("Spot couldn't be found")
        }

        if (spot.ownerId === req.user.id) {
            return res.status(500).json({ message: "Cannot create a booking if user is owner." })
        }

        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
              message: "Bad Request",
              errors: {
                endDate: "endDate cannot be on or before startDate"
              }
            })
          }

        const conflictingBookings = await Booking.findAll({
            where: {
              spotId: spotId,
              [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } }
              ]
            }
          })

          if (conflictingBookings.length) {
            return res.status(403).json({
              message: "Sorry, this spot is already booked for the specified dates",
              errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
              }
            })
          }

        //   const error = {}
        //   const conflictingBookingsStart = await Booking.findAll({
        //       where: {
        //         spotId: spotId,
        //         [Op.or]: [
        //           { startDate: { [Op.between]: [startDate, endDate] } },
        //         ]
        //       }
        //     })

        //     const conflictingBookingsEnd = await Booking.findAll({
        //       where: {
        //         spotId: spotId,
        //         endDate: { [Op.between]: [startDate, endDate] } }
        //     })

        //     if (conflictingBookingsStart.length > 0) {
        //       error.startDate = "Start date conflicts with an existing booking";
        //     }
        //     if (conflictingBookingsEnd.length > 0) {
        //       error.startDate = "Start date conflicts with an existing booking";
        //     }

        //     if (Object.keys(error).length > 0) {
        //       return res.status(403).json({
        //         message: "Sorry, this spot is already booked for the specified dates",
        //         error
        //       })
        //     }

        const bookings = await Booking.create({
            userId: req.user.id,
            spotId: spotId,
            startDate,
            endDate
        })

    res.status(201).json(bookings)
    } catch (err) {
        res.status(404).json( {message: err.message})
    }
})

module.exports = router;
