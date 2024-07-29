// src/axiosConfig.js
import axios from 'axios';

import { apiBaseURL } from '../../assets/constants/Constant';

const axiosInstance = axios.create({
    baseURL: apiBaseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            config.headers.user_id = userId
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error, e.g., redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
