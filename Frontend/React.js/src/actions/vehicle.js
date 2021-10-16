import {
    CREATE_VEHICLE,
    RETRIEVE_VEHICLES,
    UPDATE_VEHICLE,
    DELETE_VEHICLE,
    DELETE_ALL_VEHICLES,
  } from "./types";
  
  import VehicleDataService from "../service/vehicleService";
  
  export const createVehicle = (number, model, capacity, fuel, insurance_renewal_date, type, photo, alquiler) => async (dispatch) => {
    try {
      const res = await VehicleDataService.create({ number, model, capacity, fuel, insurance_renewal_date, type, photo, alquiler });
      dispatch({
        type: CREATE_VEHICLE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveVehicles = () => async (dispatch) => {
    try {
      const res = await VehicleDataService.getAll();
  
      dispatch({
        type: RETRIEVE_VEHICLES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateVehicle = (id, data) => async (dispatch) => {
    try {
      const res = await VehicleDataService.update(id, data);
  
      dispatch({
        type: UPDATE_VEHICLE,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteVehicle = (id) => async (dispatch) => {
    try {
      await VehicleDataService.remove(id);
  
      dispatch({
        type: DELETE_VEHICLE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllVehicles = () => async (dispatch) => {
    try {
      const res = await VehicleDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_VEHICLES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
