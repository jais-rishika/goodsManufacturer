import type { WorkersForm } from "../pages/WorkspaceManager/Workers/Modals/Modal.types";
import axiosInstance from "./axios.instance"

//get
export const getSingleWorkerDetails= async (id: string)=>{
    try {
        const res= await axiosInstance.get(`tool-crib-manager/worker/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
export const getWorkers = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/workplace-manager/worker?${filter}`);                
        return res.data;
    } catch (error) {
        throw error;
    }
}

//searvh Val

export const getWorkPlaceWorkers = async (val: string) => {
    try {
        const res = await axiosInstance.get(`/workplace-manager/worker/available${val}`); 
               
        return res.data;
    } catch (error) {
        throw error;
    }
}

//add
export const addWorkers = async (payload: WorkersForm) => {
    try {
        const res = await axiosInstance.post('/workplace-manager/worker', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//edit
export const editWorkers = async (payload: WorkersForm, id: string) => {
    try {
        const res = await axiosInstance.patch(`/workplace-manager/worker/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//delete
export const deleteWorkers = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/workplace-manager/worker/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
