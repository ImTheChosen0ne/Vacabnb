import SingleSpot from '../SingleSpot/index';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { fetchSpots } from "../../store/spots";

const Spots = () => {
  const spots = useSelector(state => Object.values(state.spots));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpots())
  }, [dispatch]);

  return (
      <div className='allSpotsContainer'>
        {spots.map(spot => (
          <SingleSpot
            key={spot.id}
            spot={spot}
          />
        ))}
      </div>
  );
}

export default Spots;
