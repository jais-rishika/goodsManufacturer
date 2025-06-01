import type { HeaderAction, HeaderState } from "./WorkPlaceEmployeeHeader.types";

export const headerInitialState: HeaderState={
    modalStatus: false,
    userData: null
}

export const headerReducer=(prevState: HeaderState,action: HeaderAction): HeaderState=>{
    switch(action.type){
        case "MODAL":
            return {...prevState, modalStatus: !prevState.modalStatus}
        case "USER_DATA":{
            return {...prevState, userData: action.data}
        }
        default:
            return {...prevState}
    }
}