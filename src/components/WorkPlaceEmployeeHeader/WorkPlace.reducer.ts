import type { HeaderAction, HeaderState } from "./WorkPlaceEmployeeHeader.types";

export const headerInitialState: HeaderState={
    modalStatus: false
}

export const headerReducer=(prevState: HeaderState,action: HeaderAction): HeaderState=>{
    switch(action.type){
        case "MODAL":
            return {...prevState, modalStatus: !prevState.modalStatus}
        default:
            return {...prevState}
    }
}