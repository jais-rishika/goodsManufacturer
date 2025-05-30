import axios from "axios";
import { hideLoader, showLoader } from "../components/Loader/Loader";

const axiosInstance = axios.create({
    baseURL: "https://cfdd-103-241-80-141.ngrok-free.app",
})

// intercept the request and do common things
axiosInstance.interceptors.request.use((req) => {
    // showLoader();
    req.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    req.headers['ngrok-skip-browser-warning'] = true;
    return req;
});

axiosInstance.interceptors.response.use((res) => {
    // do whatever with the response here
    hideLoader();
    return res;
})

export default axiosInstance;