import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  deleteReview,
  fetchSpotReviews,
  clearReview,
} from "../../store/reviews";
import { fetchDetailedSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./DeleteReviewModal.css";

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDeleteConfirmed = () => {
    dispatch(deleteReview(reviewId)).then(() => {
      dispatch(fetchSpotReviews(spotId));
      dispatch(fetchDetailedSpot(spotId));
      history.push(`/spots/${spotId}`);
      closeModal();
      dispatch(clearReview());
    });
  };

  return (
    <div className="delete-review">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-review-buttons">
      <button className="delete-review-button" onClick={handleDeleteConfirmed}>Yes (Delete Review)</button>
      <button className="cancel-review-button" onClick={closeModal}>No (Keep Review)</button>
      </div>
    </div>
  );
}

export default DeleteReviewModal;
