import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact API
export const submitContactMessage = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

export default api;
