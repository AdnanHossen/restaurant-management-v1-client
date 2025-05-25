import React from "react";
import CategoryButton from "../components/CategoryButton";
import { Outlet } from "react-router";

const Category = () => {
  return (
    <div className=" w-11/12 mx-auto min-h-screen flex justify-between items-center gap-10">
      <aside className="w-1/4 mx-auto shadow-sm">
        <CategoryButton></CategoryButton>
      </aside>
      <section className="w-3/4 mx-auto">
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default Category;
