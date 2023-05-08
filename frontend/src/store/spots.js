// import { csrfFetch } from "./csrf";
// Action Type Constants:
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
// export const UPDATE_SPOT = 'reports/UPDATE_SPOT';
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
    default:
      return state;
  }
};

export default spotsReducer;
