import React from 'react'
import PageLayout from '../../components/layouts/page-layout'
import useWishList from '../../hooks/use-wishlist';
import { CartProduct } from '../checkout/cart-product';
import styles from "./wishlist.module.scss"
import useShoppingCart from '../../hooks/use-shopping-cart';

const WishListProducts = () => {
      const { addToWishList, decreaseProductQuantityInWishList, removeFromWishList, getWishListProducts } = useWishList();
      const { addToCart } = useShoppingCart(); 

  const wishlist_products = getWishListProducts()
  console.log(wishlist_products);
  

  return (
    <PageLayout>
        <div className={`container my-5 py-5`}>
        <table class={`${styles.table_container} table align-middle table-borderless`}>
          <thead>
            <tr>
              <td scope="col">Product</td>
              <td scope="col">Price</td>
              <td scope="col">Action</td>
            </tr>
          </thead>
          <br />
          <tbody>
            {wishlist_products && wishlist_products.length > 0 && wishlist_products.map(item => <CartProduct key={item.product_id} data={item} addToCart={addToWishList} decreaseProductQuantityInCart={decreaseProductQuantityInWishList} removeFromCart={removeFromWishList} addToCart2={addToCart} quantityCell={"d-none"} totalCell={"d-none"}></CartProduct>)}
          </tbody>
        </table>
</div>
    </PageLayout>
  )
}

export default WishListProducts