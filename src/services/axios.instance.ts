import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://cfdd-103-241-80-141.ngrok-free.app",
    headers: {
        Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : '',
        "ngrok-skip-browser-warning": true
    }
})
export default axiosInstance;