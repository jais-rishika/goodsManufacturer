import axiosInstance from "./axios.instance"

export const getSpecialRequests=async(filter: string)=>{
    try {
        const res=await axiosInstance.get(`/workplace-manager/special-tool-requests?page&size&toolName&workerName&startDateTime&endDateTime?${filter}`)
        return res.data;
    } catch (error) {
        throw error
    }
}

export const getRequests=async(filter: string)=>{
    try {
        const res=await axiosInstance.get(`?${filter}`)
        return res.data;
    } catch (error) {
        throw error
    }
}

export const  acceptRejectSpReq= async(id: string,approve: boolean)=>{
    try {
        const res=await axiosInstance.patch(`workplace-manager/tool-request-item/${id}/decision?approve=${approve}?`)
        return res.data;
    } catch (error) {
        throw error
    }
}