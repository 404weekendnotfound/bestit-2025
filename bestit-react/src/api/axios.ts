import axios from "axios";

export const API_URL = 'https://app.weekendnotfound.pl';

const axiosInstance = axios.create({
    baseURL: API_URL
});

export default axiosInstance;
