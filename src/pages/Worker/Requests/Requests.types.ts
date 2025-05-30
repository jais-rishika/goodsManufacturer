import type { ToolsShowDetail } from "../../Admin/Tools/Tools.types"

export interface RequestsProps { }

export interface RequestsTableData {
    workStation: string,
    workerEmail: string,
    reqStatus: "PENDING" | "APPROVED" | "REJECTED",
    showDetails: "show"
}

export interface RequestDetail extends RequestsTableData {
    id: string
    ReqDate: Date;
    toolDetails: ToolsShowDetail[]
}

export interface RequestsState {
    ReqDetailModal: boolean,
    RequestsData: RequestDetail[]
    selectedRequest: RequestDetail | null

    selectedFilters: string[],
    searchValue: string,
    minDate: string,
    maxDate: string,
    count: number,
    urlFilter: string,
}

export interface RequestMethods {
    handleReqDetailModal: () => void,

    getData: (val: string) => void

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinDate: (value: string) => void
    updateMaxDate: (value: string) => void
    setCount: (count: number) => void
}

export type RequestAction = {
    type: "UPDATE_REQUESTS",
    data: RequestDetail[]
} | {
    type: "SHOW_REQUEST_DETAILS"
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
    type: "SET_MINDATE",
    data: string
} | {
    type: "SET_MAXDATE",
    data: string
}
