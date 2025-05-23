import type { LoginForm } from "../pages/Auth/Login/Login.types";
import axiosInstance from "./axios.instance";

export const login = async (data: LoginForm) => {
    try {
        const res = await axiosInstance.post('/auth/login', data);
        console.log("res", res);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getRole = async () => {
    const token = localStorage.getItem("token");
    try {
        const res = await axiosInstance.get('/auth/role');
        console.log("resrolw", res);
        return res.data;
    } catch (error) {
        throw error;
    }
}