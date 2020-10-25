import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api-controle-ponto.herokuapp.com/'
});

export default api;
