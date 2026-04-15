import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/rules',
  withCredentials: true,
});

export const getRules = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createRule = async (ruleData) => {
  const response = await api.post('/', ruleData);
  return response.data;
};

export const deleteRule = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
