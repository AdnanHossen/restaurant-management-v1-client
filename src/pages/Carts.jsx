import React from "react";
import { MdDeleteForever } from "react-icons/md";
import useCart from "../hooks/useCart";
import Loading from "../components/Loading";
import CartTable from "./CartTable";

const Carts = () => {
  // cart values
  const { cart, isLoading } = useCart();
  const { menuItems } = cart;

  // loading
  if (isLoading) {
    return <Loading></Loading>;
  }

  // return code
  return (
    <div className="overflow-x-auto w-[80%] mx-auto my-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Delete</th>
            <th>Image</th>
            <th>Job</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sub Total</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {menuItems?.map((item, idx) => (
            <CartTable key={idx} item={item}></CartTable>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end my-5">
        <button className="btn btn-outline">Proceed To checkout</button>
      </div>
    </div>
  );
};

export default Carts;
