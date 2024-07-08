import React, { useEffect, useState } from "react";
import styles from "./product-info.module.scss";
import PageLayout from "../../components/layouts/page-layout";
import SectionHeading from "../../components/section-headings/section-heading";
import BestProductSlider from "../../components/slider/best-products-slider";
import { singleProduct } from "../../services/single-data";
import { Rating } from "react-simple-star-rating";
import ProductColorVariants from "./product-color-variants";
import PrimaryBtn from "../../components/buttons/primary-btn";
import ProductQuantityCounter from "../../components/cart/product-quantity-counter";
import iconDelivery from "../../assets/icons/icon-delivery.svg";
import iconReturn from "../../assets/icons/Icon-return.svg";
import ProductShippingCard from "./product-shipping-card";
import ProductImagesSlider from "../../components/slider/product-images-slider";
import useShoppingCart from "../../hooks/use-shopping-cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helpers } from "../../services/helper";

const ProductInfoPage = () => {
  const isLogin = useSelector(state => state.user.isLogin)
  const navigate = useNavigate()
  const [activeColor, setActiveColor] = useState(
    singleProduct.colors?.[0] ?? null
  );

  const [quantity, setQuantity] = useState(0);
  const { addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount, getCartProducts, getCartProductQuantity, getCartSingleProducts, clearCart, } = useShoppingCart();
 
  useEffect(()=>{
    const q = getCartProductQuantity(singleProduct?.id);
    setQuantity(q);
  }, [getCartProductQuantity, addToCart, decreaseProductQuantityInCart]);
  console.log(quantity);


  return (
    <PageLayout>
      <section className={`container py-5 my-5`}>
        <div className="row">
          <div className="col-lg-7">
            <div className={`${styles.product_images_container}`}>
              <figure>
                <img
                  src={singleProduct?.images?.[0]}
                  alt="product feature image"
                />
              </figure>
              <div className={`${styles.product_images_slider_container}`}>
                <ProductImagesSlider
                  images={singleProduct?.images}
                ></ProductImagesSlider>
              </div>
            </div>
          </div>
          <div className="col-lg-5 mt-lg-0 mt-5">
            <div className={`${styles.product_content_container}`}>
              <h1 className={`${styles.product_title}`}>
                {singleProduct.name}
              </h1>
              <div className="d-flex gap-2 align-items-center">
                <div>
                  <Rating
                    initialValue={singleProduct?.rating}
                    readonly={true}
                    allowFraction={true}
                    size={22}
                  ></Rating>
                </div>
                <span className={`${styles.in_stock}`}>In Stock</span>
              </div>
              <p className={`${styles.product_price}`}>
                {Helpers.priceFormatter(singleProduct.price)}
              </p>
              <p className={`${styles.product_descr}`}>
                {singleProduct.description}
              </p>

              {/* color */}
              <div
                className={`${styles.product_color_variants} d-flex gap-2 align-items-center`}
              >
                <span className={`${styles.product_color_title}`}>
                  Colours:
                </span>
                <div className="d-flex gap-2 align-items-center">
                  {activeColor && (
                    <ProductColorVariants
                      colorsList={singleProduct.colors}
                      activeColor={activeColor}
                      onChangeColor={setActiveColor}
                    ></ProductColorVariants>
                  )}
                </div>
              </div>

              {/* counter */}
              <div className={`${styles.product_buy_container} d-flex gap-2 align-items-center my-5`}>
                <div>
                  {quantity > 0 ? <ProductQuantityCounter qty={quantity} onIncrement={() => addToCart(singleProduct)} onDecrement={() => decreaseProductQuantityInCart(singleProduct)}></ProductQuantityCounter> : <div><PrimaryBtn onClick={() => addToCart(singleProduct)}>Add To Cart</PrimaryBtn></div>}
                </div>
                <div className={`${styles.button_div}`}>
                  <PrimaryBtn onClick={() => null}>Buy Now</PrimaryBtn>
                </div>
              </div>

              {/* delivery */}
              <div
                className={`${styles.product_shipping_container} d-flex flex-column my-5`}
              >
                <ProductShippingCard
                  icon={iconDelivery}
                  title="Free Delivery"
                  description="Enter your postal code for Delivery Availability"
                ></ProductShippingCard>
                <ProductShippingCard
                  icon={iconReturn}
                  title="Return Delivery"
                  description="Free 30 Days Delivery Returns. Details"
                ></ProductShippingCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Realated Products */}
      <section className={`${styles.best_product_section} container my-5 py-5`}>
        <SectionHeading>Related Items</SectionHeading>
        <BestProductSlider></BestProductSlider>
      </section>
    </PageLayout>
  );
};

export default ProductInfoPage;
