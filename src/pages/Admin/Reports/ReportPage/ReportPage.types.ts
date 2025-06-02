export interface ReportStates{
    topDemand: any,
    topBroken: any,
    topPriced: any,
}

export type ReportActions={
    type:"TOP_DEMAND",
    data: any
} | {
    type:"TOP_BROKEN",
    data: any
} | {
    type:"TOP_PRICED",
    data: any
} 

export interface ReportMethods{
    getTopDemand: ()=> void
    getTopBroken: ()=> void
    getTopPriced: ()=> void
}