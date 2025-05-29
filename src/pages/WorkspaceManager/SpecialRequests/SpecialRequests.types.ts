import type { ToolsShowDetail } from "../../Admin/Tools/Tools.types"

export interface SpecialRequestsProps { }

export interface SpRequestsTableData {
    workStation: string,
    workerEmail: string,
    reqStatus: "PENDING"|"APPROVED"|"REJECTED",
    showDetails: "show"
}

export interface RequestDetail extends SpRequestsTableData {
    id: string
    ReqDate: Date;
    toolDetails: ToolsShowDetail[]
}

export interface RequestsState {
    isLoading: boolean,
    error: string
    ReqDetailModal: boolean,
    RequestsData: RequestDetail[]
    selectedRequest: RequestDetail | null

    selectedFilters: string[],
    searchValue: string,
    minDate: Date,
    maxDate: Date,
    count: number,
    urlFilter: string,
}

export interface RequestMethods {
    handleReqDetailModal: () => void,

    setSelected: (data: RequestDetail) => void,

    getData: (val: string) => void

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinDate: (value: Date) => void
    updateMaxDate: (value: Date) => void
    setCount: (count: number) => void
}

export type RequestAction = {
    type: "UPDATE_REQUESTS",
    data: RequestDetail[]
} | {
    type: "SHOW_REQUEST_DETAILS"
} | {
    type: "SELECT_REQUEST"
    data: RequestDetail
} | {
    type: "GET_REQUESTS"
} | {
    type: "GET_REQUESTS_SUCCESS"
} | {
    type: "GET_REQUESTS_FAILURE"
    data: string
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
    data: Date
} | {
    type: "SET_MAXDATE",
    data: Date
}
