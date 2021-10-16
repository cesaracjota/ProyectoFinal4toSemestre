import {
    CREATE_COORDINATE,
    RETRIEVE_COORDINATES,
    UPDATE_COORDINATE,
    DELETE_COORDINATE
  } from "./types";
  
  import CoordinateDataService from "../service/coordsService";
  
  export const createCoordinate = (name,latitude, longitude) => async (dispatch) => {
    try {
      const res = await CoordinateDataService.create({name,latitude, longitude });
  
      dispatch({
        type: CREATE_COORDINATE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveCoordinates = () => async (dispatch) => {
    try {
      const res = await CoordinateDataService.getAll();
  
      dispatch({
        type: RETRIEVE_COORDINATES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateCoordinate = (id, data) => async (dispatch) => {
    try {
      const res = await CoordinateDataService.update(id, data);
  
      dispatch({
        type: UPDATE_COORDINATE,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteCoordinate = (id) => async (dispatch) => {
    try {
      await CoordinateDataService.remove(id);
  
      dispatch({
        type: DELETE_COORDINATE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };