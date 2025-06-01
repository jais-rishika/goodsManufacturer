export interface ToolCribManagerProps { }
export interface ToolCribManagerProps { }
import type { ReactNode } from "react";

export interface ToolCribManagerTableData {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    RequestHistory: string
    action: () => ReactNode
}

// export interface ToolCribManagerData extends ToolCribManagerTableData {
// }

export type ToolCribManagerAction = {
    type: "UPDATE_DATA",
    data: ToolCribManagerTableData[]
} | {
    type: 'ADD_MODAL'
    status: boolean
} | {
    type: 'EDIT_MODAL'
    status: boolean
} | {
    type: 'DELETE_MODAL'
    status: boolean
} | {
    type: 'REQ_HISTORY'
    status: boolean
} | {
    type: 'SELECT'
    selected: ToolCribManagerTableData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: ToolCribManagerTableData[]
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

export interface ToolCribManagerState {
    isLoading: boolean,
    error: string,

    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,
    reqHistoryModal: boolean,

    selected: ToolCribManagerTableData | null,
    ToolCribManagerData: ToolCribManagerTableData[],
    ToolCribManagerTableData: ToolCribManagerTableData[],

    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface ToolCribManagerMethods {
    handleAddModal: () => void
    hideEditModal: () => void
    hideDeleteModal: () => void
    handleSelect: (data: ToolCribManagerTableData) => void
    handlefilter: (url: string)=> void
    getData: (val: string) => void

    handleFilterChange: (val: string[]) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}