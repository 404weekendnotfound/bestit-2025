import axios from "axios";

export const API_URL = 'https://api.weekendnotfound.pl';

const axiosInstance = axios.create({
    baseURL: API_URL
});

export default axiosInstance;
