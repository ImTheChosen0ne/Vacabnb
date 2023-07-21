import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpotReviews, clearReview } from "../../store/reviews";
import OpenModalCreateButton from "./OpenModalCreateButton";
import OpenModalDeleteButton from "./OpenModalDeleteButton";
import PostReviewModal from "../PostReviewModal/index";
import DeleteReviewModal from "../DeleteReviewModal/index";
import { fetchDetailedSpot, clearSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton"
import EditReview from "../EditReviewModal";

import "./SpotReviews.css"

function SpotReviews({ spotDetails, spotId }) {
  const dispatch = useDispatch();
  const spotReviews = useSelector((state) => Object.values(state.reviews.spot));
  const sessionUser = useSelector((state) => state.session.user);

  const ulRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  let reviewExists = false;
  if (spotReviews.length) {
    for (let i = 0; i < spotReviews.length; i++) {
      if (spotReviews[i]?.userId === sessionUser?.id) {
        reviewExists = true;
      }
    }
  }

  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const monthYear = (date) => {
    const year = date?.slice(0, 4);
    const month = date?.slice(5, 7);

    return `${months[month]} ${year}`;
  };

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId));
    dispatch(fetchDetailedSpot(spotId));

    return () => {
      dispatch(clearSpot());
      dispatch(clearReview());
    };
  }, [dispatch, spotId]);

  return (
    <div className="spot-reviews">
      <h3>
        ⭐ {spotDetails.avgRating}{" "}
        {spotDetails.numReviews
          ? ` · ${spotDetails.numReviews} review(s)`
          : null}
      </h3>
      <div>
      {sessionUser &&
        sessionUser.id !== spotDetails.ownerId &&
        !reviewExists && (
          <OpenModalCreateButton
            itemText="Post Review"
            onItemClick={closeMenu}
            modalComponent={<PostReviewModal spotId={spotId} />}
          />
        )}
      {spotReviews && spotReviews.length > 0 ? (
        spotReviews.reverse().map((review) => (
          <div key={review?.id} className="review">
            <p className="review-name">{review?.User?.firstName}</p>
            <p className="date">{monthYear(review?.createdAt)}</p>
            <p>{review?.review}</p>
            {sessionUser && review?.userId === sessionUser.id && (
              <div>
                <OpenModalButton
                  buttonText="Edit Review"
                  modalComponent={
                  <EditReview spotId={spotId} review={review} />
                    }
              />
              <OpenModalDeleteButton
                itemText="Delete Review"
                onItemClick={closeMenu}
                modalComponent={
                  <DeleteReviewModal reviewId={review?.id} spotId={spotId} />
                }
              />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Be the first to post a review!</p>
      )}
      </div>
    </div>
  );
}

export default SpotReviews;
