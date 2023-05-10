import { csrfFetch } from "./csrf";
// Action Type Constants:
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
// export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
// export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
// export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

//Action Creators:
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

// export const receiveSpot = (review) => ({
//   type: RECEIVE_REVIEW,
//   review,
// });

// export const editSpot = (review) => ({
//   type: UPDATE_REVIEW,
//   review,
// });

// export const removeSpot = (reviewId) => ({
//   type: REMOVE_REVIEW,
//   reviewId,
// });

// Thunk Action Creators:
export const fetchSpotReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
      const reviews = await res.json();
    //   console.log(reviews)
    dispatch(loadReviews(reviews));
    return reviews;
  }
};

// export const fetchDetailedSpot = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

//   if (res.ok) {
//     const spotDetails = await res.json();
//     dispatch(receiveSpot(spotDetails));
//     return spotDetails
//   }
// };


// export const createSpot = (spot) => async (dispatch) => {
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(spot),
//   });

//   if (res.ok) {
//     const newSpot = await res.json();
//     dispatch(receiveSpot(newSpot));
//     return newSpot;
//   } else {
//     const errors = await res.json();
//     console.log(errors)
//     return errors;
//   }
// };

// export const updateSpot = (spot) => async (dispatch) => {
//   console.log(spot)
//   const res = await csrfFetch(`/api/spots/${spot.id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(spot),
//   });

//   const updatedSpot = await res.json();
//   if (res.ok) {
//     dispatch(editSpot(updatedSpot));
//     return updatedSpot;
//   } else {
//     const errors = await res.json();
//     return errors;
//   };
// }

// export const deleteSpot = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'DELETE',
//   });

//   if (res.ok) {
//     dispatch(removeSpot(spotId));
//   } else {
//     const errors = await res.json();
//     return errors;
//   }
// };

//Reviews reducer
const initialState = {
  spot: {},
  user: {}
};
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = { ...state , spot: {}}
            action.reviews.Reviews.forEach(review  => {
              newState.spot[review.id] = review;
            });
            console.log(action)
            return newState
        }
        default:
            return state;
        }
    };

export default reviewsReducer;
