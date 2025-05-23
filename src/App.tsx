import { Outlet } from "react-router";
import "./App.scss";

import React from "react";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader/Loader";

const App = () => {
  return (
    <>
      <Loader />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
