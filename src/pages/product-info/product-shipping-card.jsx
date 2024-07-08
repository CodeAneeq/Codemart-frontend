import React from "react";
import styles from "./product-info.module.scss";

const ProductShippingCard = (props) => {
  return (
    <div className={`${styles.shipping_card}`}>
      <figure>
        <img src={props.icon} alt="" />
      </figure>
      <div className={`${styles.shipping_card_content}`}>
        <h5>{props.title}</h5>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default ProductShippingCard;;