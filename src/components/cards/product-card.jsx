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
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import useWishList from "../../hooks/use-wishlist";

const ProductCard = ({ data }) => {  
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();
  const { addToCart } = useShoppingCart();
  const { addToWishList, getWishListProducts, removeFromWishList } = useWishList();

  const products = getWishListProducts();
  const isInWishlist  = products.some(item => item.product._id == data._id);
  


  return (
    <div
      className={`${styles.product_card_container}`}>
      <div className={`${styles.card_img_container}`}       onClick={() => navigate(`/products-info/${data?._id}`)}>
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
        >
          <img
          onClick={(e) => {
            e.stopPropagation();
            addToCart(data)}}
          className={`${styles.cart_icon}`}
            style={{ cursor: "pointer" }}
            src={cartIcon}
            alt=""
          />
            <span style={{fontSize: "25px", marginLeft: "10px", marginRight: "10px", cursor: "pointer"}}>{isInWishlist  ? <FaHeart onClick={() => removeFromWishList(data)}></FaHeart> : <CiHeart onClick={(e) => {
              e.stopPropagation();
              addToWishList(data)
            }}></CiHeart>}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
