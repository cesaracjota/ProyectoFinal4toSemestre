import {
    CREATE_PAYMENT,
    RETRIEVE_PAYMENTS,
    UPDATE_PAYMENT,
    DELETE_PAYMENT,
    DELETE_ALL_PAYMENTS,
  } from "./types";
  
  import WorkerPaymentDataService from "../service/paymentService";
  
  export const createWorkerPayment = (transaction, name, date, amount, status, commission) => async (dispatch) => {
    try {
      const res = await WorkerPaymentDataService.create({ transaction, name, date, amount, status, commission });
  
      dispatch({
        type: CREATE_PAYMENT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveWorkersPayment = () => async (dispatch) => {
    try {
      const res = await WorkerPaymentDataService.getAll();
  
      dispatch({
        type: RETRIEVE_PAYMENTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateWorkerPayment = (id, data) => async (dispatch) => {
    try {
      const res = await WorkerPaymentDataService.update(id, data);
  
      dispatch({
        type: UPDATE_PAYMENT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteWorkerPayment = (id) => async (dispatch) => {
    try {
      await WorkerPaymentDataService.remove(id);
  
      dispatch({
        type: DELETE_PAYMENT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllPayments = () => async (dispatch) => {
    try {
      const res = await WorkerPaymentDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_PAYMENTS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  