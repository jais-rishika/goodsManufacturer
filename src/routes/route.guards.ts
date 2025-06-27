import { useContext } from "react";
import { MainContext } from "../App";

export const checkLogin = () => {
    return !!localStorage.getItem("token")
}

export const isOwner = () => {
    
};

export const isFacilityManager = () =>{
    
} 

export const isWorkplaceManager = () =>{
    
} 

export const isToolCribManager = () =>{
    
} 

export const isWorker = () =>{
    return true;
} 
