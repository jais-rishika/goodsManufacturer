import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://7060-115-160-223-174.ngrok-free.app",
    headers: {
        Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : '',
        "ngrok-skip-browser-warning": true
    }
})
export default axiosInstance;