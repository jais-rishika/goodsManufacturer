export interface ToolsProps { }

export interface ToolsShowDetail {
    toolImageUrl: string
    name: string,
    price: number,
    fineAmount: number,
    category: "NORMAL" | "SPECIAL",
    isPerishable: string,
    returnPeriod: number
}

export interface ToolsDetail extends ToolsShowDetail {
    id: string
}


export interface ToolsState {
    isLoading: boolean,
    error: string
    toolsData: ToolsDetail[]
    addModal: boolean,
    deleteModal: boolean,
    editModal: boolean,
    selectedTool: ToolsDetail | null

    selectedFilters: string[],
    searchValue: string,
    minPrice: number,
    maxPrice: number,
    count: number,
    urlFilter: string,
}

export interface ToolMethods {
    handleAddModal: () => void,
    handleDeleteModal: () => void,
    handleEditModal: () => void,
    setSelected: (data: ToolsDetail) => void,

    getData: (val: string) => void

    updateUrl: (url: string) => void,
    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinPrice: (value: number) => void
    updateMaxPrice: (value: number) => void
    setCount: (count: number) => void
}

export type ToolAction = {
    type: "UPDATE TOOLS",
    data: ToolsDetail[]
} | {
    type: "DELETE_MODAL"
} | {
    type: "EDIT_MODAL"
} | {
    type: "ADD_MODAL"
} | {
    type: "SELECT_TOOL"
    data: ToolsDetail
} | {
    type: "GET_TOOL"
    data: ToolsDetail
} | {
    type: "GET_TOOL_SUCCESS"
    data: ToolsDetail
} | {
    type: "GET_TOOL_FAILURE"
} |

{
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
