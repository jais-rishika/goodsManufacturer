import type {
  AllEmployeeAction,
  AllEmployeeState,
} from "./AllEmployee.types";

export const AllEmployeeInitialState: AllEmployeeState = {
  isLoading: false,
  error: '',
  // addModal: false,
  // editModal: false,
  // deleteModal: false,
  selected: null,
  AllEmployeeTableData: [],

  selectedFilters:[],
  searchValue: "",
  count: 0,
  urlFilter:"page=0&size=5",
};
export const AllEmployeeReducer = (
  prevState: AllEmployeeState,
  action: AllEmployeeAction
): AllEmployeeState => {

  switch (action.type) {
    // case "ADD_MODAL":
    //   return { ...prevState, addModal: action.status };
    // case "EDIT_MODAL":
    //   return { ...prevState, editModal: action.status };
    // case "DELETE_MODAL":
    //   return { ...prevState, deleteModal: action.status };
    case "GET_DATA":
      return { ...prevState, isLoading: true, error: "" };
    case "GET_DATA_FAILED":
      return { ...prevState, isLoading: false, error: action.error};
    case "GET_DATA_SUCCESS":
      return { ...prevState, isLoading: false, AllEmployeeTableData: action.data };
    case "SELECT":
      return {...prevState, selected: action.selected}

    case "SET_COUNT":
      return {...prevState, count: action.count}
    case "SET_FILTERS":
      return {...prevState, selectedFilters: action.data} 
    case "SET_SEARCH": 
      return {...prevState, searchValue: action.data}
    case "SET_URL_FILTER":
      return {...prevState, urlFilter: action.data}
      
    default:
      return prevState
  }
};
