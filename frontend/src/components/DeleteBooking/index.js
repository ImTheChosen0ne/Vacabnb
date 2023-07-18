import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeBooking } from "../../store/bookings";

const DeleteBooking = ({bookingId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmityes = async (e) => {
    e.preventDefault();
    await dispatch(removeBooking(bookingId));
    closeModal();
  };

  const handleSubmitno = async (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this booking?</h4>
      <form>
        <div className="delete-buttons">
          <button  onClick={handleSubmityes} className="yes">Yes </button>
          <button  onClick={handleSubmitno}> No </button>
        </div>
      </form>
    </div>
  );
};
export default DeleteBooking;
