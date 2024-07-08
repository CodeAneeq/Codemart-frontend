import React from "react";
import styles from "./checkout.module.scss";
import iconCancel from "../../assets/imgs/icon-cancel.png";
import Monitor from "../../assets/imgs/pc1.png";
import ProductQuantityCounter from "../../components/cart/product-quantity-counter";
import useShoppingCart from "../../hooks/use-shopping-cart";
import { Helpers } from "../../services/helper";

export const CartProduct = ({data}) => {

  const { addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount, getCartProducts, getCartProductQuantity, getCartSingleProducts, clearCart, } = useShoppingCart();
  const totalPrice = data.product.price * data.quantity;
  return (
    <tr className={`${styles.table_row}`}>
      <td>
        <div className={`${styles.product_cell}`}>
          <div className={`${styles.img_container}`}>
            <img className={`${styles.product_img}`} src={data.product?.images?.[0]} alt="" />
            <img className={`${styles.cross_icon}`} src={iconCancel} alt=""  onClick={() => removeFromCart(data?.product)}/>
          </div>
          <p className="m-0 ps-2">{data.product.name}</p>
        </div>
      </td>
      <td>{Helpers.priceFormatter(data?.product?.price)}</td>
      <td>
        <ProductQuantityCounter small qty={data.quantity} onIncrement={() => addToCart(data?.product)} onDecrement={() => decreaseProductQuantityInCart(data?.product)}></ProductQuantityCounter>
      </td>
      <td>{Helpers.priceFormatter(totalPrice)}</td>
    </tr>
  );
};
