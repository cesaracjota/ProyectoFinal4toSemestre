import http from "../http-common";

const getAll = () => {
  return http.get("/passengers");
};

const get = id => {
  return http.get(`/passengers/${id}`);
};

const create = data => {
  return http.post("/passengers", data);
};

const update = (id, data) => {
  return http.put(`/passengers/${id}`, data);
};

const remove = id => {
  return http.delete(`/passengers/${id}`);
};

const removeAll = () => {
  return http.delete(`/passengers`);
};


const PassengerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default PassengerService;