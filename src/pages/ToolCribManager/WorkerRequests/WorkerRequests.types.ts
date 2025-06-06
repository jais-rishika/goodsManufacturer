export interface WorkerRequestsProps { }

export interface worker {
    workerEmail: string
    workerImageUrl : string
    workerName : string
}

export interface WorkerRequestsTableData {
    requestDate: string,
    workerName: string,
    toolName: string,
    reqQuantity: number,
    returnDate: string,
    approvalStatus: "PENDING" | "APPROVED" | "REJECTED",
    returnStatus: "PENDING" | "RETURNED"

}

export interface WorkerRequestsDetail extends WorkerRequestsTableData {
    workerId: string
    toolId: string
    requestItemId: string,
    fine: number,
    isPerishable: string,
    toolCategory: "NORMAL" | "SPECIAL"
}

export interface WorkerRequestsState {
    returnModal: boolean,
    workerDetailModal: boolean,
    WorkerRequestsData: WorkerRequestsDetail[]
    selectedRequest: WorkerRequestsDetail | null
    selectedWorker: worker | null

    selectedFilters: string[],
    searchValue: string,
    minDate: string,
    maxDate: string,
    count: number,
    urlFilter: string,
}

export interface WorkersRequestMethods {
    handleReturnModal: () => void,
    handleWorkerDetailModal: () => void,
    selectWorker: (data: worker) => void
    setSelected: (data: WorkerRequestsDetail) => void
    getData: (val: string) => void

    updateUrl: (url: string) => void,
    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinDate: (value: string) => void
    updateMaxDate: (value: string) => void
    setCount: (count: number) => void
}

export type WorkersRequestAction = {
    type: "UPDATE_WORKERS_REQUESTS",
    data: WorkerRequestsDetail[]
} | {
    type: "SHOW_RETURN_MODAL"
} | {
    type: "WORKER_DETAIL_MODAL"
} | {
    type: "SELECT_REQUEST"
    data: WorkerRequestsDetail
}| {
    type: "SELECT_WORKER"
    data: worker
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
    type: "SET_MINDATE",
    data: string
} | {
    type: "SET_MAXDATE",
    data: string
}
