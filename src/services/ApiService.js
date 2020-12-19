import http from "../http-common";

const login = data => {
  return http.post("/Security/Authenticate", data);
};


const getSalesReportList = data => {
  return http.post("/SiparisListesi/SalesReportList",data);
};

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

export default {
  getSalesReportList,
  get,
  login,
  update,
  remove,
  removeAll,
  findByTitle
};