import React, { useEffect, useReducer } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SingleSpot from "../SingleSpot/index";
import { fetchSpots } from "../../store/spots";
import SpotForm from "../CreateSpotForm/index";
import { useHistory } from "react-router-dom";

function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));
  const session = useSelector((state) => state.session);
  const currentUserSpots = spots.filter(
    (spot) => spot.ownerId === session.user.id
  );

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const history = useHistory();

  const handleCreateSpot = () => {
    history.push("/spots/new");
  };

  return (
    <div>
      <div>
        <h1>Manage Your Spots</h1>
        <button onClick={handleCreateSpot}>Create a New Spot</button>
      </div>
      <div className="allSpotsContainer">
        {currentUserSpots.map((spot) => (
          <div className="singleSpot">
            <div>
              <img src={spot.previewImage} alt="Preview"></img>
            </div>
            <div>
              {spot.city}, {spot.state}
            </div>
            <div>
              ⭐{spot.avgRating} {spot.numReviews}review(s)
            </div>
            <div>{`$${spot.price} night`}</div>
            <div>
            <NavLink
              id="nav-link"
              to={`/spots/${spot.id}/edit`}
              key={spot.id}
              title={spot.name}
            >
              <button>Update</button>
            </NavLink>
            <NavLink id="nav-link" to={`/`} key={spot.id} title={spot.name}>
              <button>Delete</button>
            </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSpots;
