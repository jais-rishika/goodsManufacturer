import type { ToolsDetail } from "../../Admin/Tools/Tools.types";

export interface ToolsInventoryProps { }

export interface ToolInventoryDetail extends ToolsDetail {
    totalQuantity: number;
    alloted: number;
    pending: number;
    broken: number;
}

export type ToolsInventoryAction = {
    type: "UPDATE_TOOLS",
    data: ToolInventoryDetail[]
} | {
    type: "SEND_MODAL"
} | {
    type: "SELECT_TOOL",
    data: ToolInventoryDetail

} | {
    type: "SET_AVAIL_FIELDS",
    data: string[]
} | {
    type: "SET_WORKPLACE",
    data: string

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
    sendToolModal: boolean

    ToolInventoryData: ToolInventoryDetail[];
    selectedTool: ToolInventoryDetail | null
    availFields: string[],
    selectedWorkplace: string | null,

    selectedFilters: string[],
    searchValue: string,
    minPrice: number,
    maxPrice: number,
    count: number,
    urlFilter: string,
}


export interface ToolsInventoryMethods {
    showSendToolModal: () => void,
    setSelected: (data: ToolInventoryDetail) => void,
    setAvailFields: (val: string) => void
    updateWorkplace: (val: string) => void

    getData: (val: string) => void

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinPrice: (value: number) => void
    updateMaxPrice: (value: number) => void
    setCount: (count: number) => void
}