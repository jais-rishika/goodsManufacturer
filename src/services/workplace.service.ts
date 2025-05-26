// import type { WorkPlaceForm } from "../pages/Admin/WorkPlace/Modals/Modal.types"
import axiosInstance from "./axios.instance"

export const getWorkPlace=async()=>{
    try {
        const res= await axiosInstance.get(`/owner/WorkPlace?page=0&size=10`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getAvailWorkPlaceManagers=async(val: string)=>{
    try {
        const res= await axiosInstance.get(`/owner/WorkPlace-manager/available?search=${val}&fields=email`);        
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getWorkPlaceInSpecificFacility=async()=>{
    
}

export const addWorkPlace=async(payload: WorkPlaceForm)=>{
    try {
        const res= await axiosInstance.post('/owner/WorkPlace',payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const editWorkPlace=async(payload: WorkPlaceForm, id: string)=>{
    try {
        const res= await axiosInstance.patch(`/owner/WorkPlace/${id}`,payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteWorkPlace=async(id: string)=>{
    try {
        const res= await axiosInstance.delete(`/owner/WorkPlace/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}