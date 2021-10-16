import {
    CREATE_FARE,
    RETRIEVE_FARES,
    UPDATE_FARE,
    DELETE_FARE,
    DELETE_ALL_FARES,
  } from "../actions/types";
  
  const initialState = [];
  
  function fareReducer(fares = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_FARE:
        return [...fares, payload];
  
      case RETRIEVE_FARES:
        return payload;
  
      case UPDATE_FARE:
        return fares.map((fare) => {
          if (fare.id === payload.id) {
            return {
              ...fare,
              ...payload,
            };
          } else {
            return fare;
          }
        });
  
      case DELETE_FARE:
        return fares.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_FARES:
        return [];
  
      default:
        return fares;
    }
  };
  
  export default fareReducer;