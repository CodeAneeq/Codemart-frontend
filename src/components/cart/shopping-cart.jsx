import React from 'react'
import cartIcon from '../../assets/icons/cartIcon.svg'
import styles from '../cart/shoppingcart.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useShoppingCart from '../../hooks/use-shopping-cart'

const ShoppingCart = () => {
  const isLogin = useSelector(state => state.user.isLogin);
  const navigate = useNavigate();
  const { addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount} = useShoppingCart();
  const counter = getCartCount()
  return (
    <div className={styles.shopping_cart_icon}>
      {counter > 0 && <span className={`${styles.cart_products_quantity}`}>{counter}</span>}
      <img onClick={()=>isLogin ? navigate('/checkout') : navigate('/auth/login')} src={cartIcon} alt="search Icon" />
    </div>
  )
}

export default ShoppingCart
