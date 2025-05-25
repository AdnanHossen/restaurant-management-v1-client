import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import useSecureInterceptor from "../services/useSecureInterceptor";

const Layouts = () => {
  // secure login attached
  useSecureInterceptor();

  // return code
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layouts;
