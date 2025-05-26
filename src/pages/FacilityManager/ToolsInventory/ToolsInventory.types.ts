import type { ToolsDetail } from "../../Admin/Tools/Tools.types";

export interface ToolsInventoryProps {} 

export interface ToolInventoryDeatil extends ToolsDetail{
    totalQuantity: number;
    alloted: number;
    pending: number;
    broken: number;
}

export interface ToolsInventoryAction{

}

export interface ToolsInventoryState{
    isLoading: boolean;
    error: string;
    sendToolModal: boolean

    ToolInventoryData: ToolInventoryDeatil[];
}


export interface ToolsInventoryMethods{

}