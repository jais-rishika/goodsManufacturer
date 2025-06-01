export interface ToolCribsProps { }
import type { ReactNode } from "react"

export interface ToolCribsProps { }

export interface ToolCribsTableData {
    name: string,
    ToolCribManager: string,
    ToolCribsManagerEmail: string,
    workplaceName: string,
    action: () => ReactNode

}

export interface ToolCribsData extends ToolCribsTableData {
    id: string
    workplaceId: 4,
    managerEmails: string[]
}

export type ToolCribsAction = {
    type: "ADD_MODAL",
    status: boolean
} | {
    type: "EDIT_MODAL",
    status: boolean
} | {
    type: "DELETE_MODAL",
    status: boolean
} | {
    type: 'SELECT'
    selected: ToolCribsData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: ToolCribsTableData[]
} | {
    type: "SET_AVAIL_FIELDS",
    data: string[]
} | {
    type: "SET_MANAGER",
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
}

export interface ToolCribsState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    deleteModal: boolean,
    editModal: boolean,
    selected: ToolCribsData | null,
    ToolCribsTableData: ToolCribsTableData[],
    availFields: string[],
    selectedManager: string | null,


    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface ToolCribsMethods {
    handleAddModal: () => void,
    handleEditModal: () => void,
    handleDeleteModal: () => void,
    handleSelect: (data: ToolCribsData) => void
    setAvailFields: (val: string) => void
    updateManager: (val: string) => void

    getData: (val: string) => void,

    updateUrl: (url: string) => void
    handleFilterChange: (val: string[]) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}