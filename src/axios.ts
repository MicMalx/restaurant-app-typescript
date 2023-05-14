import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://restaurant-api-seqm.onrender.com/api',
});

export default instance;