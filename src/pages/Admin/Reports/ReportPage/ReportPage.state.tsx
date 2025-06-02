import { createContext, useReducer, type ComponentType } from "react";
import type { ReportMethods, ReportStates } from "./ReportPage.types";
import { ReportInitialState, ReportReducer } from "./ReportPage.reducer";
import { mostBrokenTools, topDemandedTools, topPricedTools } from "../../../../services/owner.service";
import { toast } from "react-toastify";

export const ReportContext = createContext<
  (ReportStates & ReportMethods) | null
>(null);

export const withReportContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state,dispatch]= useReducer(ReportReducer, ReportInitialState)

    const getTopBroken=async()=>{
        try {
            const data=await topDemandedTools()
            console.log(data);
            
            dispatch({type: "TOP_BROKEN", data: data.data})
        } catch (error) {
            toast.error("Sorry Could not Fetch the Report")
        }
    }
    const getTopDemand=async()=>{
        try {
            const data=await mostBrokenTools()
            dispatch({type: "TOP_DEMAND", data: data.data})
            console.log(data);
        } catch (error) {
            toast.error("Sorry Could not Fetch the Reports")
        }
    }
    const getTopPriced=async()=>{
        try {
            const data=await topPricedTools()
            dispatch({type: "TOP_PRICED", data: data.data})
            console.log(data);
        } catch (error) {
            toast.error("Sorry Could not Fetch the Reports")
        }
    }

    const handlers={
        getTopBroken,
        getTopDemand,
        getTopPriced
    }
    return (
      <ReportContext.Provider value={{...state,...handlers}}>
        <Component {...props} />
      </ReportContext.Provider>
    );
  };
};
