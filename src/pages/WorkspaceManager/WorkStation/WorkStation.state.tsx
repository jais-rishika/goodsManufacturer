import { createContext, useReducer, type ComponentType } from "react";
import type {
  WorkStationData,
  WorkStationMethods,
  WorkStationState,
  WorkStationTableData,
} from "./WorkStation.types";
import {
  workStationInitialState,
  workStationReducer,
} from "./WorkStation.reducer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { getWorkPlaceWorkers } from "../../../services/worker.service";
import {
  fetchWorkplaceWorkStations,
  getWorkStation,
} from "../../../services/workstation.service";

export const WorkStationContext = createContext<
  (WorkStationState & WorkStationMethods) | null | any
>(null);

export const withWorkStation = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      workStationReducer,
      workStationInitialState
    );

    //handlers
    const handleAddModal = () => {
      dispatch({ type: "ADD_MODAL", status: !state.addModal });
    };

    const showEditModal = () => {
      dispatch({ type: "EDIT_MODAL", status: true });
    };

    const hideEditModal = () => {
      dispatch({ type: "EDIT_MODAL", status: false });
    };

    const showDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL", status: true });
    };

    const hideDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL", status: false });
    };

    const handleSelect = (data: WorkStationData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    const setAvailFields = async (val: string) => {
      const facilityManagers = await getWorkPlaceWorkers(val);
      console.log(facilityManagers);

      dispatch({ type: "SET_AVAIL_FIELDS", data: facilityManagers.data });
    };

    const updateManager = async (val: string) => {
      dispatch({ type: "SET_MANAGER", data: val });
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

    const updateUrl = (url: string) => {
      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

      newUrl.set("search", state.searchValue || "");

      const fields = state.selectedFilters.reduce((a, b) => {
        return `${a}&fields=${b}`;
      }, "");
      const finalUrl = newUrl.toString() + fields;

      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl);
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const actionButtons = (data: WorkStationData) => {
      return (
        <>
          <Button
            primary
            onClick={() => {
              handleSelect(data);
              showEditModal();
            }}
          >
            <FaEdit />
          </Button>

          <Button
            danger
            onClick={() => {
              handleSelect(data);
              showDeleteModal();
            }}
          >
            <FaTrash />
          </Button>
        </>
      );
    };

    const getData = async (url: string) => {
      try {
        dispatch({ type: "GET_DATA" });
        const workStation = await fetchWorkplaceWorkStations(url);

        setCount(workStation.page.totalElements);

        const tableData: WorkStationTableData[] = workStation.content.map(
          (data: WorkStationData) => {
            return {
              name: data.name,
              workerName: data.workerName,
              workerEmail: data.workerEmail,
              action: actionButtons(data),
            };
          }
        );

        // console.log(tableData);
        dispatch({ type: "GET_DATA_SUCCESS", data: tableData });
      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the Facilities",
        });
      }
    };

    const handlers = {
      handleAddModal,
      hideEditModal,
      hideDeleteModal,
      handleSelect,
      getData,

      setAvailFields,
      updateManager,

      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount,
    };

    return (
      <WorkStationContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkStationContext.Provider>
    );
  };
};
