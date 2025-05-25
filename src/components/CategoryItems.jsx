// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import secureApi from "../services/secureApi";

const CategoryItems = () => {
  // param id
  const { category } = useParams();

  // now fetch category specific data
  const [items, setItems] = useState([]);

  useEffect(() => {
    secureApi
      .get(`/menus?category=${category}`)
      .then((res) => setItems(res.data));
  }, [category]);

  console.log(items);

  // return code
  return (
    <div className="p-10 grid grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="card card-side bg-base-100 shadow-sm">
          <figure>
            <img src={item?.menuImg} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item?.name}</h2>
            <p>{item?.description}</p>
            <div className="card-actions">
              <button className="btn btn-primary">{item?.price}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryItems;
