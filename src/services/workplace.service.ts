// import type { any } from "../pages/Admin/WorkPlace/Modals/Modal.types"
import type { WorkPlaceForm } from "../pages/FacilityManager/WorkPlace/Modals/Modal.types";
import axiosInstance from "./axios.instance"

export const getWorkPlace=async(filter: string)=>{
    try {
        const res= await axiosInstance.get(`/facility-manager/workplace?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const fetchManagerWorkplaces=async(filter: string)=>{
    try {
        const res= await axiosInstance.get(`/facility-manager/workplace?fields=${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const addWorkPlace=async(payload: WorkPlaceForm)=>{
    try {
        const res= await axiosInstance.post('/facility-manager/workplace',payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const editWorkPlace=async(payload: any, id: string)=>{
    try {
        const res= await axiosInstance.patch(`/facility-manager/workplace/${id}`,payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteWorkPlace=async(id: string)=>{
    try {
        const res= await axiosInstance.delete(`/facility-manager/workplace/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}