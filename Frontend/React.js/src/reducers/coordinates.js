import {
    CREATE_COORDINATE,
    RETRIEVE_COORDINATES,
    UPDATE_COORDINATE,
    DELETE_COORDINATE,
    DELETE_ALL_COORDINATES,
  } from "../actions/types";
  
  const initialState = [];
  
  function coordinateReducer(coordinates = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_COORDINATE:
        return [...coordinates, payload];
  
      case RETRIEVE_COORDINATES:
        return payload;
  
      case UPDATE_COORDINATE:
        return coordinates.map((coordinate) => {
          if (coordinate.id === payload.id) {
            return {
              ...coordinate,
              ...payload,
            };
          } else {
            return coordinate;
          }
        });
  
      case DELETE_COORDINATE:
        return coordinates.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_COORDINATES:
        return [];
  
      default:
        return coordinates;
    }
  };
  
  export default coordinateReducer;