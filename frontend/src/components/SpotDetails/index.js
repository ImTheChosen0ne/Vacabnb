import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpot, clearSpot } from "../../store/spots";
import "./SpotDetails.css";
import SpotReviews from "../SpotReviews/index";
import { fetchSpotReviews, clearReview }from "../../store/reviews"

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotDetails = useSelector((state) => state.spots.singleSpot[spotId]);

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
    dispatch(fetchSpotReviews(spotId))

    return () => {
      dispatch(clearSpot());
      dispatch(clearReview());
    };
  }, [dispatch, spotId]);

  if (!spotDetails) {
    return <div></div>;
  }

  return (
    <div className="spotDetails">
      <h1 className="spot-name">{spotDetails.name}</h1>
      <div className="location">
        {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
      </div>
      <div className="imageDiv">
        <img
          className="bigImg"
          src={spotDetails.SpotImages && spotDetails.SpotImages[0]?.url}
          alt="spot"
        />
        <div className="smallImage">
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[1]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[2]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[3]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={
                spotDetails.SpotImages
                  ? spotDetails.SpotImages[4]?.url
                  : "previewImage"
              }
              alt="spot"
            />
          </div>
        </div>
      </div>
      {/* {spotDetails.SpotImages &&
          spotDetails.SpotImages.map((image) => (
              <img key={image.id} src={image.url} alt="Preview" />
          ))} */}
      <div className="infoContainer">
        <div className="description">
          <h2>
            Hosted by {spotDetails.Owner && spotDetails.Owner.firstName} {spotDetails.Owner && spotDetails.Owner.lastName}
          </h2>
          <p>{spotDetails.description}</p>
        </div>
        <div className="reserveDiv">
          <div className="reserveDiv-info">
            {`$${spotDetails.price} night`}
            <div>
             ⭐{spotDetails.avgRating}{" "}
            {spotDetails.numReviews
              ? ` · ${spotDetails.numReviews} review(s)`
              : null}
              </div>
          </div>
          <button className="reserve-button" onClick={() => alert("Feature Coming Soon...")}>
            Reserve
          </button>
        </div>
      </div>
      <div>
        <SpotReviews spotDetails={ spotDetails } spotId={ spotId }/>
      </div>
    </div>
  );
}

export default SpotDetails;
