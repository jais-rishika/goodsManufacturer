import type { ReactNode } from "react"

export interface WorkPlaceProps { }

export interface WorkPlaceTableData {
    name: string,
    workplaceManagerName: string,
    workplaceManagerEmail: string,
    action: () => ReactNode

}

export interface WorkPlaceData extends WorkPlaceTableData {
    id: string
}

export type WorkplaceAction = {
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
    selected: WorkPlaceData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: WorkPlaceTableData[]
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

export interface WorkPlaceState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    deleteModal: boolean,
    editModal: boolean,
    selected: WorkPlaceData | null,
    workplaceTableData: WorkPlaceTableData[],
    availFields: string[],
    selectedManager: string | null,


    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface WorkPlaceMethods {
    handleAddModal: () => void,
    handleEditModal: () => void,
    handleDeleteModal: () => void,
    handleSelect: (data: WorkPlaceData) => void
    setAvailFields: (val: string) => void
    updateManager: (val: string) => void

    getData: (val: string) => void,

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}