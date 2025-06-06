import { Outlet } from "react-router";
import "./App.module..scss";

import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader/Loader";
import type { AppState } from "./App.types";
import { createContext, useState } from "react";

export const MainContext = createContext<AppState | null>(null);


const App = () => {
  const [role, setRole] = useState("");
    const state: AppState = {
      role,
      setRole,
    };
  return (
    <MainContext.Provider value={{ ...state }}>
      <Loader />
      <ToastContainer />
      <Outlet />
    </MainContext.Provider>
  );
};

export default App;
