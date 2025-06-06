import { createContext, useState } from "react";
import App from "../../App";
import type { MainState } from "./Main.types";

export const MainContext = createContext<MainState | null>(null);
const Main = () => {
  const [role, setRole] = useState("");
  const state: MainState = {
    role,
    setRole,
  };
  return (
    <MainContext.Provider value={{ ...state }}>
      <App />
    </MainContext.Provider>
  );
};

export default Main;
