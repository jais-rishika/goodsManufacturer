import { useContext } from "react";
import { MainContext } from "../App";

export const checkLogin = () => {
    return !!localStorage.getItem("token")
}

export const isOwner = () => {
    const {role}= useContext(MainContext)!
    return role === "owner"
};

export const isFacilityManager = () =>{
    const {role}= useContext(MainContext)!
    return role === "facilitymanager";
} 

export const isWorkplaceManager = () =>{
    const {role}= useContext(MainContext)!
    return role === "workplacemanager";
} 

export const isToolCribManager = () =>{
    const {role}= useContext(MainContext)!
    return role === "toolCribmanager";
} 

export const isWorker = () =>{
    const {role}= useContext(MainContext)!
    return role === "worker";
} 
