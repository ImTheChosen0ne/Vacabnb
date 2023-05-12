import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotForm from "../SpotForm/index";

import { fetchDetailedSpot } from "../../store/spots";

function SpotUpdateForm() {
  const { spotId } = useParams();

  const spot = useSelector((state) => state.spots.singleSpot[spotId]);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId));
  }, [dispatch, spotId]);

  return (
    <div>
      <SpotForm spot={spot} formType="UpdateSpot" />
    </div>
  );
}

export default SpotUpdateForm;
