import axios from 'axios';

// https://api.hgbrasil.com/weather?key=c146c96e&lat=-23.682&lon=-46.875&user_ip=remote

export const key = 'c146c96e';

const api = axios.create({
    baseURL: 'https://api.hgbrasil.com'
});

export default api;