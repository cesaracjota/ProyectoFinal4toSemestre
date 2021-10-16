import {
    CREATE_RENT,
    RETRIEVE_RENTS,
    UPDATE_RENT,
    DELETE_RENT,
  } from "./types";
  
  import RentDataService from "../service/rentService";
  
  export const createRent = (vehicle, amount) => async (dispatch) => {
    try {
      const res = await RentDataService.create({ vehicle, amount });
  
      dispatch({
        type: CREATE_RENT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveRents = () => async (dispatch) => {
    try {
      const res = await RentDataService.getAll();
  
      dispatch({
        type: RETRIEVE_RENTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateRent = (id, data) => async (dispatch) => {
    try {
      const res = await RentDataService.update(id, data);
  
      dispatch({
        type: UPDATE_RENT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteRent = (id) => async (dispatch) => {
    try {
      await RentDataService.remove(id);
  
      dispatch({
        type: DELETE_RENT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
