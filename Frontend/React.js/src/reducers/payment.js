import {
    CREATE_PAYMENT,
    RETRIEVE_PAYMENTS,
    UPDATE_PAYMENT,
    DELETE_PAYMENT,
    DELETE_ALL_PAYMENTS,
  } from "../actions/types";
  
  const initialState = [];
  
  function paymentReducer(payments = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PAYMENT:
        return [...payments, payload];
  
      case RETRIEVE_PAYMENTS:
        return payload;
  
      case UPDATE_PAYMENT:
        return payments.map((payment) => {
          if (payment.id === payload.id) {
            return {
              ...payment,
              ...payload,
            };
          } else {
            return payment;
          }
        });
  
      case DELETE_PAYMENT:
        return payments.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_PAYMENTS:
        return [];
  
      default:
        return payments;
    }
  };
  
  export default paymentReducer;