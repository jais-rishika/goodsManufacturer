import { createContext, useReducer, type ComponentType } from "react";

import type {
  FacilityManagerState,
  FacilityManagerMethods,
  FacilityManagerTableData,
  FacilityManagerData,
} from "./FacilityManagerPage.types";

import {
  FacilityManagerReducer,
  facilityManagerInitialState,
} from "./FacilityManagerPage.reducer";
import { getFacilityManager } from "../../../../services/Admin/FacilityManager.service";
import Button from "../../../../components/Button/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

//create Context
export const FacilityManagerContext = createContext<
  (FacilityManagerState & FacilityManagerMethods) | null
>(null);

//HOC
export const withFacilityManagerContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      FacilityManagerReducer,
      facilityManagerInitialState
    );

    //handlers
    const handleAddModal = () => {
      dispatch({ type: "ADD_MODAL", status: !state.addModal });
    };

    const handleEditModal = () => {
      dispatch({ type: "EDIT_MODAL", status: !state.editModal });
    };

    const handleDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL", status: !state.deleteModal });
    };

    const handleSelect = (data: FacilityManagerData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    const actionButtons = (data: FacilityManagerData) => {
      return (
        <>
          <Button
            primary
            onClick={() => {
              handleSelect(data);
              handleEditModal();
            }}
          >
            <FaEdit />
          </Button>

          <Button
            danger
            onClick={() => {
              handleSelect(data);
              handleDeleteModal();
            }}
          >
            <FaTrash />
          </Button>
        </>
      );
    };

    const getData = async () => {
      try {
        dispatch({ type: "GET_DATA" });
        const facilityManagers = await getFacilityManager();
        console.log(facilityManagers);

        const tableData: FacilityManagerTableData[] =
          facilityManagers.content.map((data: FacilityManagerData) => {
            return {
              name: data.name,
              email: data.email,
              createdAt: data.createdAt.substring(0, 10),
              facilityName: data.facilityName,
              action: actionButtons(data),
            };
          });
        dispatch({ type: "GET_DATA_SUCCESS", data: tableData });
      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the Facility Managers",
        });
      }
    };

    const handlers = {
      handleAddModal,
      handleEditModal,
      handleDeleteModal,
      handleSelect,
      getData,
    };

    return (
      <FacilityManagerContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </FacilityManagerContext.Provider>
    );
  };
};
