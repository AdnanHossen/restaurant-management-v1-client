import React from "react";
import { Link } from "react-router";

const ShopProduct = ({ menu }) => {
  const { _id, name, menuImg, description, price } = menu;

  // return
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure>
        <img src={menuImg} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link to={`${_id}`} className="btn btn-primary">
            view details
          </Link>
          <button className="btn btn-primary">{price}</button>
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
