import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchBookings } from "../../store/bookings";
import DeleteBooking from "../DeleteBooking";
import EditBooking from "../EditBooking";
import OpenModalButton from "../OpenModalButton";
import "./ManageBookings.css";

function ManageBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) =>
    Object.values(state.bookings.bookings)
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = (date.getDate() + 1).toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  }

  function isPastDate(date) {
    const currentDate = new Date();
    const bookingDate = new Date(date);


    return bookingDate.getTime() < currentDate.getTime();
  }

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div className="manage-bookings">
      <h1>Manage Bookings</h1>
      <div>
        {bookings?.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings">
            {bookings.map((booking) => (
              <div key={booking.id} className="spot-booked">
                <NavLink to={`/spots/${booking.Spot?.id}`}>
                  <img src={booking.Spot?.previewImage} alt="spot" />
                  <p>{booking.Spot?.name}</p>
                  <p>
                    Dates: {formatDate(booking.startDate)} to{" "}
                    {formatDate(booking.endDate)}
                  </p>
                </NavLink>
                <div className="booking-buttons">
                  <div>
                    <OpenModalButton
                      buttonText="Delete Booking"
                      modalComponent={<DeleteBooking bookingId={booking.id} />}
                      disabled={isPastDate(booking.startDate)}
                    />
                  </div>
                  <div>
                    <OpenModalButton
                      buttonText="Edit Booking"
                      modalComponent={<EditBooking booking={booking} />}
                      disabled={isPastDate(booking.startDate)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBookings;
