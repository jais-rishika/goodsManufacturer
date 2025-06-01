import { createContext, useReducer, type ComponentType } from "react"
import { filterReducer, initialFilterState } from "./Filter.reducer"
import type { FilterMethods, FilterState } from "./Filter.types";


export const FilterContext = createContext<(FilterState & FilterMethods) | null>(
  null
);

export const withFilterContext=<T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(filterReducer, initialFilterState)

    //filter
    const handleFilterChange = (filter: string[], url: string) => {
      dispatch({ type: "SET_FILTERS", data: filter });

      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

    //   do this //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let category;

      newUrl.set("minDate", `${state.minDate}` );
      newUrl.set("maxDate", `${state.maxDate}` );

      updateUrl(newUrl.toString() + category);
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

    const updateMinDate = (val: string) => {
      dispatch({ type: "SET_MINDATE", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", `${val}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };
    const updateMaxDate = (val: string) => {
      dispatch({ type: "SET_MAXDATE", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", `${val}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const handlers: FilterMethods = {
          handleFilterChange,
        //   handleUrlChange,
          updateSearch,
          updateMinDate,
          updateMaxDate,
          updateMinPrice,
          updateMaxPrice,
        };

    return (
          <FilterContext.Provider value={{ ...state, ...handlers }}>
            <Component {...props} />
          </FilterContext.Provider>
        );
  }
}