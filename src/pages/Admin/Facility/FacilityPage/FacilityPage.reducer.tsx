import type { FacilityState, FacilityAction } from "./FacilityPage.types";

export const facilityInitialState: FacilityState = {
  isLoading: false,
  error: '',
  addModal: false,
  editModal: false,
  deleteModal: false,
  selected: null,
  facilityTableData: [],
  // facilityManagers: [],
  availFields: []
};
export const FacilityReducer = (
  prevState: FacilityState,
  action: FacilityAction
): FacilityState => {

  switch (action.type) {
    case "ADD_MODAL":
      return { ...prevState, addModal: action.status };
    case "EDIT_MODAL":
      return { ...prevState, editModal: action.status };
    case "DELETE_MODAL":
      return { ...prevState, deleteModal: action.status };
    case "GET_DATA":
      return { ...prevState, isLoading: true, error: "" };
    case "GET_DATA_FAILED":
      return { ...prevState, isLoading: false, error: action.error};
    case "GET_DATA_SUCCESS":
      return { ...prevState, isLoading: false, facilityTableData: action.data };
    case "SELECT":
      return {...prevState, selected: action.selected}
    case "SET_AVAIL_FIELDS":
      return {...prevState, availFields: action.data}
    default:
      return {...prevState}
  }
};
