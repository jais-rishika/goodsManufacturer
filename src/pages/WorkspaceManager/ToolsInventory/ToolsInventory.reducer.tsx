import type {
  ToolsInventoryAction,
  ToolsInventoryState,
} from "./ToolsInventory.types";

export const toolInventoryInitialState: ToolsInventoryState = {
  isLoading: false,
  error: "",

  ToolInventoryData: [],
  selectedTool: null,

  selectedFilters: [],
  searchValue: "",
  minPrice: 10,
  maxPrice: 10000,
  count: 0,
  urlFilter: "page=0&size=5",
};

export const ToolInventoryReducer = (
  prevState: ToolsInventoryState,
  action: ToolsInventoryAction
): ToolsInventoryState => {
  switch (action.type) {
    case "UPDATE_TOOLS":
      return { ...prevState, ToolInventoryData: action.data };
    case "SELECT_TOOL":
      return { ...prevState, selectedTool: action.data };

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
