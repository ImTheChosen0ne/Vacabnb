import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpot, clearSpot } from "../../store/spots";
import "./SpotDetails.css";
import SpotReviews from "../SpotReviews/index";
import { fetchSpotReviews, clearReview } from "../../store/reviews";
import DatePicker from "react-datepicker";
import { createBooking } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import MapContainer from "../GoogleMaps";
import "react-datepicker/dist/react-datepicker.css";

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotDetails = useSelector((state) => state.spots.singleSpot[spotId]);
  const [startDate, setStartDate] = useState(new Date());
  const initialEndDate = new Date(startDate);
  initialEndDate.setDate(initialEndDate.getDate() + 5);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { setModalContent } = useModal();

  useEffect(() => {
    let errors = {};
    if (!startDate) errors.start = "Start date is required";
    if (!endDate) errors.end = "End date is required";

    setErrors(errors);
  }, [startDate, endDate]);

  function calculateNumberOfNights() {
    const oneDay = 24 * 60 * 60 * 1000;
    const checkIn = new Date(startDate);
    const checkOut = new Date(endDate);
    const numberOfNights = Math.round(Math.abs((checkIn - checkOut) / oneDay));

    return numberOfNights;
  }

  function calculateTotalAmount() {
    const numberOfNights = calculateNumberOfNights();
    const totalAmount = spotDetails.price * numberOfNights;

    return totalAmount;
  }

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
    dispatch(fetchSpotReviews(spotId));

    return () => {
      dispatch(clearSpot());
      dispatch(clearReview());
    };
  }, [dispatch, spotId]);

  if (!spotDetails) {
    return <div></div>;
  }

  function handleCheckInDate(date) {
    setStartDate(date);
  }

  function handleCheckOutDate(date) {
    setEndDate(date);
  }

  const handleReserve = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const newBooking = {
      startDate,
      endDate,
    };

    if (Object.values(errors).length) return;

    dispatch(createBooking(spotId, newBooking))
      .then(() => {
        setModalContent(
          <div className="reserved-modal">
            <h2>Reservation booked!</h2>
          </div>
        );
      })
      .catch(async (res) => {
        let error = await res.json();
        error = error.errors;

        let newErrors = {};

        if (error && error.endDate) {
          newErrors.end = error.endDate;
        }

        if (error && error.startDate) {
          newErrors.start = error.startDate;
        }

        if (!error) {
          newErrors.message =
            "You can not book a reservation for your own spot.";
        }

        setErrors(newErrors);
        return;
      });
  };

  return (
    <div className="spotDetails">
      <h1 className="spot-name">{spotDetails.name}</h1>
      <div className="location">
        {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
      </div>
      <div className="imageDiv">
        <img
          className="bigImg"
          src={spotDetails.SpotImages && spotDetails.SpotImages[0]?.url}
          alt="spot"
        />
        <div className="smallImage">
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[1]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[2]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[3]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[4]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
        </div>
      </div>
      {/* {spotDetails.SpotImages &&
          spotDetails.SpotImages.map((image) => (
              <img key={image.id} src={image.url} alt="Preview" />
          ))} */}
      <div className="infoContainer">
        <div className="description">
          <h2>
            Hosted by {spotDetails.Owner && spotDetails.Owner.firstName}{" "}
            {spotDetails.Owner && spotDetails.Owner.lastName}
          </h2>
          <p>{spotDetails.description}</p>
        </div>
        <div className="reserveDiv">
          <div className="reserveDiv-info">
            {`$${spotDetails.price} night`}
            <div>
              ⭐{spotDetails.avgRating}{" "}
              {spotDetails.numReviews
                ? ` · ${spotDetails.numReviews} review(s)`
                : null}
            </div>
          </div>
          <div className="book-date">
            {submitted && errors.message && (
              <p className="errors">{errors.message}</p>
            )}
            <div>
              {submitted && errors.start && (
                <p className="errors">{errors.start}</p>
              )}
              Check-in:{" "}
              <DatePicker
                selected={startDate}
                onChange={handleCheckInDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/dd/yyyy"
                // defaultValue={startDate}
              />
            </div>
            <div>
              {submitted && errors.end && (
                <p className="errors">{errors.end}</p>
              )}
              Check-out:{" "}
              <DatePicker
                selected={endDate}
                onChange={handleCheckOutDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MM/dd/yyyy"
                // defaultValue={startDate}
              />
            </div>
          </div>
          <button className="reserve-button" onClick={handleReserve}>
            Reserve
          </button>
          <div>
            {startDate && endDate && (
              <div>
                {startDate && endDate && (
                  <div className="total">
                    <p>
                    ${spotDetails.price} x {" "}
                    </p>
                    <p className="nights">
                    {calculateNumberOfNights()} nights
                    </p>
                    <p className="per-night-total">
                    ${calculateTotalAmount()}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="spot-map">
        <MapContainer spotDetails={spotDetails} />
      </div>
      <div>
        <SpotReviews spotDetails={spotDetails} spotId={spotId} />
      </div>
    </div>
  );
}

export default SpotDetails;
