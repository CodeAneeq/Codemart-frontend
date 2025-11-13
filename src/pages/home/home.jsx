import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layouts/page-layout.jsx";
import styles from "./home.module.scss";
import BannerSlider from "../../components/slider/banner-slider.jsx";
import banner1 from "../../assets/imgs/Banner1.png";
import banner2 from "../../assets/imgs/Banner2.png";
import banner3 from "../../assets/imgs/Banner3.png";
import banner4 from "../../assets/imgs/Banner4.png";
import SectionHeading from "../../components/section-headings/section-heading.jsx";
import CategorySlider from "../../components/slider/category-slider.jsx";
import { CategoryCard } from "../../components/cards/category-card.jsx";
import ProductCard from "../../components/cards/product-card.jsx";
import BestProductSlider from "../../components/slider/best-products-slider.jsx";
import dummyData from "../../services/dummy-data.json";
import PrimarySymbol from "../../components/symbols/primary-symbol.jsx";
import AboutCard from "../../components/cards/about-card.jsx";
import PrimaryBtn from "../../components/buttons/primary-btn.jsx";
import { useNavigate } from "react-router-dom";
import featureImg from "../../assets/imgs/futureimg.png";
import FullServices from "../../components/cards/full-services.jsx";
import DeliveryIcon from "../../assets/imgs/icon-delivery.png";
import CustomerService from "../../assets/imgs/Icon-Customer.png";
import Secure from "../../assets/imgs/Icon-secure.png";
import baseURL from "../../services/constant.jsx";
import axios from "axios";

const bannerIMGS = [banner1, banner2, banner3, banner4];

const HomePage = () => {

  const [product, setProduct] = useState([]);
  
    const getProducts = async () => { 
       try {
         let response = await axios.get(`${baseURL}/product/api/get-products`);
         let data = response.data.data;
         
         console.log(data);
         setProduct(data)
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
              getProducts()
            }, [])

  const navigate = useNavigate();
  return (
    <div>
      <PageLayout>
        <BannerSlider images={bannerIMGS}></BannerSlider>
        <div className={`${styles.categories_section} container my-4 pt-5`}>
          {/* categories */}
          <SectionHeading title={"Browse By Category"}>
            Categories
          </SectionHeading>
          <CategorySlider></CategorySlider>
        </div>
        {/* best selling products */}
        <div className={`${styles.best_product_section} container my-5 py-5`}>
          <SectionHeading title={"Best Selling Products"}>
            This Month
          </SectionHeading>
          <BestProductSlider></BestProductSlider>
        </div>
        {/* explore our products */}
        <div className={`${styles.best_product_section} container my-5 py-5`}>
          <SectionHeading title={"Explore our Products"}>
            Our Products
          </SectionHeading>
          <div className="d-flex flex-wrap justify-content-center justify-content-md-between mt-4 gap-4">
            {product.slice(0, 8).map((item) => (
              <div  key={item.id} className="mt-5 ">
                <ProductCard data={item} />
              </div>
            ))}
          </div>
          <div className="mt-5" style={{ width: "200px", margin: "auto" }}>
            <PrimaryBtn
              loading={false}
              disabled={false}
              onClick={() => {
                navigate("/products");
              }}
            >
              View All Products
            </PrimaryBtn>
          </div>
        </div>
        {/* feature IMG */}
        <div className="container my-5">
          <img src={featureImg} width={"100%"} alt="" />
        </div>
        <div className={`${styles.services} container`}>
          <FullServices
            img={DeliveryIcon}
            service="FREE AND FAST DELIVERY"
            serviceText="Free Delivery for all orders over $140"
          ></FullServices>
          <FullServices
            img={CustomerService}
            service="24/7 CUSTOMER SERVICE"
            serviceText="Friendly 24/7 Customer Support"
          ></FullServices>
          <FullServices
            img={Secure}
            service="Money Back Guarantee"
            serviceText="We return money within 30 Days"
          ></FullServices>
        </div>
      </PageLayout>
    </div>
  );
};

export default HomePage;
