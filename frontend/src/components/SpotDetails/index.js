import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpot } from "../../store/spots";
import "./SpotDetails.css";
import SpotReviews from "../SpotReviews/index";

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotDetails = useSelector((state) => state.spots.singleSpot[spotId]);

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
  }, [dispatch, spotId]);

  if (!spotDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spotDetails">
      <h1>{spotDetails.name}</h1>
      <div>
        {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
      </div>
      <div className="imageDiv">
        <img
          className="bigImg"
          src={spotDetails.SpotImages && spotDetails.SpotImages[0].url}
          alt="spot"
        />
        <div className="smallImage">
          <div className="smallImageDiv">
            <img
              src={spotDetails.SpotImages && spotDetails.SpotImages[1].url}
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={spotDetails.SpotImages && spotDetails.SpotImages[2].url}
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={spotDetails.SpotImages && spotDetails.SpotImages[3].url}
              alt="spot"
            />
          </div>
          <div className="smallImageDiv">
            <img
              src={spotDetails.SpotImages && spotDetails.SpotImages[4].url}
              alt="spot"
            />
          </div>
        </div>
      </div>
      {/* {spotDetails.SpotImages &&
          spotDetails.SpotImages.map((image) => (
            <img key={image.id} src={image.url} alt="Preview" />
          ))} */}
      <div className='infoContainer'>
        <div>
        <h2>
          Hosted by {spotDetails.Owner && spotDetails.Owner.firstName}{" "}
          {spotDetails.Owner && spotDetails.Owner.lastName}
        </h2>
        <p>{spotDetails.description}</p>
        </div>
      <div className="reserveDiv">
        <div>
          {`$${spotDetails.price} night`} ⭐{spotDetails.avgRating.toFixed(1)} {`# ${spotDetails.numReviews} review(s)`}
        </div>
        <button onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
      </div>
      </div>
      <div>
        <SpotReviews spotDetails={spotDetails}/>
      </div>
    </div>
  );
}

export default SpotDetails;
