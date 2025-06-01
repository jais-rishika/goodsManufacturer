import { createContext, useReducer, type ComponentType } from "react";
import { acceptRejecNormalReq, getAllToolReq, getRequests, returnTool } from "../../../services/Requests.service";
import {
  initialWorkersRequestState,
  WorkersRequestReducer,
} from "./WorkerRequests.reducer";
import type {
  WorkerRequestsDetail,
  WorkerRequestsState,
  WorkersRequestMethods,
} from "./WorkerRequests.types";
import Button from "../../../components/Button/Button";
import { toast } from "react-toastify";

export const WorkersRequestsContext = createContext<
  (WorkerRequestsState & WorkersRequestMethods) | null
>(null);

export const withWorkersRequestsContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      WorkersRequestReducer,
      initialWorkersRequestState
    );

    //handlers
    const handleReqDetailModal = () => {
      dispatch({ type: "SHOW_REQUEST_DETAILS" });
    };

    //filter
    const handleFilterChange = (filter: string[], url: string) => {
      dispatch({ type: "SET_FILTERS", data: filter });

      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

      //   do this //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let category;

      newUrl.set("minDate", `${state.minDate}`);
      newUrl.set("maxDate", `${state.maxDate}`);

      updateUrl(newUrl.toString() + category);
    };

    const handleUrlChange = (size: number, page: number) => {
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("size", `${size}`);
      currentUrl.set("page", `${page}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateSearch = (val: string) => {
      dispatch({ type: "SET_SEARCH", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", val);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateMinDate = (val: string) => {
      dispatch({ type: "SET_MINDATE", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", `${val}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };
    const updateMaxDate = (val: string) => {
      dispatch({ type: "SET_MAXDATE", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", `${val}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateUrl = (newUrl: string) => {
      dispatch({ type: "SET_URL_FILTER", data: newUrl });
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const handleApproval=async (id: string,approve: boolean)=>{
        try {
            const res=await acceptRejecNormalReq(id,approve);
            toast.success(`REQUEST ${approve?"APPROVED": "REJECTED"}`)
            getData(state.urlFilter)
        } catch (error) {
            toast.error("Request was not Handled")
        }
    }

    const handleReturn=async(id: string)=>{
        try {
            const payload={}
            const res=await returnTool(payload);
            toast.success('Tools Returned')
        } catch (error) {
            toast.error("Tools Return Failed")
        }
    }

    const getData = async (url: string) => {
      try {
        const res = await getAllToolReq(url);

        const data = res.content.map((row: WorkerRequestsDetail) => {
          return {
            ...row,
            returnDate: row.returnDate
              ? row.returnDate?.substring(0, 10)
              : "No Return Date",
            requestDate: row.requestDate?.substring(0, 10),
            approvalStatus:
            row.toolCategory==="SPECIAL"?"Waiting for Approval(Special Tool)":
              row.approvalStatus === "PENDING" ? (
                <>
                  <Button primary onClick={()=>handleApproval(row.requestItemId,true)}>APPROVE</Button>
                  <Button primary onClick={()=>handleApproval(row.requestItemId,false)}>REJECT</Button>
                </>
              ) : (
                row.approvalStatus
              ),
            returnStatus: row.returnStatus==="PENDING"?<Button primary onClick={()=>handleReturn(row.requestItemId)}>RETURN</Button>:"RETURNED"
          };
        });

        dispatch({ type: "UPDATE_WORKERS_REQUESTS", data: data });
        setCount(res.page.totalElements);
      } catch (error) {}
    };

    const setSelected = (data: WorkerRequestsDetail) => {
      dispatch({ type: "SELECT_REQUEST", data: data });
    };

    const handlers: WorkersRequestMethods = {
      handleReqDetailModal,
      getData,
      setSelected,

      handleFilterChange,
      handleUrlChange,
      updateSearch,
      updateMinDate,
      updateMaxDate,
      setCount,
    };
    return (
      <WorkersRequestsContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkersRequestsContext.Provider>
    );
  };
};
