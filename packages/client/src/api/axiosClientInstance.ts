import axios from 'axios';

export const axiosClientInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
});