import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import useCart from "../hooks/useCart";
import Loading from "../components/Loading";
import { Link } from "react-router";

const CartTable = ({ item }) => {
  //cart
  const { removeFromCart, isLoading } = useCart();

  // state
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleRemoveFromCart = (id) => {
    removeFromCart.mutate(id);
  };

  // return code
  return (
    <>
      <tr>
        <th>
          <button
            className="btn btn-ghost btn-xl"
            onClick={() => handleRemoveFromCart(item?._id)}
          >
            <MdDeleteForever />
          </button>
        </th>
        <td>
          <div className="">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={item?.menuImg} />
              </div>
            </div>
          </div>
        </td>
        <td>
          {item?.name}
          <br />
          <span className="badge badge-ghost badge-sm">
            {item?.description}
          </span>
        </td>
        <td className="text-center"> {item?.price}</td>
        <td className="text-center text-[24px] flex justify-center items-center">
          <div className="flex justify-between items-center space-x-3">
            <p
              className="cursor-pointer"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <CiSquareMinus />
            </p>
            <p className="">{quantity}</p>
            <p
              className="cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            >
              <CiSquarePlus />
            </p>
          </div>
        </td>
        <td className="text-center">
          {parseFloat(item?.price) * parseInt(quantity)}
        </td>
        <th>
          <Link to={`/shop/${item?._id}`} className="btn btn-outline">
            details
          </Link>
        </th>
      </tr>
    </>
  );
};

export default CartTable;
