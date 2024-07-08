import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./sliders.module.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import TomCruise from '../../assets/imgs/TomCruise.png';
import EmmaWatson from '../../assets/imgs/EmmaWatson.png';
import WillSmith from '../../assets/imgs/WillSmith.png';
import AboutProfileCard from "../cards/about-profile-card";
import { Navigation, Pagination } from "swiper/modules";

const profileCard = [
    { img: TomCruise, name: "Tom Cruise", role: "Founder & Chairman" },
    { img: EmmaWatson, name: "Emma Watson", role: "Managing Director" },
    { img: WillSmith, name: "Will Smith", role: "Product Designer" },
    { img: TomCruise, name: "Tom Cruise", role: "Founder & Chairman" },
    { img: EmmaWatson, name: "Emma Watson", role: "Managing Director" },
    { img: WillSmith, name: "Will Smith", role: "Product Designer" },
    { img: TomCruise, name: "Tom Cruise", role: "Founder & Chairman" },
    { img: EmmaWatson, name: "Emma Watson", role: "Managing Director" },
    { img: WillSmith, name: "Will Smith", role: "Product Designer" },
  ];
export default function ProfileCardSlider({ images }) {
  return (
    <>
      <Swiper
      // centeredSlides={true}
        slidesPerView={1}
        spaceBetween={160}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 40 },
          800: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 30 },
        //   1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="mySwiper profileSlider"
      >
        {profileCard.map((item, key) => (
          <SwiperSlide key={key} className='d-flex justify-content-center'>
            <AboutProfileCard image={item.img} name={item.name} role={item.role} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
