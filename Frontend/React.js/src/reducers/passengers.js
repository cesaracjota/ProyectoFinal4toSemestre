import {
    RETRIEVE_PASSENGERS,
    DELETE_PASSENGER,

  } from "../actions/types";
  
  const initialState = [];
  
  function passengerReducer(passengers = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {

      case RETRIEVE_PASSENGERS:
        return payload;
  
      case DELETE_PASSENGER:
        return passengers.filter(({ id }) => id !== payload.id);

      default:
        return passengers;
    }
  };
  
  export default passengerReducer;