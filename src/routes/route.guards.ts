import { getRole } from "../services/auth.service";

const checkLogin = async () => {
    try {
        const res = await getRole();
        return true;
    } catch (error) {
        return false;
    }
}

export const isOwner = async () => {
    const res = await getRole();

    return res.role === "owner";
}

export const isFacilityManager = async () => {
    const res = await getRole();
    return res.role === "facilitymanager";
}

export const isWorkplaceManager = async () => {
    const res = await getRole();
    return res.role === "workplacemanager";
}

export const isToolCribManager = async () => {
    const res = await getRole();
    return res.role === "toolCribmanager";
}

export const isWorker = async () => {
    const res = await getRole();
    return res.role === "worker";
}

export const GUARDS = {
    checkLogin,
    isOwner,
    isFacilityManager,
    isWorkplaceManager,
    isToolCribManager,
    isWorker
}