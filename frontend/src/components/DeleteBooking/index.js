import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeBooking } from "../../store/bookings";
import "./DeleteBooking.css"

const DeleteBooking = ({bookingId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false)
  const handleSubmityes = async (e) => {
    e.preventDefault();
    setSubmitted(true)

    if (Object.values(errors).length) return;
    dispatch(removeBooking(bookingId)).then(closeModal)
        .catch(async (res) => {
            let error = await res.json()
            error = error.errors;

            let newErrors = {};
            if (error && error.message === "Authentication required") {
                newErrors.message = "You must be logged in to request a booking"
            }
            if (!error) {

                newErrors.message = "Past bookings can't be modified"
            }
            setErrors(newErrors);
            return
        })
  };

  const handleSubmitno = async (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="delete-booking">
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this booking?</h4>
      {submitted && errors.message && (<p className="errors">{errors.message}</p>)}
      <form>
        <div className="delete-booking-buttons">
          <button  onClick={handleSubmityes} className="delete-booking-button">Yes </button>
          <button  onClick={handleSubmitno} className="cancel-booking-button"> No </button>
        </div>
      </form>
    </div>
  );
};
export default DeleteBooking;
