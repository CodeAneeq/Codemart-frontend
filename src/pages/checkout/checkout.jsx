import React from "react";
import styles from "./checkout.module.scss";
import PageLayout from "../../components/layouts/page-layout";
import { CartProduct } from "./cart-product";
import { CheckoutSummary } from "./checkout-summary";
import useShoppingCart from "../../hooks/use-shopping-cart";

const CheckoutPage = () => {
  const { addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount, getCartProducts, getCartProductQuantity, getCartSingleProducts, clearCart, } = useShoppingCart();

  const cart_products = getCartProducts()

  return (
    <PageLayout>
      <div className={`container my-5 py-5`}>
        <table class={`${styles.table_container} table align-middle table-borderless`}>
          <thead>
            <tr>
              <td scope="col">Product</td>
              <td scope="col">Price</td>
              <td scope="col">Quantity</td>
              <td scope="col">Subtotal</td>
            </tr>
          </thead>
          <br />
          <tbody>
            {cart_products && cart_products.length > 0 && cart_products.map(item => <CartProduct key={item.product_id} data={item}></CartProduct>)}
          </tbody>
        </table>
        <div className="mt-5 d-flex justify-content-end">
        <CheckoutSummary></CheckoutSummary>
      </div>
      </div>
    </PageLayout>
  );
};


export default CheckoutPage;