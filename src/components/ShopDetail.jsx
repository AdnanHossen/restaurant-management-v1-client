import React from "react";

import useCart from "../hooks/useCart";
import Loading from "./Loading";
import { Link } from "react-router";

const ShopDetail = ({ menu }) => {
  // deconstruct from query hook
  const { addToCart, isLoading } = useCart();

  // add to cart function
  const handleAddToCart = (id) => {
    addToCart.mutate(id);
  };

  console.log(menu?._id);

  if (isLoading) {
    return <Loading></Loading>;
  }

  // return code
  return (
    <>
      <h1 className="text-5xl font-bold">{menu?.name}</h1>
      <p className="py-6">{menu?.description}</p>
      <button className="btn btn-primary">{menu?.price}</button>
      <br />
      <button
        className="btn btn-ghost"
        onClick={() => handleAddToCart(menu?._id)}
      >
        Add to cart
      </button>
      <br />
      <Link to={`/update-menu/${menu?._id}`} className="btn btn-warning">
        Edit Details
      </Link>
    </>
  );
};

export default ShopDetail;
