import { createContext, type ComponentType, useReducer } from "react";

import Button from "../../../../components/Button/Button";
import { getAvailFacilityManagers, getFacility } from "../../../../services/Admin/Facility.service";
import { facilityInitialState, FacilityReducer } from "./FacilityPage.reducer";
import type { FacilityState, FacilityData, FacilityTableData, FacilityMethods } from "./FacilityPage.types";
import { FaEdit, FaTrash } from "react-icons/fa";

//create Context
export const FacilityContext = createContext<
  (FacilityState & FacilityMethods) | null
>(null);

//HOC
export const withFacilityContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      FacilityReducer,
      facilityInitialState
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

    const handleSelect = (data: FacilityData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    const setAvailFields=async (val: string)=>{
      const facilityManagers=await getAvailFacilityManagers(val);  
      console.log(facilityManagers);
          
      dispatch({type: "SET_AVAIL_FIELDS", data: facilityManagers.data})
    }

    const actionButtons = (data: FacilityData) => {
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
        const facilitys = await getFacility();
        console.log(facilitys);

        const tableData: FacilityTableData[] =
          facilitys.content.map((data: FacilityData) => {
            return {
              name: data.name,
              address: data.address,
              facilityManagerEmail: data.facilityManagerEmail,
              action: actionButtons(data),
            };
          });
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
      handleEditModal,
      handleDeleteModal,
      handleSelect,
      getData,
      setAvailFields
    };

    return (
      <FacilityContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </FacilityContext.Provider>
    );
  };
};
