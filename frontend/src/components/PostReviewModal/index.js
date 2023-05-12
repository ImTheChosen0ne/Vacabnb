import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview, fetchSpotReviews, clearReview } from "../../store/reviews";
import { fetchDetailedSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

function PostReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newReview = {
        review,
        stars,
    };

    dispatch(createReview(newReview, spotId))
    .then(() => {
      dispatch(fetchSpotReviews(spotId));
      dispatch(fetchDetailedSpot(spotId));
      history.push(`/spots/${spotId}`);
      closeModal();
      dispatch(clearReview());

    }).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });

  };

  return (
    <>
      <h1>How was your stay?</h1>
      <div className="errors">{errors.stars}</div>
      <div className="errors">{errors.review}</div>

      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder="Leave your review here..."
          />
        </label>
        <div className="stars">
          <i
            className={
                stars >= 1
                ? "fa-solid fa-star fa-lg"
                : "fa-regular fa-star fa-lg"
            }
            // onMouseEnter={() => {setActiveRating(1)} }
            // onMouseLeave={() => {setActiveRating(0)} }
            style={stars >= 1 ? { color: "#FCE79A" } : {}}
            onClick={() => {
                setStars(1);
            }}
          ></i>
          <i
            className={
                stars >= 2
                ? "fa-solid fa-star fa-lg"
                : "fa-regular fa-star fa-lg"
            }
            // onMouseEnter={() => {setActiveRating(2)} }
            // onMouseLeave={() => {setActiveRating(0)} }
            style={stars >= 2 ? { color: "#FCE79A" } : {}}
            onClick={() => {
                setStars(2);
            }}
          ></i>
          <i
            className={
                stars >= 3
                ? "fa-solid fa-star fa-lg"
                : "fa-regular fa-star fa-lg"
            }
            style={stars >= 3 ? { color: "#FCE79A" } : {}}
            // onMouseEnter={() => {setActiveRating(3)} }
            // onMouseLeave={() => {setActiveRating(0)} }
            onClick={() => {
                setStars(3);
            }}
          ></i>
          <i
            className={
                stars >= 4
                ? "fa-solid fa-star fa-lg"
                : "fa-regular fa-star fa-lg"
            }
            // onMouseEnter={() => {setActiveRating(4)} }
            // onMouseLeave={() => {setActiveRating(0)} }
            style={stars >= 4 ? { color: "#FCE79A" } : {}}
            onClick={() => {
                setStars(4);
            }}
          ></i>
          <i
            className={
                stars >= 5
                ? "fa-solid fa-star fa-lg"
                : "fa-regular fa-star fa-lg"
            }
            // onMouseEnter={() => {setActiveRating(5)} }
            // onMouseLeave={() => {setActiveRating(0)} }
            style={stars >= 5 ? { color: "#FCE79A" } : {}}
            onClick={() => {
                setStars(5);
            }}
          ></i>
          <p> Stars</p>
        </div>
        {/* {errors.credential && (
          <p>{errors.credential}</p>
        )} */}
        <button type="submit" disabled={review.length < 10}>Submit Your Review</button>
      </form>
    </>
  );
}

export default PostReviewModal;
