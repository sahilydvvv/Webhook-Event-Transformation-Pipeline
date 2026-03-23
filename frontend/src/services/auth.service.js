import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

// Create an Axios instance with credentials enabled to handle cookies automatically
export const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  signup: async (userData) => {
    const response = await authApi.post('/signup', userData);
    return response.data;
  },

  signin: async (credentials) => {
    const response = await authApi.post('/signin', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await authApi.post('/logout');
    return response.data;
  },
  
  getMe: async () => {
    const response = await authApi.get('/me');
    return response.data;
  }
};
