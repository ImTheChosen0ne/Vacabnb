import React from "react";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./DeleteModal.css";

function DeleteSpotModal({spotId}) {

    const dispatch = useDispatch();
    const history = useHistory()
      const { closeModal } = useModal();
console.log(spotId)

    const handleDeleteConfirmed = () => {
        dispatch(deleteSpot(spotId));
        history.push(`/spots/current`)
        closeModal()
        };



    return (
        <div className="modal-content">
          <div className="box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className="confirmButton" onClick={handleDeleteConfirmed}>
              Yes (Delete Spot)
            </button>
            <button className="cancelButton" onClick={closeModal}>
              No (Keep Spot)
            </button>
          </div>
        </div>
    );
}

export default DeleteSpotModal;
