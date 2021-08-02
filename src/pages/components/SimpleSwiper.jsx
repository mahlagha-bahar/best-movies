import PropTypes from "prop-types";
import React from "react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);
import { Swiper, SwiperSlide } from "swiper/react";

export default function SimpleSwiper({ slides }) {
  console.log("slides", slides);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {slides?.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img
            width="100%"
            src={`https://image.tmdb.org/t/p/w500/${slide.poster_path}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// SimpleSwiper.propTypes = {
//   slides: PropTypes.array.required,
// };
