import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getAppointments = async () => {
  const response = await api.get('/api/appointment');
  return response.data.items;
};

export const updateAppointmentSituation = async (id, newSituation, conclusion) => {
  await api.put(`/api/appointment/${id}`, { situation: newSituation, conclusion });
};

export const updateAppointmentConclusion = async (id, situation, conclusion) => {
  await api.put(`/api/appointment/${id}`, { situation, conclusion });
};

export const deleteAppointment = async (id) => {
  await axios.delete(`/api/appointment/${id}`);
};

export default api;