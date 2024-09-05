import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  return axios.get(url).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(url, newPerson).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

const update = (id, newPerson) => {
  return axios.put(`${url}/${id}`, newPerson).then((response) => response.data);
};

export default {
  create,
  remove,
  update,
  getAll,
};
