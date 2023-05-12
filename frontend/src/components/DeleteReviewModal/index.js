import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  deleteReview,
  fetchSpotReviews,
  clearReview,
} from "../../store/reviews";
import { fetchDetailedSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

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
    <>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDeleteConfirmed}>Yes (Delete Review)</button>
      <button onClick={closeModal}>No (Keep Review)</button>
    </>
  );
}

export default DeleteReviewModal;
