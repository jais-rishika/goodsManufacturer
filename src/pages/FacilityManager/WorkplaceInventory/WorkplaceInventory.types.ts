
export interface WorkplaceInventoryProps { }

export interface ReqTable {
    id: string
    name: string;
    qty: number;
}

export type req={
    toolId: string,
    reqQuantity: number
}

export interface WorkplaceInventoryDetail {
    toolId: string;
    toolName: string;
    totalQuantity: number;
    availableQuantity: number;
    toolImageUrl: string;
    fineAmount: number;
    brokenQuantity: number;
    returnPeriod: number;
    toolCategory: "SPECIAL"|"NORMAL"
    isPerishable: boolean;
}

export type WorkplaceInventoryAction ={
    type: "UPDATE_TOOLS",
    data: WorkplaceInventoryDetail[]
} | {
    type: "SELECT_TOOL",
    data: WorkplaceInventoryDetail
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
}

export interface WorkplaceInventoryState {
    isLoading: boolean;
    error: string;

    ToolInventoryData: WorkplaceInventoryDetail[];
    selectedTool: WorkplaceInventoryDetail | null

    selectedFilters: string[],
    searchValue: string,
    count: number,
    urlFilter: string,
}


export interface WorkplaceInventoryMethods {
    setSelected: (data: WorkplaceInventoryDetail) => void,

    getData: (val: string) => void

    updateUrl:(url: string)=> void
    handleFilterChange: (val: string[]) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}