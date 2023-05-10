import React from "react";
import { useModal } from "../../context/Modal";
import "./DeleteModal.css";

function DeleteSpotModal({ handleConfirmDelete, handleCancelDelete }) {
    const { isOpen, closeModal  } = useModal();

    return (
        <div
        className={`modal ${isOpen ? "is-active" : ""}`}  onMouseDown={closeModal}>
        <div className="modal-content">
          <div className="box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className="confirmButton" onClick={handleConfirmDelete}>
              Yes (Delete Spot)
            </button>
            <button className="cancelButton" onClick={handleCancelDelete}>
              No (Keep Spot)
            </button>
          </div>
        </div>
      </div>
    );
}

export default DeleteSpotModal;
