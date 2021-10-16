import http from "../http-common";

const getAll = () => {
  return http.get("/vehicles/rent");
};

const get = id => {
  return http.get(`/vehicles/rent/${id}`);
};

const create = data => {
  return http.post("/vehicles/rent", data);
};

const update = (id, data) => {
  return http.put(`/vehicles/rent/${id}`, data);
};

const remove = id => {
  return http.delete(`/vehicles/rent/${id}`);
};

const removeAll = () => {
  return http.delete(`/vehicles/rent`);
};

const RentService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default RentService;