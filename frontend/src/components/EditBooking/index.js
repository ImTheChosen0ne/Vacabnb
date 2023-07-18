import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { updateBooking } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import "react-datepicker/dist/react-datepicker.css";

function EditBooking({ booking }) {
  const { closeModal } = useModal();
  const startDateSet = new Date(booking.startDate);
  const endDateSet = new Date(booking.endDate);
  startDateSet.setDate(startDateSet.getDate() + 1);
  endDateSet.setDate(endDateSet.getDate() + 1);
  const dispatch = useDispatch();
  const [checkInDate, setCheckInDate] = useState(startDateSet);
  const [checkOutDate, setCheckOutDate] = useState(endDateSet);

  function handleCheckInDate(date) {
    setCheckInDate(date);
  }

  function handleCheckOutDate(date) {
    setCheckOutDate(date);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate.setHours(0, 0, 0, 0)).toISOString().split("T")[0];
      const endDate = new Date(checkOutDate.setHours(0, 0, 0, 0)).toISOString().split("T")[0];

      const updatedBooking = {
        ...booking,
        startDate,
        endDate,
      };

      dispatch(updateBooking(updatedBooking));

      closeModal();
    }
  };

  return (
    <div className="spotDetails">
      <div>
        <div>
          Check-in:{" "}
          <DatePicker
            selected={checkInDate}
            onChange={handleCheckInDate}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
          />
        </div>
        <div>
          Check-out:{" "}
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
      <button className="reserve-button" onClick={handleUpdate}>
        Update
      </button>
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
