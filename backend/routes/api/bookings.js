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

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId)
    const spot = await Spot.findByPk(booking.spotId)

    const currentDate = new Date()
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    } else if (booking.startDate <= currentDate) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" })
    } else if (booking.userId !== req.user.id || spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
    } else {
        await booking.destroy()
        res.json({ message: 'Successfully deleted' })
    }
})
module.exports = router;
