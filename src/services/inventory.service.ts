import type { SendToolPayload } from "../pages/FacilityManager/ToolsInventory/Modal/Modal.types";
import axiosInstance from "./axios.instance"

//get
export const getAllToolCribs = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`facility-manager/tool-cribs?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getTools = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/owner/tool?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
export const getToolsFacilityManager = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`facility-manager/tool?${filter}`);

        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getToolCribInventory = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/workplace-manager/inventory?${filter}`);

        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getToolCribManagerInventory = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/tool-crib-manager/inventory?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getWorkplaceInventory=async(filter: string,id: string)=>{
    try {
        const res = await axiosInstance.get(`/facility-manager/tool-cribs/${id}/inventory?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getToolCribInventoryWorker = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/worker/inventory?${filter}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//add / post
export const addTools = async (payload: FormData) => {
    try {
        const res = await axiosInstance.post('/owner/tool', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const sendTool = async (payload: SendToolPayload) => {
    try {
        const res = await axiosInstance.post('facility-manager/tools', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const uploadToolImage = async (id: string, img: File) => {
    try {
        const res = await axiosInstance.post(`/facility-manager/tools${id}`, img);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//edit
export const editTools = async (payload: FormData, id: string) => {
    try {
        const res = await axiosInstance.patch(`/owner/tool/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//delete
export const deleteTools = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/owner/tool/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

