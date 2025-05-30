import type { ToolsState, ToolAction } from "./Tools.types";

export const initialToolState: ToolsState = {
  isLoading: false,
  error: "",
  toolsData: [],
  addModal: false,
  deleteModal: false,
  editModal: false,
  selectedTool: null,

  selectedFilters: [],
  searchValue: "",
  minPrice: 10,
  maxPrice: 10000,
  count: 0,
  urlFilter: "page=0&size=5",
};

export const toolsReducer = (
  prevState: ToolsState,
  action: ToolAction
): ToolsState => {
  switch (action.type) {
    case "ADD_MODAL":
      return { ...prevState, addModal: !prevState.addModal };
    case "DELETE_MODAL":
      return { ...prevState, deleteModal: !prevState.deleteModal };
    case "EDIT_MODAL":
      return { ...prevState, editModal: !prevState.editModal };
    case "SELECT_TOOL":
      return { ...prevState, selectedTool: action.data };
    case "UPDATE TOOLS":
      return { ...prevState, toolsData: action.data };

    case "SET_COUNT":
      return { ...prevState, count: action.count };
    case "SET_FILTERS":
      return { ...prevState, selectedFilters: action.data };
    case "SET_SEARCH":
      return { ...prevState, searchValue: action.data };
    case "SET_MINPRICE":
      return { ...prevState, minPrice: action.data };
    case "SET_MAXPRICE":
      return { ...prevState, maxPrice: action.data };
    case "SET_URL_FILTER":
      return { ...prevState, urlFilter: action.data };

    default:
      return prevState;
  }
};
