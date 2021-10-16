import http from "../http-common";

const getAll = () => {
  return http.get("/workerspayment");
};

const get = id => {
  return http.get(`/workerspayment/${id}`);
};

const create = data => {
  return http.post("/workerspayment", data);
};

const update = (id, data) => {
  return http.put(`/workerspayment/%23${id}`, data);
};

const remove = id => {
  return http.delete(`/workerspayment/${id}`);
};

const removeAll = () => {
  return http.delete(`/workerspayment`);
};

const WorkerPaymentService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default WorkerPaymentService;