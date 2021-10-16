import {
    CREATE_VEHICLE,
    RETRIEVE_VEHICLES,
    UPDATE_VEHICLE,
    DELETE_VEHICLE,
    DELETE_ALL_VEHICLES,
  } from "../actions/types";
  
  const initialState = [];
  
  function vehicleReducer(vehicles = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_VEHICLE:
        return [...vehicles, payload];
  
      case RETRIEVE_VEHICLES:
        return payload;
  
      case UPDATE_VEHICLE:
        return vehicles.map((vehicle) => {
          if (vehicle.id === payload.id) {
            return {
              ...vehicle,
              ...payload,
            };
          } else {
            return vehicle;
          }
        });
  
      case DELETE_VEHICLE:
        return vehicles.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_VEHICLES:
        return [];
  
      default:
        return vehicles;
    }
  };
  
  export default vehicleReducer;