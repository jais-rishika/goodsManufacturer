import axiosInstance from "./axios.instance"

//get
export const getToolCribManagers = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/owner/facility-manager?${filter}`); 
        console.log(res);
               
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getWorkPlaceToolCribManagers = async (filter: string) => {
    try {
        const res = await axiosInstance.get(`/owner/facility-manager?${filter}`); 
        console.log(res);
               
        return res.data;
    } catch (error) {
        throw error;
    }
}

//add
export const addToolCribManagers = async (payload: any) => {
    try {
        const res = await axiosInstance.post('/workplace-manager/tool-crib-manager', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//edit
export const editToolCribManagers = async (payload: any, id: string) => {
    try {
        const res = await axiosInstance.patch(`/owner/facility-manager/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

//delete
export const deleteToolCribManagers = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`owner/facility-manager/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
