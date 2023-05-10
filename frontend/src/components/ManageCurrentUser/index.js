import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import DeleteSpotModal from "../DeleteModal/index";
import { useState } from "react";

function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.allSpots));
  const session = useSelector((state) => state.session);
  const currentUserSpots = spots.filter(
    (spot) => spot.ownerId === session.user.id
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [spotId, setSpotId] = useState(null);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const history = useHistory();

  const handleCreateSpot = () => {
    history.push("/spots/new");
  };

  const handleDelete = (spot) => {
    setShowDeleteModal(true);
    setSpotId(spot.id);
  };

  const handleDeleteConfirmed = (spotId) => {
    dispatch(deleteSpot(spotId));
    setShowDeleteModal(false);
  };

  const handleDeleteCanceled = () => {
    setShowDeleteModal(false);
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
                key={spot.edit}
                title={spot.name}
              >
                <button>Update</button>
              </NavLink>
              <NavLink
                id="nav-link"
                to={`/spots/current`}
                key={spot.id}
                title={spot.name}
              >
                <button onClick={() => handleDelete(spot)}>Delete</button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      {showDeleteModal && (
        <DeleteSpotModal
          handleConfirmDelete={() => handleDeleteConfirmed(spotId)}
          handleCancelDelete={handleDeleteCanceled}
        />
      )}
    </div>
  );
}

export default ManageSpots;
