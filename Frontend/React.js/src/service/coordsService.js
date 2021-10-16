import http from "../http-common";

const getAll = () => {
  return http.get("/coordinates");
};

const get = id => {
  return http.get(`/coordinates/${id}`);
};

const create = data => {
  return http.post("/coordinates", data);
};

const update = (id, data) => {
  return http.put(`/coordinates/${id}`, data);
};

const remove = id => {
  return http.delete(`/coordinates/${id}`);
};

const removeAll = () => {
  return http.delete(`/coordinates`);
};

const CoordinateService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default CoordinateService;