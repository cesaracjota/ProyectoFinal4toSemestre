import http from "../http-common";

const getAll = () => {
  return http.get("/vehicles");
};

const get = id => {
  return http.get(`/vehicles/${id}`);
};

const create = data => {
  return http.post("/vehicles", data);
};

const update = (id, data) => {
  return http.put(`/vehicles/${id}`, data);
};

const remove = id => {
  return http.delete(`/vehicles/${id}`);
};

const removeAll = () => {
  return http.delete(`/vehicles`);
};

const VehicleService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default VehicleService;