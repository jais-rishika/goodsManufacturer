import { createContext, useReducer, type ComponentType } from "react";
import {
  initialSelectState,
  MultipleSelectReducer,
} from "./MultipleSelect.reducer";
import type {
  MultipleSelectMethods,
  MultipleSelectState,
} from "./MultipleSelect.types";

//create Context
export const MultipleSelectContext = createContext<
  (MultipleSelectState & MultipleSelectMethods) | null
>(null);

//HOC
export const withMultipleSelectContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(MultipleSelectReducer, initialSelectState);

    //handlers
    const handleShowFields = () => {
      dispatch({ type: "SHOW_FIELDS" });
    };

    const selectValue = (value: string[]) => {
      dispatch({ type: "CURRENTLY_SELECTED", value: value });
    };

    const handlers = {
      selectValue,
      handleShowFields,
    };
    
    return (
      <MultipleSelectContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </MultipleSelectContext.Provider>
    );
  };
};
