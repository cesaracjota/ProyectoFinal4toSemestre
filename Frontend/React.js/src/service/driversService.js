import http from "../http-common";

const getAll = () => {
  return http.get("/workers");
};

const get = id => {
  return http.get(`/workers/${id}`);
};

const create = data => {
  return http.post("/workers", data);
};

const update = (id, data) => {
  return http.put(`/workers/${id}`, data);
};

const remove = id => {
  return http.delete(`/workers/${id}`);
};

const removeAll = () => {
  return http.delete(`/workers`);
};

const WorkerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default WorkerService;