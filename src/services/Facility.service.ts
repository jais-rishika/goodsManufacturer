import type { FacilityForm } from "../pages/Admin/Facility/Modals/Modal.types"
import axiosInstance from "./axios.instance"

//get
export const getFacility=async(filter: string)=>{
    try {
        console.log(filter);
        
        const res= await axiosInstance.get(`/owner/facility?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getAvailFacilityManagers=async(val: string)=>{
    try {
        const res= await axiosInstance.get(`/owner/facility-manager/available?search=${val}&fields=email`);        
        return res.data;
    } catch (error) {
        throw error;
    }
}

//add
export const addFacility=async(payload: FacilityForm)=>{
    try {
        const res= await axiosInstance.post('/owner/facility',payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//edit
export const editFacility=async(payload: FacilityForm, id: string)=>{
    try {
        const res= await axiosInstance.patch(`/owner/facility/${id}`,payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//delete
export const deleteFacility=async(id: string)=>{
    try {
        const res= await axiosInstance.delete(`/owner/facility/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}