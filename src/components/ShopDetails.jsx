// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShopImgGallery from "./ShopImgGallery";
import ShopDetail from "./ShopDetail";
import secureApi from "../services/secureApi";

const ShopDetails = () => {
  // param id
  const { id } = useParams();

  // state
  const [menuItem, setMenuItem] = useState([]);
  console.log(menuItem);

  // fetch
  useEffect(() => {
    secureApi.get(`/menus?id=${id}`).then((res) => setMenuItem(res.data));
  }, [id]);

  // return code
  return (
    <div className="w-[90%] mx-auto min-h-screen flex-col justify-center items-center">
      <div className="my-10 w-full">
        {menuItem.map((menu, idx) => (
          <div className="">
            <div className="hero bg-base-200 min-h-screen" key={idx}>
              <div className="hero-content flex-col lg:flex-row w-full">
                <div className="w-1/2">
                  <ShopImgGallery imgGallery={menu.imgGallery}></ShopImgGallery>
                </div>
                <div className="w-1/2 space-y-4 p-6">
                  <ShopDetail menu={menu}></ShopDetail>
                </div>
              </div>
            </div>
            <div className="my-20 min-h-60 bg-base-200 space-y-5 ">
              {menu.reviews.map((review) => (
                <div className="border-2 rounded-lg">
                  <p className="">{review.user}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopDetails;
