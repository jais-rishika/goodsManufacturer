import type { FacilityManagerForm } from "../pages/Admin/FacilityManager/Modals/Modal.types";
import axiosInstance from "./axios.instance"

//get
export const getFacilityManager = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/owner/facility-manager?${filter}`); 
        console.log(res);
               
        return res.data;
    } catch (error) {
        throw error;
    }
}

//add
export const addFacilityManager = async (payload: FacilityManagerForm) => {
    try {
        const res = await axiosInstance.post('/owner/facility-manager', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//edit
export const editFacilityManager = async (payload: FacilityManagerForm, id: string) => {
    try {
        const res = await axiosInstance.patch(`/owner/facility-manager/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//delete
export const deleteFacilityManager = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`owner/facility-manager/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
