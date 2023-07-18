import { csrfFetch } from "./csrf";
// Action Type Constants:
export const SET_BOOKINGS = 'bookings/SET_BOOKINGS';
export const ADD_BOOKING = 'bookings/ADD_BOOKING';
export const UPDATE_BOOKING = 'bookings/EDIT_BOOKING';
export const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


//Action Creators:
export const setBookings = (bookings) => ({
    type: SET_BOOKINGS,
    bookings,
  });

  export const addBooking = (booking) => ({
    type: ADD_BOOKING,
    booking,
  });

  export const editBookings = (booking) => ({
    type: UPDATE_BOOKING,
    booking,
  });

  export const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId,
  });

// Thunk Action Creators:
export const fetchBookings = () => async (dispatch) => {
      const res = await fetch('/api/bookings/current')
      if (res.ok) {
        const bookings = await res.json();
        dispatch(setBookings(bookings));
      }
  };

  export const createBooking = (spotId, booking) => async (dispatch) => {
      const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
          const newBooking = await res.json();
          dispatch(addBooking(newBooking));
        } else {
            const errors = await res.json();
            return errors;
        }
  };

  export const updateBooking = (booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    
    const updatedBooking = await res.json();
    console.log("thunk", updatedBooking)
    if (res.ok) {
      dispatch(editBookings(updatedBooking));
        return updatedBooking;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

  export const removeBooking = (bookingId) => async (dispatch) => {
      const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        dispatch(deleteBooking(bookingId));
      } else {
        const errors = await res.json();
        return errors;
      }
  };

//Bookings reducer
const initialState = {
  bookings: {},

};
const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_BOOKINGS: {
        const newState = { ...state, bookings: {} }
        action.bookings.bookings.forEach(booking => {
          newState.bookings[booking.id] = booking;
        });
        return newState
    }
    case ADD_BOOKING: {
        const newState = { ...state };
        newState.bookings[action.booking.id] = action.booking;
        return newState;
    }
    case UPDATE_BOOKING: {
        const newState = { ...state };
        newState.bookings[action.booking.id] = action.booking;
        return newState;
      }
    case DELETE_BOOKING:{
        const newState = { ...state };
        delete newState.bookings[action.bookingId];
        return newState;
      }
        default:
            return state;
        }
    };

export default bookingsReducer;
