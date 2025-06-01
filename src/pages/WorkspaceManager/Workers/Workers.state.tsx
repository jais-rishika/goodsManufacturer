import { createContext, useReducer, type ComponentType } from "react";

import type {
  WorkersState,
  WorkersMethods,
  WorkersTableData,
  WorkersData,
} from "./Workers.types";

import {
  WorkersReducer,
  WorkersInitialState,
} from "./Workers.reducer";

import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { getWorkers } from "../../../services/worker.service";
import { NavLink } from "react-router";
import { toast } from "react-toastify";

//create Context
export const WorkersContext = createContext<
  (WorkersState & WorkersMethods) | null
>(null);

//HOC
export const withWorkersContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      WorkersReducer,
      WorkersInitialState
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
      dispatch({ type: "DELETE_MODAL", status:true });
    };
    const hideDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL", status: false });
    };

    const handleSelect = (data: WorkersData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    //filter
    const handleFilterChange = (url?: string) => {

      //pagination
      const currentUrl = new URLSearchParams(url?url:state.urlFilter);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);
      if (state.searchValue) newUrl.set("search", state.searchValue || "");
      const fields = state.selectedFilters.reduce((a, b) => {
        return `${a}&fields=${b}`;
      }, "");
      updateUrl(newUrl.toString() + fields);
    };

    const setFilter=(filter: string[])=>{
      dispatch({ type: "SET_FILTERS", data: filter });
    }

    const handleUrlChange = (size: number, page: number) => {
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("size", `${size}`);
      currentUrl.set("page", `${page}`);
      handleFilterChange(currentUrl.toString());
    };

    const updateSearch = (val: string) => {
      dispatch({ type: "SET_SEARCH", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", val);
      // handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateUrl = (newUrl: string) => {
      dispatch({ type: "SET_URL_FILTER", data: newUrl });
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    //actionButtonTemplate
    const actionButtons = (data: WorkersData) => {
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
        const workers = await getWorkers(url);
        setCount(workers.page.totalElements)

        const tableData: WorkersTableData[] =
        workers.content.map((data: WorkersData) => {
          return {
            name: data.name,
            email: data.email,
            workplaceName: data.workplaceName,
            workstation: data.workstationCode,
            action: actionButtons(data),
            reqHistory: <NavLink to="/"></NavLink>
          };
        });
        console.log(workers);

        dispatch({type: "GET_DATA_SUCCESS" , data: tableData })

      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the Workers",
        });
        toast.error("Could not Fetch the Workers")
      }
    };

    const handlers = {
      handleAddModal,
      hideEditModal,
      hideDeleteModal,
      handleSelect,
      getData,

      setFilter,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount
    };

    return (
      <WorkersContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkersContext.Provider>
    );
  };
};
