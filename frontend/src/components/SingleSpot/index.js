import React from "react";
import { NavLink } from "react-router-dom";

const SingleSpot = ({ spot }) => {
  return (
    <NavLink id="nav-link" to={`/spots/${spot.id}`} key={spot.id}>
      <div className="singleSpot">
        <div>
          <img src={spot.previewImage} alt="Preview"></img>
        </div>
        <div>
          {spot.city}, {spot.state}
        </div>
        <div>{spot.avgRating}</div>
        <div>{`${spot.price} night`}</div>
      </div>
    </NavLink>
  );
};

export default SingleSpot;
