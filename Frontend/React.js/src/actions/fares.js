import {
    CREATE_FARE,
    RETRIEVE_FARES,
    UPDATE_FARE,
    DELETE_FARE,
    DELETE_ALL_FARES,
  } from "./types";
  
  import FareDataService from "../service/faresService";
  
  export const createFare = (fare_per_km, minimum_fare, minimum_distance, waiting_fare) => async (dispatch) => {
    try {
      const res = await FareDataService.create({ fare_per_km, minimum_fare, minimum_distance, waiting_fare });
  
      dispatch({
        type: CREATE_FARE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveFares = () => async (dispatch) => {
    try {
      const res = await FareDataService.getAll();
  
      dispatch({
        type: RETRIEVE_FARES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateFare = (id, data) => async (dispatch) => {
    try {
      const res = await FareDataService.update(id, data);
  
      dispatch({
        type: UPDATE_FARE,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteFare = (id) => async (dispatch) => {
    try {
      await FareDataService.remove(id);
  
      dispatch({
        type: DELETE_FARE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllTutorials = () => async (dispatch) => {
    try {
      const res = await FareDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_FARES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findFaresByName = (name) => async (dispatch) => {
    try {
      const res = await FareDataService.findByName(name);
  
      dispatch({
        type: RETRIEVE_FARES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };