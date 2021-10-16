import {
    RETRIEVE_PASSENGERS,
    DELETE_PASSENGER,
  } from "./types";
  
  import PassengerDataService from "../service/passengerService";

  
  export const retrievePassengers = () => async (dispatch) => {
    try {
      const res = await PassengerDataService.getAll();
  
      dispatch({
        type: RETRIEVE_PASSENGERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deletePassenger = (id) => async (dispatch) => {
    try {
      await PassengerDataService.remove(id);
  
      dispatch({
        type: DELETE_PASSENGER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  