import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://friendly-frog-slippers.cyclic.app/api',
});

export default instance;