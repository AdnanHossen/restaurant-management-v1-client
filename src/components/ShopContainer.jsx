// import axios from "axios";
import React, { useEffect, useState } from "react";
import ShopProduct from "./ShopProduct";
import secureApi from "../services/secureApi";

const ShopContainer = () => {
  // all menu items
  const [menuItems, setMenuItems] = useState([]);

  // fetch
  useEffect(() => {
    secureApi.get(`/menus`).then((res) => setMenuItems(res.data));
  }, []);

  // return code
  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {menuItems.map((menu, idx) => (
        <ShopProduct key={idx} menu={menu}></ShopProduct>
      ))}
    </div>
  );
};

export default ShopContainer;
