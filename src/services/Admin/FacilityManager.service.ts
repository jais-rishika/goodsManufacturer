import type { FacilityManagerForm } from "../../pages/Admin/FacilityManager/Modals/Modal.types";
import axiosInstance from "../axios.instance"

export const getFacilityManager = async () => {
    try {
        const res = await axiosInstance.get(`/owner/facility-manager`);        
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const addFacilityManager = async (payload: FacilityManagerForm) => {
    try {
        const res = await axiosInstance.post('/owner/facility-manager', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const editFacilityManager = async (payload: FacilityManagerForm, id: string) => {
    try {
        const res = await axiosInstance.patch(`/owner/facility-manager/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteFacilityManager = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`owner/facility-manager/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}