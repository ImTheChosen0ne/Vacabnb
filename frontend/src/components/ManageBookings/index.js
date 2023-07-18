import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookings } from "../../store/bookings";
import DeleteBooking from "../DeleteBooking";
import EditBooking from "../EditBooking";
import "./ManageBookings.css";
import OpenModalButton from "../OpenModalButton";

function ManageBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => Object.values(state.bookings.bookings));

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div className="manage-bookings">
      <h1>Manage Bookings</h1>
      {bookings?.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Booking ID: {booking.id}</p>
              <p>Spot: {booking.Spot?.name}</p>
              <p>
                Dates: {booking.startDate} to {booking.endDate}
              </p>
              <div>
                <OpenModalButton
                      buttonText="Delete Booking"
                      modalComponent={<DeleteBooking bookingId={booking.id}/>}
                    />
              </div>
              <div>
                <OpenModalButton
                      buttonText="Edit Booking"
                      modalComponent={<EditBooking booking={booking}/>}
                    />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageBookings;
