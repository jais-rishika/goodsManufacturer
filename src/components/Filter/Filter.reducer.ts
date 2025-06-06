import type { FilterAction, FilterState } from "./Filter.types";

export const formatDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const dd = String(d.getDate()).padStart(2, "0"); // day of month
  return `${yyyy}-${mm}-${dd}`;
};

export const initialFilterState: FilterState = {
  selectedFilters: [],
  searchValue: "",
  minDate: "2025-01-20",
  maxDate: `${formatDate(new Date())}`,
  minPrice: 10,
  maxPrice: 100000,
  urlFilter:'page=1&size=5'
};

export const filterReducer = (
  prevState: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...prevState, selectedFilters: action.data };
    case "SET_SEARCH":
      return { ...prevState, searchValue: action.data };
    case "SET_MINDATE":
      return { ...prevState, minDate: action.data };
    case "SET_MAXDATE":
      return { ...prevState, maxDate: action.data };
    case "SET_MINPRICE":
      return { ...prevState, minPrice: action.data };
    case "SET_MAXPRICE":
      return { ...prevState, maxPrice: action.data };

    default:
      return prevState;
  }
};
