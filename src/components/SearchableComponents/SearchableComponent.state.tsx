import { createContext, useReducer, type ComponentType } from "react";
import {
  initialSelectState,
  searchableReducer,
} from "./SearchableComponent.reducer";
import type {
  SearchableMethods,
  SearchableState,
} from "./SearchableComponents.types";

//create Context
export const SearchableContext = createContext<
  (SearchableState & SearchableMethods) | null
>(null);

//HOC
export const withSearchableContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(searchableReducer, initialSelectState);

    //handlers
    const handleShowFields = () => {
      dispatch({ type: "SHOW_FIELDS" });
    };

    const selectValue = (value: string) => {
      dispatch({ type: "CURRENTLY_SELECTED", value: value });
    };

    const handlers = {
      selectValue,
      handleShowFields,
    };
    return (
      <SearchableContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </SearchableContext.Provider>
    );
  };
};
