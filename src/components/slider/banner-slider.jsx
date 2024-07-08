import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './sliders.module.scss'

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function BannerSlider({images}) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}s
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper, bannerSlider"
      >
        {
            images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className={styles.img_container}>
                    <img src={image} alt="item" />
                    </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}