import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./sliders.module.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

export default function ProductImagesSlider({ images }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={160}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 30 },
          1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {images?.map((src, key) => (
          <SwiperSlide key={key} className="d-flex justify-content-center">
            <img
              className={`${styles.product_other_images}`}
              src={src}
              alt="other images of other products"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
