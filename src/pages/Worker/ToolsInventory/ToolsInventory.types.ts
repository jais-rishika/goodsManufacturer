import type { ReactNode } from "react";
import type { ToolsDetail } from "../../Admin/Tools/Tools.types";

export interface ToolsInventoryProps { }

export interface ReqTable {
    id: string
    idx: number;
    name: string;
    qty: number;
    action: ReactNode;
}

export interface ToolInventoryDetail extends ToolsDetail {
    totalQuantity: number;
    alloted: number;
    pending: number;
    broken: number;
}

export type ToolsInventoryAction ={
    type: "REQ_TABLE_DATA"
    data: ReqTable[]
} | {
    type: "UPDATE_TOOLS",
    data: ToolInventoryDetail[]
} | {
    type: "REQ_TOOL_MODAL"
} | {
    type: "SELECT_TOOL",
    data: ToolInventoryDetail
} | {
    type: "SET_FILTERS",
    data: string[]
} | {
    type: "SET_COUNT",
    count: number
} | {
    type: "SET_URL_FILTER",
    data: string
} | {
    type: "SET_SEARCH",
    data: string
} | {
    type: "SET_MINPRICE",
    data: number
} | {
    type: "SET_MAXPRICE",
    data: number
}

export interface ToolsInventoryState {
    // isLoading: boolean;
    // error: string;
    reqTableData: ReqTable[]
    reqToolModal: boolean

    ToolInventoryData: ToolInventoryDetail[];
    selectedTool: ToolInventoryDetail | null

    selectedFilters: string[],
    searchValue: string,
    minPrice: number,
    maxPrice: number,
    count: number,
    urlFilter: string,
}


export interface ToolsInventoryMethods {
    handleReqToolModal: () => void,
    setSelected: (data: ToolInventoryDetail) => void,
    updateReqTable: (data: ReqTable[]) => void

    getData: (val: string) => void

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinPrice: (value: number) => void
    updateMaxPrice: (value: number) => void
    setCount: (count: number) => void
}