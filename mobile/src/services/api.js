import axios from 'axios';

// configura a url base para o backend
const api = axios.create({
  baseURL: 'http://192.168.0.56:3333'
});

export default api;