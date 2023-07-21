import React from "react";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./DeleteModal.css";

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDeleteConfirmed = () => {
    dispatch(deleteSpot(spotId));
    history.push(`/spots/current`);
    closeModal();
  };

  return (
    <div className="delete-spot">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div className="delete-spot-buttons">
        <button className="delete-spot-button" onClick={handleDeleteConfirmed}>
          Yes (Delete Spot)
        </button>
        <button className="cancel-spot-button" onClick={closeModal}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;
