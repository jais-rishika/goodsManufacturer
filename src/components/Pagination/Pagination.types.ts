import type { Dispatch ,SetStateAction } from "react";

export interface PaginationProps{
    count: number ;
    setUrl: Dispatch<SetStateAction<string>>;
    url: string;
    getData: ()=>void
    scrollRef?: null | HTMLDivElement
}

export type PaginationAction={
    type: "PREV",
    status: boolean
}|{
    type: "NEXT"
    status: boolean
}|{
    type: "CurrPage"
    page: number
}|{
    type: "LIMIT",
    limit: number
}

export interface PaginationState{
    prevStatus: boolean;
    nextStatus: boolean;
    currPage: number;
    limit: number
}