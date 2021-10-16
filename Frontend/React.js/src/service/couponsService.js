import http from "../http-common";

const getAll = () => {
  return http.get("/coupons");
};

const get = id => {
  return http.get(`/coupons/${id}`);
};

const create = data => {
  return http.post("/coupons", data);
};

const update = (id, data) => {
  return http.put(`/coupons/${id}`, data);
};

const remove = id => {
  return http.delete(`/coupons/${id}`);
};

const removeAll = () => {
  return http.delete(`/coupons`);
};

const findByName = name => {
  return http.get(`/coupons?title=${name}`);
};

const CouponService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default CouponService;