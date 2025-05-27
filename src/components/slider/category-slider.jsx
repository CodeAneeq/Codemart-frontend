import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./sliders.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CategoryCard } from "../cards/category-card";
import axios from "axios";
import baseURL from "../../services/constant";

export default function CategorySlider() {
  const swiperRef = useRef(null);
   const [category, setCategory] = useState([]);
   
   const getCategories = async () => { 
     try {
       let response = await axios.get(`${baseURL}/category/api/get-category`);
       let data = response.data.data;
       
       console.log(data);
       setCategory(data);
      } catch (error) {
        console.log(error);
      }
    }

   useEffect(() => {
    getCategories()
   }, [])

   useEffect(() => {
  console.log("Updated category state:", category);
}, [category]);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <div className={`${styles.swiper_button_container} mb-3`}>
        <div className={`${styles.nav_btn}`} onClick={goPrev}>
          <FaArrowLeft />
        </div>
        <div className={`${styles.nav_btn}`} onClick={goNext}>
          <FaArrowRight />
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          992: { slidesPerView: 5, spaceBetween: 30 },
          1200: { slidesPerView: 6, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {category.map((item, key) => (
          <SwiperSlide key={key} className="d-flex justify-content-center">
            <CategoryCard id={item._id} icon={item.image} title={item.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
