import {
    CREATE_WORKER,
    RETRIEVE_WORKERS,
    UPDATE_WORKER,
    DELETE_WORKER,
    DELETE_ALL_WORKERS,
  } from "../actions/types";
  
  const initialState = [];
  
  function workerReducer(workers = initialState,action ) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_WORKER:
        return [...workers, payload];
  
      case RETRIEVE_WORKERS:
        return payload;
  
      case UPDATE_WORKER:
        return workers.map((worker) => {
          if (worker.id === payload.id) {
            return {
              ...worker,
              ...payload,
            };
          } else {
            return worker;
          }
        });
  
      case DELETE_WORKER:
        return workers.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_WORKERS:
        return [];
  
      default:
        return workers;
    }
  };
  
  export default workerReducer;