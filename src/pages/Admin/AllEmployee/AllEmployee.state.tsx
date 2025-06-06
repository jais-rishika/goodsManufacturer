import { createContext, useReducer, type ComponentType } from "react";

import type {
  AllEmployeeState,
  AllEmployeeMethods,
  AllEmployeeTableData,
  AllEmployeeData,
} from "./AllEmployee.types";

import {
  AllEmployeeReducer,
  AllEmployeeInitialState,
} from "./AllEmpolyee.reducer";
import { getAllEmployee } from "../../../services/owner.service";

//create Context
export const AllEmployeeContext = createContext<
  (AllEmployeeState & AllEmployeeMethods) | null
>(null);

//HOC
export const withAllEmployeeContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      AllEmployeeReducer,
      AllEmployeeInitialState
    );

    //handlers
    // const handleAddModal = () => {
    //   dispatch({ type: "ADD_MODAL", status: !state.addModal });
    // };

    // const showEditModal = () => dispatch({ type: "EDIT_MODAL", status: true });
    // const hideEditModal = () => dispatch({ type: "EDIT_MODAL", status: false });

    // const showDeleteModal = () =>
    //   dispatch({ type: "DELETE_MODAL", status: true });
    // const hideDeleteModal = () =>
    //   dispatch({ type: "DELETE_MODAL", status: false });

    const handleSelect = (data: AllEmployeeData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    //filter handlers
    const handleFilterChange = (filter: string[]) => {
      const isEmailPresent=filter.includes("email");
      const newFilter=filter.filter(val=> val!=="email")
      
      if (newFilter.length>1) {
       newFilter.splice(0,1);
      }
      if(isEmailPresent) newFilter.push("email")
      dispatch({ type: "SET_FILTERS", data: newFilter });
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

      if (state.selectedFilters.includes("email")) {
        newUrl.set("email", state.searchValue);
      }
      const roles=state.selectedFilters.filter(val=> val!=="email")
      
      if(roles.length>0){
        const value=`ROLE_${roles[0].toUpperCase()}`
        newUrl.set("role",value)
      }

      const finalUrl = newUrl.toString();
      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl);
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    //actionButtonTemplate
    // const actionButtons = (data: AllEmployeeData) => {
    //   return (
    //     <>
    //       <Button
    //         primary
    //         onClick={() => {
    //           handleSelect(data);
    //           showEditModal()
    //         }}
    //       >
    //         <FaEdit />
    //       </Button>

    //       <Button
    //         danger
    //         onClick={() => {
    //           handleSelect(data);
    //           showDeleteModal();
    //         }}
    //       >
    //         <FaTrash />
    //       </Button>
    //     </>
    //   );
    // };

    const getData = async (url: string) => {
      try {
        dispatch({ type: "GET_DATA" });
        const AllEmployees = await getAllEmployee(url);
        setCount(AllEmployees.page.totalElements);
        const tableData: AllEmployeeTableData[] = AllEmployees.content.map(
          (data: AllEmployeeData) => {
            return {
              name: data.name,
              email: data.email,
              role: data.role.split("_")[1],
              location: [
                data.facilityName,
                data.workplaceName,
                data.workStationCode,
                data.toolCribName,
              ]
                .filter((val) => val ?? val)
                .join(" , "),
              // action: actionButtons(data),
            };
          }
        );
        dispatch({ type: "GET_DATA_SUCCESS", data: tableData });
      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the Employees",
        });
      }
    };

    const handlers = {
      // handleAddModal,
      // hideDeleteModal,
      // hideEditModal,
      handleSelect,
      getData,

      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount,
    };

    return (
      <AllEmployeeContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </AllEmployeeContext.Provider>
    );
  };
};
