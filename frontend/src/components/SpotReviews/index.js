import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotReviews } from "../../store/reviews";

function SpotReviews({ spotDetails }) {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotReviews = useSelector((state) => Object.values(state.reviews.spot));

//   console.log('store:', spotReviews);

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId));
  }, [dispatch, spotId]);


  return (
    <div className="spot-reviews">
      <h3>⭐ {spotDetails.avgRating}  {`${spotDetails.numReviews} review(s)`}</h3>
      {spotReviews.map((review) => (
        <div key={review.id} className="review">
          <p>{review.User.firstName} {review.User.lastName}</p>
          <p>{review.createdAt}</p>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
}

export default SpotReviews;
