import type { LoginForm } from "../pages/Auth/Login/Login.types";
import axiosInstance from "./axios.instance";

export const roles = {
    "owner": "owner",
    "facilitymanager": "facility-manager",
    "workplacemanager": "workplace-manager",
    "toolcribmanager": "tool-crib-manager",
    "worker": "worker"
}

export const login = async (data: LoginForm) => {
    try {
        const res = await axiosInstance.post('/auth/login', data);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getRole = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw { message: 'SESSION EXPIRED, PLEASE LOGIN' }
    try {
        const res = await axiosInstance.get('/auth/role');
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const editworkerImage = async (payload: FormData) => {
    try {
        const res = await axiosInstance.patch(`/auth/upload-profile`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getuserDetail = async () => {
    try {
        const res = await axiosInstance.get('/auth/hierarchy')
        return res.data;
    } catch (error) {
        throw error;
    }
}