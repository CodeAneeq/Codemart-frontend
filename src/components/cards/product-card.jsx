import React from "react";
import styles from "./cards.module.scss";
import p1 from "../../assets/imgs/p1.png";
import cartIcon from "../../assets/imgs/cart.png";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useShoppingCart from "../../hooks/use-shopping-cart";
import { Helpers } from "../../services/helper";
import { singleProduct } from "../../services/single-data";

const ProductCard = ({ data }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();
  const { addToCart } = useShoppingCart();

  return (
    <div
      className={`${styles.product_card_container}`}
      onClick={() => navigate("/products-info")}
    >
      <div className={`${styles.card_img_container}`}>
        <img src={data.images ? data.images[0] : p1} alt="" />
      </div>
      <div className={`${styles.card_content}`}>
        <div className={`${styles.card_details}`}>
          <h6>{data.name}</h6>
          <p>{Helpers.priceFormatter(data?.price)}</p>
          <Rating
            initialValue={data.rating}
            readonly={true}
            allowFraction={true}
            size={20}
          ></Rating>
        </div>
        <div 
        onClick={(e) => {
          e.stopPropagation();
          addToCart(data)}}
          className={`${styles.cart_icon}`}>
          <img
            style={{ cursor: "pointer" }}
            src={cartIcon}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
