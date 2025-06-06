import { createContext, useReducer, type ComponentType } from "react";
import type {
  RequestDetail,
  RequestMethods,
  RequestsState,
} from "./SpecialRequests.types";
import {
  initialRequestState,
  requestsReducer,
} from "./SpecialRequests.reducer";
import {
  acceptRejectSpReq,
  getSpecialRequests,
} from "../../../services/Requests.service";
import Button from "../../../components/Button/Button";
import type { WorkerRequestsDetail } from "../../ToolCribManager/WorkerRequests/WorkerRequests.types";
import { toast } from "react-toastify";

export const SpecialRequestsContext = createContext<
  (RequestsState & RequestMethods) | null
>(null);

export const withSpecialReqContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(requestsReducer, initialRequestState);

    //handlers
    const handleReqDetailModal = () => {
      dispatch({ type: "SHOW_REQUEST_DETAILS" });
    };

    const handleApproval = async (id: string, approve: boolean) => {
      try {
        const res = await acceptRejectSpReq(id, approve);
        if(!(res.status>=200 && res.status<300)){throw Error("ADD unsuccessfull")}
        toast.success(`REQUEST ${approve ? "APPROVED" : "REJECTED"}`);
        getData(state.urlFilter);
      } catch (error: any) {
        toast.error(error?.message || "Request was not Handled");
      }
    };

    //filter
    const handleFilterChange = (filter: string[]) => {
      dispatch({ type: "SET_FILTERS", data: filter });
    };

    const handleUrlChange = (size: number, page: number) => {
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("size", `${size}`);
      currentUrl.set("page", `${page}`);
      updateUrl(currentUrl.toString());
    };

    const updateSearch = (val: string) => {
      dispatch({ type: "SET_SEARCH", data: val });
    };

    const updateMinDate = (val: string) => {
      dispatch({ type: "SET_MINDATE", data: val });
    };
    const updateMaxDate = (val: string) => {
      dispatch({ type: "SET_MAXDATE", data: val });
    };

    const updateUrl = (url: string) => {
      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

      let category = state.selectedFilters.reduce((a, b) => {
        return `${a}&fields=${b}`;
      }, "");

      newUrl.set("startDateTime", new Date(state.minDate).toISOString());
      newUrl.set("endDateTime", new Date(state.maxDate).toISOString());

      const finalUrl = newUrl.toString() + category;
      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl);
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const getData = async (url: string) => {
      try {
        const res = await getSpecialRequests(url);

        const data = res.content.map((row: WorkerRequestsDetail) => {
          return {
            ...row,
            requestDate: row.requestDate?.substring(0, 10),
            approvalStatus:
              row.approvalStatus === "PENDING" ? (
                <>
                  <Button
                    primary
                    onClick={() => handleApproval(row.requestItemId, true)}
                  >
                    APPROVE
                  </Button>
                  <Button
                    primary
                    onClick={() => handleApproval(row.requestItemId, false)}
                  >
                    REJECT
                  </Button>
                </>
              ) : (
                row.approvalStatus
              ),
          };
        });

        dispatch({ type: "UPDATE_REQUESTS", data: data });
        setCount(res.page.totalElements);
      } catch (error) {}
    };

    const setSelected = (data: RequestDetail) => {
      dispatch({ type: "SELECT_REQUEST", data: data });
    };

    const handlers: RequestMethods = {
      handleReqDetailModal,
      getData,
      setSelected,

      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      updateMinDate,
      updateMaxDate,
      setCount,
    };
    return (
      <SpecialRequestsContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </SpecialRequestsContext.Provider>
    );
  };
};
