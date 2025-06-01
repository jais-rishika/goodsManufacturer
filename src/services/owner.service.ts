import axiosInstance from "./axios.instance"

export const getAllEmployee=async(filter: string)=>{
    try {
        const res=await axiosInstance.get(`/owner/employees?${filter}`)
        return res.data
    } catch (error) {
        throw error
    }
}