import { createContext, useReducer, type ComponentType } from "react";

import type {
  ToolCribManagerState,
  ToolCribManagerMethods,
  ToolCribManagerTableData,
  ToolCribManagerData,
} from "./ToolCribManager.types";

import {
  ToolCribManagerReducer,
  ToolCribManagerInitialState,
} from "./ToolCribManager.reducer";

import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { getToolCribManagers } from "../../../services/toolCribManager.service";

//create Context
export const ToolCribManagerContext = createContext<
  (ToolCribManagerState & ToolCribManagerMethods) | null
>(null);

//HOC
export const withToolCribManagerContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      ToolCribManagerReducer,
      ToolCribManagerInitialState
    );

    //handlers
    const handleAddModal = () => {
      dispatch({ type: "ADD_MODAL", status: !state.addModal });
    };

    const showEditModal=()=> dispatch({ type: "EDIT_MODAL", status: true });
    const hideEditModal=()=> dispatch({ type: "EDIT_MODAL", status: false });

    const showDeleteModal=()=> dispatch({ type: "DELETE_MODAL", status: true });
    const hideDeleteModal=()=> dispatch({ type: "DELETE_MODAL", status: false });

    // const handleEditModal = () => {
    //   dispatch({ type: "EDIT_MODAL", status: !state.editModal });
    // };

    // const handleDeleteModal = () => {
    //   dispatch({ type: "DELETE_MODAL", status: !state.deleteModal });
    // };

    const handleSelect = (data: ToolCribManagerData) => {
      dispatch({ type: "SELECT", selected: data });
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
      if (state.searchValue) newUrl.set("search", state.searchValue || "");
      const fields = filter.reduce((a, b) => {
        return `${a}&fields=${b}`;
      }, "");
      updateUrl(newUrl.toString() + fields);
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

    const updateUrl = (newUrl: string) => {
      dispatch({ type: "SET_URL_FILTER", data: newUrl });
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    //actionButtonTemplate
    const actionButtons = (data: ToolCribManagerData) => {
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
        const ToolCribManager = await getToolCribManagers(url);
        setCount(ToolCribManager.page.totalElements)

        const tableData: ToolCribManagerTableData[] =
        ToolCribManager.content.map((data: ToolCribManagerData) => {
          return {
            name: data.name,
            email: data.email,
            createdAt: data.createdAt.substring(0, 10),
            action: actionButtons(data),
            reqHistory: <NavLink to="/"></NavLink>
          };
        });

        dispatch({ type: "UPDATE_DATA", data: tableData });
        dispatch({type: "GET_DATA_SUCCESS" , data: ToolCribManager.content })

      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the ToolCribManager",
        });
        toast.error("Could not Fetch the ToolCribManager")
      }
    };

    const handlers = {
      handleAddModal,
      hideEditModal,
      hideDeleteModal,
      handleSelect,
      getData,

      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount
    };

    return (
      <ToolCribManagerContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </ToolCribManagerContext.Provider>
    );
  };
};
