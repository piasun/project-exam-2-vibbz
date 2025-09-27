import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nf-api.onrender.com/api/v1/social',
});
