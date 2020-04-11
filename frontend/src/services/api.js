import axios from 'axios';

// configura a url do serviço backend
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;