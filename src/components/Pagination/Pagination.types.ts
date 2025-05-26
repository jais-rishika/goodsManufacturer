export interface PaginationProps {
    count: number;
    setUrl: (size: number, page: number) => void;
    url: string;
    getData: (val: string) => void
    scrollRef?: null | HTMLDivElement
}

export type PaginationAction = {
    type: "CurrPage"
    page: number
} | {
    type: "SIZE",
    size: number
}

export interface PaginationState {
    currPage: number;
    size: number
}