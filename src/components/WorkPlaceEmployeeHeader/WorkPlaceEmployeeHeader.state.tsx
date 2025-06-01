import {
  createContext,
  useReducer,
  type ComponentType,
} from "react";
import type {
  HeaderMethods,
  HeaderState,
} from "./WorkPlaceEmployeeHeader.types";
import { headerInitialState, headerReducer } from "./WorkPlaceEmployeeHeader.reducer";
import { getuserDetail } from "../../services/auth.service";
import { toast } from "react-toastify";

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

    const getUserData=async()=>{
      try {
        const res= await getuserDetail();
        console.log("fa",res);
        dispatch({type:"USER_DATA", data: res})
      } catch (error) {
        toast.error("Couldn't fetch your Details")
      }
    }

    const handlers: HeaderMethods = { handleModal , getUserData};

    return (
      <HeaderContext.Provider
        value={{ ...state, ...handlers }}
      >
        <Component {...props}/>
      </HeaderContext.Provider>
    );
  };
};
