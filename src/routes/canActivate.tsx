import { type ComponentType } from "react";

export const canActivate = <T extends {}>(Component: ComponentType<T>): ComponentType<T> => {

    return (props: T) => {
        
    //     const [activateState,setActivateState]= useState<boolean | null>(null);
    //     const checkGaurds=async(gaurds: Predicate[])=>{
    //         const ans= gaurds.map(guard => guard())
    //         setActivateState(ans.every((val)=> val))
    //     }

    //     useEffect(()=>{
    //         checkGaurds(gaurds)
    //     },[])

    //     if (!activateState) return <Navigate to={to} />
    //     return <Component {...props} />
    return <Component {...props}/>
    }
}