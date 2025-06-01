import { createContext, useReducer, type ComponentType } from "react";

import type {
  ToolCribManagerState,
  ToolCribManagerMethods,
  ToolCribManagerTableData,
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

    const handleSelect = (data: ToolCribManagerTableData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    //filter
    const handleFilterChange = (filter: string[]) => {
      dispatch({ type: "SET_FILTERS", data: filter });
    };

    const handleUrlChange = (size: number, page: number) => {
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("size", `${size}`);
      currentUrl.set("page", `${page}`);
      handlefilter(currentUrl.toString())
      // handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateSearch = (val: string) => {
      dispatch({ type: "SET_SEARCH", data: val });
    };

    const handlefilter = (url: string) => {
      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

      //filter
      if (state.searchValue) newUrl.set("search", state.searchValue || "");
      const fields = state.selectedFilters.reduce((a, b) => {
        return `${a}&fields=${b}`;
      }, "");
      
      const finalUrl=newUrl.toString()+fields;

      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    //actionButtonTemplate
    const actionButtons = (data: ToolCribManagerTableData) => {
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
        const toolCribManagers = await getToolCribManagers(url);
        
        setCount(toolCribManagers.page.totalElements)

        const tableData: ToolCribManagerTableData[] = toolCribManagers.content.map(
          (data: ToolCribManagerTableData) => {
            return {
              id: data.id,
              name: data.name,
              email: data.email,
              createdAt: "12-12-2024",
              action: actionButtons(data),
              reqHistory: <NavLink to="/"></NavLink>,
            };
          }
        );
        console.log(toolCribManagers);

        // dispatch({ type: "UPDATE_DATA", data: tableData });
        dispatch({type: "GET_DATA_SUCCESS" , data: tableData })
        toast.success("ToolCribManager Fetched SuccessFully")
      } catch (error) {
        toast.error("Could not Fetch the ToolCribManager")
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the ToolCribManager",
        });
      }
    };

    const handlers = {
      handleAddModal,
      hideEditModal,
      hideDeleteModal,
      handleSelect,
      getData,
      handlefilter,

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
