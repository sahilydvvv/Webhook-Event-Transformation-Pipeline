import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const signup = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/signin', userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/me');
  return response.data;
};
