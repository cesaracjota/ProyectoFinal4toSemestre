import {
    CREATE_COUPON,
    RETRIEVE_COUPONS,
    UPDATE_COUPON,
    DELETE_COUPON,
    DELETE_ALL_COUPONS,
  } from "../actions/types";
  
  const initialState = [];
  
  function couponReducer(coupons = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_COUPON:
        return [...coupons, payload];
  
      case RETRIEVE_COUPONS:
        return payload;
  
      case UPDATE_COUPON:
        return coupons.map((coupon) => {
          if (coupon.id === payload.id) {
            return {
              ...coupon,
              ...payload,
            };
          } else {
            return coupon;
          }
        });
  
      case DELETE_COUPON:
        return coupons.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_COUPONS:
        return [];
  
      default:
        return coupons;
    }
  };
  
  export default couponReducer;