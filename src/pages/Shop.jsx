import React from "react";
import ShopContainer from "../components/ShopContainer";

const Shop = () => {
  return (
    <div className="w-11/12 mx-auto space-x-4 flex justify-between my-20">
      <aside className="w-1/3">
        <h1 className="">aside part later integrate</h1>
      </aside>
      <section className="w-2/3">
        <ShopContainer></ShopContainer>
      </section>
    </div>
  );
};

export default Shop;
