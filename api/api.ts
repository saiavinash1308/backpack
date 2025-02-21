import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL!, // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
