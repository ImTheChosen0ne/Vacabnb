import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpot } from "../../store/spots";

const SpotDetails = () => {
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const spotDetails = useSelector((state) => state.spots[spotId]);

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
  }, [dispatch, spotId]);

  if (!spotDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spotDetails">
      <div>
        <div>{spotDetails.name}</div>
        <div>
          {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
        </div>
        {spotDetails.SpotImages && spotDetails.SpotImages.map((image) => (
          <img key={image.id} src={image.url} alt="Preview" />
          ))}
      </div>
      <div>{`${spotDetails.price} night`} {spotDetails.avgRating}</div>
    </div>
  );
};

export default SpotDetails;
