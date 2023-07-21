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
          <div className="location-info">
          <div className="location-rating">
            <div className="location"><p>{spot.city},</p> <p className="state">{spot.state}</p></div>
          <div className="rating">⭐{spot.avgRating}</div>
          </div>
          <div className="price">{`$${spot.price}`}<p>night</p></div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleSpot;
