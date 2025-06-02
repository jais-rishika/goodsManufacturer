import { useEffect, useState, type ComponentType } from "react";
import { Navigate } from "react-router";

type Predicate = () => Promise<boolean>;

export const canActivate = <T extends {}>(Component: ComponentType<T>, gaurds: Predicate[], to: string = "/") => {
    return (props: T) => {
        
        const [activateState,setActivateState]= useState(false);

        const checkGaurds=async(gaurds: Predicate[])=>{
            const ans= await Promise.all((gaurds.map(guard => guard())))
            setActivateState(ans.every((val)=> val))
        }

        useEffect(()=>{
            checkGaurds(gaurds)
        },[])

        if (!activateState) return <Navigate to={to} />
        return <Component {...props} />
    }
}