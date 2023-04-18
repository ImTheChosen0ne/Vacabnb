const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");

router.get('/current', requireAuth, async (req, res, next) => {

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ['id', 'spotId'],
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: User,
            },
        ]
    })

    res.json({bookings})
})

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    try {
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId)

    const { startDate, endDate } = req.body

    // if (review.userId !== req.user.id) {
    //     requireAuth()
    // }

    if (startDate) booking.startDate = startDate
    if (endDate) booking.endDate = endDate

    await booking.save()

    res.json(booking)
    } catch (err) {
    next(err);
}
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if(booking) {
        await booking.destroy()
        res.json({ message: 'Successfully deleted' })
    } else {
        const err = new Error("Booking couldn't be found")
        err.statusCode = 404
        res.json({ message: err.message })
    }
})
module.exports = router;
