import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotReviews } from "../../store/reviews";
import OpenModalButton from "./OpenModalButton";
import { useHistory } from "react-router-dom";
import PostReviewModal from "../PostReviewModal/index";
import DeleteReviewModal from "../DeleteReviewModal/index"
function SpotReviews({ spotDetails, spotId }) {
  const dispatch = useDispatch();
  const spotReviews = useSelector((state) => Object.values(state.reviews.spot));
  const sessionUser = useSelector((state) => state.session.user);

  const ulRef = useRef();
  const history = useHistory();

  if (!spotReviews) {
    <h1>""</h1>;
  }
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

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="spot-reviews">
      <h3>
        ⭐ {spotDetails.avgRating}{" "}
        {spotDetails.numReviews
          ? ` · ${spotDetails.numReviews} review(s)`
          : null}
      </h3>
      {sessionUser &&
        sessionUser.id !== spotDetails.ownerId &&
        !reviewExists && (
          <OpenModalButton
            itemText="Post Review"
            onItemClick={closeMenu}
            modalComponent={<PostReviewModal spotId={spotId} />}
          />
        )}
      {spotReviews.map((review) => (
        <div key={review?.id} className="review">
          <p>{review?.User.firstName}</p>
          <p>{review?.createdAt}</p>
          <p>{review?.review}</p>
          {sessionUser && review?.userId === sessionUser.id && (
            <OpenModalButton
              itemText="Delete Review"
              onItemClick={closeMenu}
              modalComponent={<DeleteReviewModal reviewId={review?.id} spotId={spotId} />}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SpotReviews;
