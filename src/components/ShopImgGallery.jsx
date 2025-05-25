import React, { useState } from "react";

const ShopImgGallery = ({ imgGallery }) => {
  // selected image
  const [imageIndex, setImageIndex] = useState(0);

  // return code
  return (
    <div className="flex flex-col space-y-3">
      <div className="shadow-sm h-80 w-full p-4">
        <img src={imgGallery[imageIndex]} className="w-full h-full " alt="" />
      </div>
      <div className="grid grid-cols-4 gap-5 shadow-sm">
        {imgGallery.map((img, idx) => (
          <div
            className={`cursor-pointer p-4 ${
              imageIndex === idx ? "border border-amber-200 rounded-lg" : ""
            }`}
            key={idx}
            onClick={() => setImageIndex(idx)}
          >
            <img src={img} className="w-full h-full" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopImgGallery;
