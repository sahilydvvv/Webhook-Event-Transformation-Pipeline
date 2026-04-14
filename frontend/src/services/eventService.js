import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data.events;
};

export const getEventsBySource = async (source) => {
  const response = await api.get(`/events/source?source=${source}`);
  return response.data.events;
};

export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};
