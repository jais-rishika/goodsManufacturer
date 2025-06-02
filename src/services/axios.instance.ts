import axios from "axios";
import { hideLoader, showLoader } from "../components/Loader/Loader";

const axiosInstance = axios.create({
    baseURL: " https://df82-115-160-223-174.ngrok-free.app",
})

// intercept the request and do common things
axiosInstance.interceptors.request.use((req) => {
    showLoader();
    req.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    req.headers['ngrok-skip-browser-warning'] = true;
    return req;
});

axiosInstance.interceptors.response.use((res) => {
    hideLoader();
    return res;
},
    (error) => {
        hideLoader();
        throw Promise.reject(error);
    }
)



export default axiosInstance;