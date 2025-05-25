import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles/banner.css";

// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";

const Banner = () => {
  // fetch slide details
  const [slideData, setSlideData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/slides")
      .then((res) => setSlideData(res.data));
  }, []);

  // return code
  return (
    <div className="swiper-wrapper-container h-screen w-full">
      <Swiper
        direction={"vertical"}
        autoHeight={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-full"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content h-full w-full flex items-center justify-between p-16">
              <div className="text-section">
                <h4>{slide.subtitle}</h4>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button className="btn btn-outline">{slide.buttonText}</button>
              </div>
              <div className="image-section grid grid-cols-2 gap-2 p-20">
                {slide.image.map((img, idx) => (
                  <div className="image-container w-[300px] h-[300px] ">
                    <img
                      key={idx}
                      src={img}
                      alt={`Slide ${index} image ${idx}`}
                      className={`img img-${idx} object-cover rounded-sm`} // You can style each position uniquely
                    />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
