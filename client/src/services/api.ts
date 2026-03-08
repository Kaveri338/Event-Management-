import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

console.log('📡 Initial API Base URL:', api.defaults.baseURL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Log the final URL being hit
  console.log(`🚀 Requesting: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

export default api;