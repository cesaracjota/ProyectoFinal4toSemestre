import http from "../http-common";

const getAll = () => {
  return http.get("/trip/info");
};

const get = id => {
  return http.get(`/trip/info/${id}`);
};

const create = data => {
  return http.post("/trip/info", data);
};

const update = (id, data) => {
  return http.put(`/trip/info/${id}`, data);
};

const remove = id => {
  return http.delete(`/trip/info/${id}`);
};

const removeAll = () => {
  return http.delete(`/trip/info`);
};

const TripInfoService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default TripInfoService;