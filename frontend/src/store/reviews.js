import { csrfFetch } from "./csrf";
// Action Type Constants:
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
// export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
export const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEWS';


//Action Creators:
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const receiveReview = (spotId, review) => ({
  type: RECEIVE_REVIEW,
  spotId,
  review,
});

// export const editSpot = (review) => ({
//   type: UPDATE_REVIEW,
//   review,
// });

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

export const clearReview = () => ({
  type: CLEAR_REVIEWS
})

// Thunk Action Creators:
export const fetchSpotReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
      const reviews = await res.json();
    dispatch(loadReviews(reviews));
    return reviews;
  }
};

export const createReview = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(receiveReview(newReview));
    return newReview;
  } else {
    const errors = await res.json();
    console.log(errors)
    return errors;
  }
};

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

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

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
        case RECEIVE_REVIEW: {
          const newState = { ...state };
          newState.spot[action.review?.id] = action.review;
          return newState;
        }
        case REMOVE_REVIEW: {
          const newState = { ...state };
          delete newState.spot[action.review?.id];
          return newState;
        }
        case CLEAR_REVIEWS: {
          const newState = { ...state };
          newState.spot = {}
          return newState
        }
        default:
            return state;
        }
    };

export default reviewsReducer;
