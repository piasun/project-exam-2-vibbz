import axios from 'axios';

const API_BASE = 'https://nf-api.onrender.com/api/v1/social';

export const api = axios.create({
  baseURL: API_BASE,
});
