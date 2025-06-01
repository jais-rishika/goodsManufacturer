import type { ToolsDetail } from "../../Admin/Tools/Tools.types";

export interface ToolsInventoryProps { }

export interface ReqTable {
    id: string
    name: string;
    qty: number;
}

export type req = {
    toolId: string,
    reqQuantity: number
}

export interface ToolInventoryDetail {
    toolId: string;
    toolName: string;
    totalQuantity: number;
    availableQuantity: number;
    toolImageUrl: string;
    fineAmount: number;
    brokenQuantity: number;
    returnPeriod: number;
    toolCategory: "SPECIAL" | "NORMAL"
    isPerishable: boolean;
}

export type ToolsInventoryAction = {
    type: "UPDATE_TOOLS",
    data: ToolInventoryDetail[]
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
    isLoading: boolean;
    error: string;

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
    setSelected: (data: ToolInventoryDetail) => void,

    getData: (val: string) => void

    updateUrl: (url: string) => void
    handleFilterChange: (val: string[]) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinPrice: (value: number) => void
    updateMaxPrice: (value: number) => void
    setCount: (count: number) => void
}