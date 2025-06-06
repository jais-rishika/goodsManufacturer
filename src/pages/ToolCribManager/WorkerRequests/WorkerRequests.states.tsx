import { createContext, useReducer, type ComponentType } from "react";
import {
  acceptRejecNormalReq,
  getAllToolReq,
} from "../../../services/Requests.service";
import {
  initialWorkersRequestState,
  WorkersRequestReducer,
} from "./WorkerRequests.reducer";
import type {
  worker,
  WorkerRequestsDetail,
  WorkerRequestsState,
  WorkersRequestMethods,
} from "./WorkerRequests.types";
import Button from "../../../components/Button/Button";
import { toast } from "react-toastify";
import styles from "./WorkerRequests.module.scss";
import { getSingleWorkerDetails } from "../../../services/worker.service";

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
    const handleReturn = (data: WorkerRequestsDetail) => {
      console.log("here1");

      setSelected(data);
      handleReturnModal();
    };

    const handleReturnModal = () => {
      console.log("here2");

      dispatch({ type: "SHOW_RETURN_MODAL" });
    };

    const handleWorkerImage = async (id: string) => {
      try {
        const getWorker=await getSingleWorkerDetails(id);
        console.log(getWorker);
        
        selectWorker(getWorker.data);
        handleWorkerDetailModal();
      } catch (error) {
        toast.error("Could not get Worker Detail")
      }
    };

    const handleWorkerDetailModal = () => {
      dispatch({ type: "WORKER_DETAIL_MODAL" });
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
      console.log(val);

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
      newUrl.set("search", state.searchValue);

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

    const handleApproval = async (id: string, approve: boolean) => {
      try {
        const res = await acceptRejecNormalReq(id, approve);
        toast.success(`REQUEST ${approve ? "APPROVED" : "REJECTED"}`);
        getData(state.urlFilter);
      } catch (error: any) {
        toast.error(error?.message || "Request was not Handled");
      }
    };

    const getData = async (url: string) => {
      try {
        const res = await getAllToolReq(url);

        const data = res.content.map((row: WorkerRequestsDetail) => {
          return {
            ...row,
            workerName: <p className={styles.workerName} onClick={()=>handleWorkerImage(row.workerId)}>{row.workerName}</p>,
            returnDate: row.returnDate
              ? row.returnDate?.substring(0, 10)
              : "No Return Date",
            requestDate: row.requestDate?.substring(0, 10),
            approvalStatus:
              row.toolCategory === "SPECIAL" && row.approvalStatus === "PENDING" ? (
                "Waiting for Approval(Special Tool)"
              ) : row.approvalStatus === "PENDING" ? (
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
              
            returnStatus: row.isPerishable ? (
              "Return Not Required"
            ) : row.returnStatus === "PENDING" ? (
              <Button primary onClick={() => handleReturn(row)}>
                RETURN
              </Button>
            ) : (
              "RETURNED"
            ),
          };
        });

        dispatch({ type: "UPDATE_WORKERS_REQUESTS", data: data });
        setCount(res.page.totalElements);
      } catch (error) {
        toast.error("Sorry Could not fetch Workers Request")
      }
    };

    const setSelected = (data: WorkerRequestsDetail) => {
      dispatch({ type: "SELECT_REQUEST", data: data });
    };

    const selectWorker = (data: worker) => {
      dispatch({ type: "SELECT_WORKER", data: data });
    };

    const handlers: WorkersRequestMethods = {
      handleReturnModal,
      handleWorkerDetailModal,
      getData,
      setSelected,
      selectWorker,

      updateUrl,
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
