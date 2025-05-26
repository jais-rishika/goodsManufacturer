import type { ToolForm } from "../pages/Admin/Tools/Tools.types";
import type { SendToolForm } from "../pages/FacilityManager/ToolsInventory/Modal/Modal.types";
import axiosInstance from "./axios.instance"

//get
export const getTools = async () => {
    try {
        const res = await axiosInstance.get(`/owner/Tool?page=0&size=5`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//add / post
export const addTools = async (payload: ToolForm) => {
    try {
        const res = await axiosInstance.post('/owner/Tool', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const sendTool = async (data: SendToolForm) => {

}

export const uploadToolImage = async (id: string, img: File) => {

}

//edit
export const editTools = async (payload: ToolForm, id: string) => {
    try {
        const res = await axiosInstance.patch(`/owner/Tool/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//delete
export const deleteTools = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/owner/Tool/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

