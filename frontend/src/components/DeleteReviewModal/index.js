import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview, fetchSpotReviews } from "../../store/reviews";
import { useHistory } from "react-router-dom";

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
const history = useHistory()
  const { closeModal } = useModal();


const handleDeleteConfirmed = () => {
    dispatch(deleteReview(reviewId))
    dispatch(fetchSpotReviews(spotId));
            history.push(`/spots/${spotId}`)
            closeModal()

      };

  return (
    <>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDeleteConfirmed}>Yes (Delete Review)</button>
      <button onClick={closeModal}>No (Keep Review)</button>
    </>
  );
}

export default DeleteReviewModal;
