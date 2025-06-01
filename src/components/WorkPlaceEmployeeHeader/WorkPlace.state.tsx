import {
  createContext,
  useReducer,
  type ComponentType,
} from "react";
import type {
  HeaderMethods,
  HeaderState,
} from "./WorkPlaceEmployeeHeader.types";
import { headerInitialState, headerReducer } from "./WorkPlace.reducer";

export const HeaderContext = createContext<
  (HeaderState & HeaderMethods) | null
>(null);

export const withHeaderContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(headerReducer, headerInitialState);

    const handleModal = () => {
      dispatch({ type: "MODAL" });
    };

    const handlers: HeaderMethods = { handleModal };

    return (
      <HeaderContext.Provider
        value={{ ...state, ...handlers }}
      >
        <Component {...props}/>
      </HeaderContext.Provider>
    );
  };
};
