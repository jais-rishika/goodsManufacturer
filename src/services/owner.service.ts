import axiosInstance from "./axios.instance"

export const getAllEmployee=async(filter: string)=>{
    try {
        const res=await axiosInstance.get(`/owner/employees?${filter}`)
        return res.data
    } catch (error) {
        throw error
    }
}


export const topDemandedTools=async()=>{
    try {
        const res=await axiosInstance.get(`/owner/top-demanded-tools`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const mostBrokenTools=async()=>{
    try {
        const res=await axiosInstance.get(`/owner/most-broken-tools`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const topPricedTools=async()=>{
    try {
        const res=await axiosInstance.get(`/owner/top-priced-tools`)
        return res.data
    } catch (error) {
        throw error
    }
}