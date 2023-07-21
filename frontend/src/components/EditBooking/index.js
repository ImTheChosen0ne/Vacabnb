import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { updateBooking } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "./EditBooking.css";

function EditBooking({ booking }) {
  const { closeModal } = useModal();
  const startDateSet = new Date(booking.startDate);
  const endDateSet = new Date(booking.endDate);
  startDateSet.setDate(startDateSet.getDate() + 1);
  endDateSet.setDate(endDateSet.getDate() + 1);
  const dispatch = useDispatch();
  const [checkInDate, setCheckInDate] = useState(startDateSet);
  const [checkOutDate, setCheckOutDate] = useState(endDateSet);
  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let errors = {};
    if (!checkInDate) errors.start = "Start date is required";
    if (!checkOutDate) errors.end = "End date is required";

    setErrors(errors);
  }, [checkInDate, checkOutDate]);

  function handleCheckInDate(date) {
    setCheckInDate(date);
  }

  function handleCheckOutDate(date) {
    setCheckOutDate(date);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate.setHours(0, 0, 0, 0))
        .toISOString()
        .split("T")[0];
      const endDate = new Date(checkOutDate.setHours(0, 0, 0, 0))
        .toISOString()
        .split("T")[0];

      const updatedBooking = {
        ...booking,
        startDate,
        endDate,
      };

      if (Object.values(errors).length) return;

      dispatch(updateBooking(updatedBooking))
        .then(closeModal)
        .catch(async (res) => {
          let error = await res.json();
          error = error.errors;

          let newErrors = {};
          if (error && error.message === "Authentication required") {
            newErrors.message = "You must be logged in to request a booking";
          }
          if (error && error.endDate) {
            newErrors.end = error.endDate;
          }
          if (error && error.startDate) {
            newErrors.start = error.startDate;
          }
          if (!error) {
            newErrors.message = "Past bookings can't be modified";
          }
          setErrors(newErrors);
          return;
        });
    }
  };

  return (
    <div className="edit-booking">
      {submitted && errors.message && (
        <p className="errors">{errors.message}</p>
      )}
      {submitted && errors.start && <p className="errors">{errors.start}</p>}
      {submitted && errors.end && <p className="errors">{errors.end}</p>}
      <div className="book-details">
        <div className="check-in">
          <p>Check-in:</p>
          <div>
            <DatePicker
              selected={checkInDate}
              onChange={handleCheckInDate}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
            />
          </div>
        </div>
        <div className="check-out">
          <p>Check-out:</p>
          <div>
            <DatePicker
              selected={checkOutDate}
              onChange={handleCheckOutDate}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
            />
          </div>
        </div>
      </div>
      <div className="update-button-container">
        <button className="update-booking-button" onClick={handleUpdate}>
          Update Booking
        </button>
      </div>
      <div>
        {/* {checkInDate && checkOutDate && (
          <div>
            Total Amount: ${spotDetails.price} x {calculateNumberOfNights()} nights = ${calculateTotalAmount()}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default EditBooking;
