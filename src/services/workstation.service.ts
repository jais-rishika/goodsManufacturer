import type { WorkStationForm } from "../pages/WorkspaceManager/WorkStation/Modals/Modal.types";
import axiosInstance from "./axios.instance"

export const getWorkStation=async(filter: string)=>{
    try {
        const res= await axiosInstance.get(`/facility-manager/workStation?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const fetchWorkplaceWorkStations=async(filter: string)=>{
    try {
        const res= await axiosInstance.get(`/workplace-manager/workstation?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const addWorkStation=async(payload: WorkStationForm)=>{
    try {
        const res= await axiosInstance.post('/workplace-manager/workstation',payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const editWorkStation=async(payload: any, id: string)=>{
    try {
        const res= await axiosInstance.patch(`/workplace-manager/workstation/${id}`,payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteWorkStation=async(id: string)=>{
    try {
        const res= await axiosInstance.delete(`/workplace-manager/workstation/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}