import http from "../http-common";

const getAll = () => {
  return http.get("/fares");
};

const get = id => {
  return http.get(`/fares/${id}`);
};

const create = data => {
  return http.post("/fares", data);
};

const update = (id, data) => {
  return http.put(`/fares/${id}`, data);
};

const remove = id => {
  return http.delete(`/fares/${id}`);
};

const removeAll = () => {
  return http.delete(`/fares`);
};

const findByName = name => {
  return http.get(`/fares?title=${name}`);
};

const FareService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default FareService;