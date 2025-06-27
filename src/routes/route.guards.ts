
export const checkLogin = () => {
    return !!localStorage.getItem("token")
}

export const isOwner = () => {
    return true    
};

export const isFacilityManager = () =>{
    return true    
} 

export const isWorkplaceManager = () =>{
    return true    
} 

export const isToolCribManager = () =>{
    return true    
} 

export const isWorker = () =>{
    return true;
} 
