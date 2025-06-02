import type { ReportActions, ReportStates } from "./ReportPage.types";

export const ReportInitialState: ReportStates={
    topDemand:[],
    topBroken:[],
    topPriced:[]
}

export const ReportReducer = (prevState: ReportStates, action: ReportActions): ReportStates => {
    switch (action.type) {
        case "TOP_DEMAND":
            return { ...prevState, topDemand: action.data }
        case "TOP_BROKEN":
            return { ...prevState, topBroken: action.data }
        case "TOP_PRICED":
            return { ...prevState, topPriced: action.data }
        default:
            return prevState
    }
}