import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import DeleteSpotModal from "../DeleteModal/index";
import OpenModalMenuItem from "../SpotReviews/OpenModalDeleteButton";

function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.allSpots));
  const session = useSelector((state) => state.session);
  const currentUserSpots = spots.filter(
    (spot) => spot.ownerId === session.user.id
  );

  console.log(spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const history = useHistory();

  const handleCreateSpot = () => {
    history.push("/spots/new");
  };

  const ulRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <div>
        <h1>Manage Spots</h1>
        <button onClick={handleCreateSpot}>Create a New Spot</button>
      </div>
      <div className="allSpotsContainer">
        {currentUserSpots.map((spot) => (
          <div>
            <NavLink id="nav-link" to={`/spots/${spot.id}`}>
              <div className="singleSpot" key={spot.id}>
                <div>
                  <img src={spot.previewImage} alt="Preview"></img>
                </div>
                <div>
                  {spot.city}, {spot.state}
                </div>
                <div>
                  ⭐{spot.avgRating}{" "}
                  {spot.numReviews ? ` · ${spot.numReviews} review(s)` : null}
                </div>
                <div>{`$${spot.price} night`}</div>
              </div>
            </NavLink>
            <div>
              <NavLink
                id="nav-link"
                to={`/spots/${spot.id}/edit`}
                key={spot.edit}
                title={spot.name}
              >
                <button>Update</button>
              </NavLink>
              <OpenModalMenuItem
                itemText="Delete Spot"
                onItemClick={closeMenu}
                modalComponent={<DeleteSpotModal spotId={spot.id} />}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSpots;
