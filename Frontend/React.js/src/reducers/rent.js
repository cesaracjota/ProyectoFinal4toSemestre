import {
    CREATE_RENT,
    RETRIEVE_RENTS,
    UPDATE_RENT,
    DELETE_RENT,
    DELETE_ALL_RENTS,
  } from "../actions/types";
  
  const initialState = [];
  
  function RentReducer(rents = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_RENT:
        return [...rents, payload];
  
      case RETRIEVE_RENTS:
        return payload;
  
      case UPDATE_RENT:
        return rents.map((rent) => {
          if (rent.id === payload.id) {
            return {
              ...rent,
              ...payload,
            };
          } else {
            return rent;
          }
        });
  
      case DELETE_RENT:
        return rents.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_RENTS:
        return [];
  
      default:
        return rents;
    }
  };
  
  export default RentReducer;