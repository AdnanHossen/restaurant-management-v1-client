import React from "react";
import { Outlet } from "react-router";
import MenuButton from "../components/MenuButton";

const Menu = () => {
  return (
    <div className="my-20 space-y-10">
      {/* menu types button */}
      <div className="w-[60%] mx-auto">
        <MenuButton></MenuButton>
      </div>
      <section className="w-[80%] mx-auto">
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default Menu;
