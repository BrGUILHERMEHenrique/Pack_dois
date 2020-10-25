import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-controle-ponto.herokuapp.com/'
});

export default api;
