export interface WorkStationProps {} 
import type { ReactNode } from "react"

export interface WorkStationTableData {
    name: string,
    workstationManagerName: string,
    workstationManagerEmail: string,
    action: () => ReactNode

}

export interface WorkStationData extends WorkStationTableData {
    id: string
}

export type WorkStationAction = {
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
    selected: WorkStationData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: WorkStationTableData[]
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

export interface WorkStationState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    deleteModal: boolean,
    editModal: boolean,
    selected: WorkStationData | null,
    workStationTableData: WorkStationTableData[],
    availFields: string[],
    selectedManager: string | null,


    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface WorkStationMethods {
    handleAddModal: () => void,
    handleEditModal: () => void,
    handleDeleteModal: () => void,
    handleSelect: (data: WorkStationData) => void
    setAvailFields: (val: string) => void
    updateManager: (val: string) => void

    getData: (val: string) => void,

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}