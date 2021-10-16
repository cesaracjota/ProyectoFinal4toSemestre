import {
    CREATE_COUPON,
    RETRIEVE_COUPONS,
    UPDATE_COUPON,
    DELETE_COUPON,
    DELETE_ALL_COUPONS,
  } from "./types";
  
  import CouponDataService from "../service/couponsService";
  
  export const createCoupon = (code,description, expired_date, start_date, amount, coupon_number, used_count) => async (dispatch) => {
    try {
      const res = await CouponDataService.create({ code,description, expired_date, start_date, amount, coupon_number, used_count });
  
      dispatch({
        type: CREATE_COUPON,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveCoupons = () => async (dispatch) => {
    try {
      const res = await CouponDataService.getAll();
  
      dispatch({
        type: RETRIEVE_COUPONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateCoupon = (id, data) => async (dispatch) => {
    try {
      const res = await CouponDataService.update(id, data);
  
      dispatch({
        type: UPDATE_COUPON,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteCoupon = (id) => async (dispatch) => {
    try {
      await CouponDataService.remove(id);
  
      dispatch({
        type: DELETE_COUPON,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllTutorials = () => async (dispatch) => {
    try {
      const res = await CouponDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_COUPONS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findCouponsByName = (name) => async (dispatch) => {
    try {
      const res = await CouponDataService.findByName(name);
  
      dispatch({
        type: RETRIEVE_COUPONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };