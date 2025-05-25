import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const MenuButton = () => {
  // fetch
  const [menuTypes, setMenuTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/menu-types`)
      .then((res) => setMenuTypes(res.data));
  }, []);

  console.log(menuTypes);

  // return code
  return (
    <div className="flex justify-between items-center">
      {menuTypes.map((menuBtn, idx) => (
        <NavLink
          key={idx}
          to={`${menuBtn.name}`}
          className={({ isActive }) =>
            isActive ? "btn btn-primary" : "btn btn-ghost"
          }
        >
          {menuBtn.name}
        </NavLink>
      ))}
    </div>
  );
};

export default MenuButton;
