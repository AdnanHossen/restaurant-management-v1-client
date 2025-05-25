import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const MenuContent = () => {
  // param
  const { menuType } = useParams();

  // fetch data of this menuType
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/menus?menuType=${menuType}`)
      .then((res) => setMenuItems(res.data));
  }, [menuType]);

  console.log(menuItems);

  // return
  return (
    <div className="p-10 grid grid-cols-4 gap-4">
      {menuItems.map((menus, idx) => (
        <div className="card bg-base-100 shadow-sm" key={idx}>
          <figure>
            <img src={menus.menuImg} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{menus.name}</h2>
            <p>{menus.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{menus.price}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuContent;
