import React, { useState } from 'react';
import styles from './checkout.module.scss';
import PrimaryBtn from '../../components/buttons/primary-btn';
import { useNavigate } from 'react-router-dom';
import { Helpers } from "../../services/helper";
import useShoppingCart from "../../hooks/use-shopping-cart";
import { useSelector } from 'react-redux';
import { getCartProductDetails, getCartTotalPrice } from '../../redux/features/cart-slice';

export const CheckoutSummary = () => {
  const [err, setErr] = useState("");
  const [loader, setLoader] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();
  const { getCartProducts } = useShoppingCart();
  const products = getCartProducts()
  
    const cartItems = useSelector(getCartProductDetails);
  const subtotal = useSelector(getCartTotalPrice);
  const shipping = 200; // You can add shipping calculation logic here
  const total = subtotal + shipping;

  const handleClick = () => {
    if (products.length === 0) {
      setLoader(false)
      return setErr("Cart is Empty")
    }
    setLoader(false)
    setErr("")
    navigate('/address', {state: {paymentMethod}});
  };

  return (
    <div className={`${styles.checkout_summary}`}>
        <h4>Cart Total</h4>
        <div className='d-flex justify-content-between border-bottom border-3 py-2'>
            <div>SubTotal:</div>
            <div>{Helpers.priceFormatter(subtotal)}</div>
        </div>
        <div className='d-flex justify-content-between border-bottom border-3 py-2'>
            <div>Shipping:</div>
            <div>{Helpers.priceFormatter(shipping)}</div>
        </div>
        <div className='d-flex justify-content-between border-bottom border-3 py-2'>
            <div>Payment Method :</div>
            <select style={{background: "transparent", border: "none"}} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="cash">Cash On Delivery</option>
              <option value="card">Stripe</option>
            </select>
        </div>
        <div className='d-flex justify-content-between py-2'>
            <div>Total:</div>
            <div>{Helpers.priceFormatter(total)}</div>
        </div>
        <div className='mt-5 my-3'>
            <PrimaryBtn onClick={handleClick} loading={loader ? true : false} disabled={loader ? true : false}>Proceed To Checkout</PrimaryBtn>
        </div>
<div className="text-danger"><small>{err}</small></div>
    </div>
  )
}
