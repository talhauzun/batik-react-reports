import axios from 'axios';

export const axiosBase = axios.create({
    // .. where we make our configurations
        baseURL: 'http://localhost:5001/'
    });