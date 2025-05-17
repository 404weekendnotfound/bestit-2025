import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || 'https://api.weekendnotfound.pl';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default axiosInstance;
