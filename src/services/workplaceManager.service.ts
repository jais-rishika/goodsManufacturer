// import type { any } from "../pages/Admin/WorkPlace/Modals/Modal.types"
import axiosInstance from "./axios.instance"

export const getWorkPlaceManager=async(filter: string)=>{
    try {
        const res= await axiosInstance.get(`/facility-manager/workplace-manager?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getAvailWorkSpaceManager=async(seachVal: string)=>{
    try {
        const res= await axiosInstance.get(`/facility-manager/workplace-manager/available?search=${seachVal}&fields=email&fields=name?`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const addWorkPlaceManager=async(payload: any)=>{
    try {
        const res= await axiosInstance.post('/facility-manager/workplace-manager',payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const editWorkPlaceManager=async(payload: any, id: string)=>{
    try {
        const res= await axiosInstance.patch(`facility-manager/workplace-manager/${id}`,payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteWorkPlaceManager=async(id: string)=>{
    try {
        const res= await axiosInstance.delete(`facility-manager/workplace-manager/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}