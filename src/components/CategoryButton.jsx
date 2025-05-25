import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const CategoryButton = () => {
  // category state
  const [categories, setCategories] = useState([]);
  // category fetch
  useEffect(() => {
    axios
      .get(`http://localhost:5000/category`)
      .then((res) => setCategories(res.data));
  }, []);

  console.log(categories);

  // return code
  return (
    <div className="">
      <ul className="">
        {categories.map((category, idx) => (
          <li key={idx}>
            <NavLink
              to={`${category.name}`}
              className={({ isActive }) =>
                isActive ? " btn btn-primary w-full" : " btn btn-ghost w-full"
              }
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryButton;
