const express = require("express");
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Booking } = require("../../db/models");
const { Op } = require("sequelize");

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });

  for (let i = 0; i < bookings.length; i++) {
    let spot = bookings[i].Spot;
    let imagePreview = await SpotImage.findOne({
      where: {
        spotId: spot.id,
      },
    });

    if (imagePreview) {
      spot.dataValues.previewImage = imagePreview.url;
    } else {
      spot.dataValues.previewImage = null;
    }
  }

  res.json({ bookings: bookings });
});

//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (new Date(endDate) < new Date()) {
    return res.status(403).json({ message: "Past bookings can't be modified" });
  }

  if (new Date(endDate) <= new Date(startDate)) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        endDate: "Check-out date cannot be on or before Check-in date",
      },
    });
  }

  const conflictingBookings = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } },
      ],
      id: { [Op.not]: booking.id }, // Exclude the current booking from the check
    },
  });

  if (conflictingBookings.length > 0) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  // const booking1 = await Booking.findAll({
  //   where: {
  //     startDate: { [Op.lte]: startDate },
  //     endDate: { [Op.gte]: startDate },
  //     id: booking.id,
  //   },
  // });

  // const booking2 = await Booking.findAll({
  //   where: {
  //     startDate: { [Op.lte]: endDate },
  //     endDate: { [Op.gte]: endDate },
  //     id: booking.id,
  //   },
  // });

  // const err = {};
  // if (booking1.length)
  //   err.startDate = "Start date conflicts with an existing booking";
  // if (booking2.length)
  //   err.endDate = "End date conflicts with an existing booking";
  // if (Object.keys(err).length) {
  //   res.status(403);
  //   return res.json({
  //     message: "Sorry, this spot is already booked for the specified dates",
  //     errors: err,
  //   });
  // }

  if (startDate) booking.startDate = startDate;
  if (endDate) booking.endDate = endDate;

  await booking.save();

  res.json(booking);
});

//Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId, {
    include: {
      model: Spot,
    },
  });


  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  } else if (
    booking.userId !== req.user.id &&
    booking.Spot.ownerId !== req.user.id
  ) {
    return res.status(403).json({ message: "Forbidden" });
  } else if (new Date(booking.startDate) <= new Date().toString) {
    return res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted" });
  } else {
    await booking.destroy();
    res.json({ message: "Successfully deleted" });
  }
});
module.exports = router;
