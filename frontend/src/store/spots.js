// import { csrfFetch } from "./csrf";
// Action Type Constants:
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
export const UPDATE_SPOT = 'reports/UPDATE_SPOT';
// export const REMOVE_SPOT = 'reports/REMOVE_SPOT';

//Action Creators:
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const receiveSpot = (spot) => ({
  type: RECEIVE_SPOT,
  spot,
});

export const editSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

// Thunk Action Creators:
export const fetchSpots = () => async (dispatch) => {
  const res = await fetch('/api/spots');

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadSpots(spots));
    return spots;
  }
};

export const fetchDetailedSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotDetails = await res.json();
    dispatch(receiveSpot(spotDetails));
    return spotDetails
  }
};


export const createSpot = (spot) => async (dispatch) => {
  const res = await fetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(receiveSpot(newSpot));
    return newSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateSpot = (spot) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(editSpot(updatedSpot));
    return updatedSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
};
//Spots reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = {}
      action.spots.spots.forEach(spot => {
          newState[spot.id] = spot;
      });
      return newState
    }
    case RECEIVE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case UPDATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
