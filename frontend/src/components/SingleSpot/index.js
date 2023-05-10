import React from "react";
import { NavLink } from "react-router-dom";
import "./SingleSpot.css";

function SingleSpot({ spot }) {
  return (
    <div className="spotContainer">
      <NavLink
        id="nav-link"
        to={`/spots/${spot.id}`}
        key={spot.id}
        title={spot.name}
      >
        <div className="singleSpot">
          <div>
            <img src={spot.previewImage} alt="Preview"></img>
          </div>
          <div>
            {spot.city}, {spot.state}
          </div>
          <div>⭐{spot.avgRating} {spot.numReviews ? ` · ${spot.numReviews} review(s)`: null}</div>
          <div>{`$${spot.price} night`}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleSpot;
