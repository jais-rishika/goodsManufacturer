import type { req } from "../pages/Worker/ToolsInventory/ToolsInventory.types";
import axiosInstance from "./axios.instance"

//worker
export const getRequests = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`worker/my-requests?${filter}`)
        return res.data;
    } catch (error) {
        throw error
    }
}

//toolCribManager
export const getAllToolReq = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`tool-crib-manager/all-requests?${filter}`)
        return res.data;
    } catch (error) {
        throw error
    }
}

export const acceptRejecNormalReq = async (id: string, approve: boolean) => {
    try {
        const res = await axiosInstance.patch(`/tool-crib-manager/tool-request-item/${id}/decision?approve=${approve}`)
        return res.data;
    } catch (error) {
        throw error
    }
}

export const returnTool = async (payload: any) => {
    try {
        const res = await axiosInstance.put(`tool-crib-manager/returns`, payload)
        return res.data;
    } catch (error) {
        throw error
    }
}

//workplace-manager
export const getSpecialRequests = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/workplace-manager/special-tool-requests?${filter}`)
        return res.data;
    } catch (error) {
        throw error
    }
}
export const acceptRejectSpReq = async (id: string, approve: boolean) => {
    try {
        const res = await axiosInstance.patch(`workplace-manager/tool-request-item/${id}/decision?approve=${approve}`)
        return res.data;
    } catch (error) {
        throw error
    }
}

export const sendToolReq = async (data: { items: req[] }) => {
    try {
        const res = await axiosInstance.post(`/worker/request-tools`, data)
        return res.data;
    } catch (error) {
        throw error
    }
}

export const allSendToolLogs = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/facility-manager/tool-logs?${filter}`)
        return res.data;
    } catch (error) {
        throw error
    }
}