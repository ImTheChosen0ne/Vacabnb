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
            <img className="single-spot-img"src={spot.previewImage} alt="Preview"></img>
          </div>
          <div className="location-rating">
            <div className="location">{spot.city},{spot.state}</div>
          <div className="rating">⭐{spot.avgRating} {spot.numReviews ? ` · ${spot.numReviews} review(s)`: null}</div>
          </div>
          <div className="price">{`$${spot.price}`}<p>night</p></div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleSpot;
