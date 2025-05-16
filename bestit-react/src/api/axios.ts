import axios from "axios";

export const API_URL = 'http://localhost:7562';

const axiosInstance = axios.create({
    baseURL: API_URL
});

export default axiosInstance;
