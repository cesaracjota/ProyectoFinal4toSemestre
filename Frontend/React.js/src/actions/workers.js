import {
    CREATE_WORKER,
    RETRIEVE_WORKERS,
    UPDATE_WORKER,
    DELETE_WORKER,
    DELETE_ALL_WORKERS,
  } from "./types";
  
  import WorkerDataService from "../service/driversService";
  
  export const createWorker = (name, mobile, email, address, joindate, trips,ageWorker,gender,license, photo, rent_info) => async (dispatch) => {
    try {
      const res = await WorkerDataService.create({name, mobile, email, address, joindate, trips,ageWorker,gender,license, photo, rent_info });
  
      dispatch({
        type: CREATE_WORKER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveWorkers = () => async (dispatch) => {
    try {
      const res = await WorkerDataService.getAll();
  
      dispatch({
        type: RETRIEVE_WORKERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateWorker = (id, data) => async (dispatch) => {
    try {
      const res = await WorkerDataService.update(id, data);
  
      dispatch({
        type: UPDATE_WORKER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteWorker = (id) => async (dispatch) => {
    try {
      await WorkerDataService.remove(id);
  
      dispatch({
        type: DELETE_WORKER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllTutorials = () => async (dispatch) => {
    try {
      const res = await WorkerDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_WORKERS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findWorkersByName = (name) => async (dispatch) => {
    try {
      const res = await WorkerDataService.findByName(name);
  
      dispatch({
        type: RETRIEVE_WORKERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };