import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProductIntoWishList, decreaseProductQuantity, removeProductFromWishlist, removeAllProducts } from '../redux/features/wishlist-slice';
import { useNavigate } from 'react-router-dom'

const useWishList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.wish?.wishProducts) ?? []
    const isLogin = useSelector(state=> state.user.isLogin)
    const navigate = useNavigate();

    function addToWishList(p) {
        if (!isLogin) {
            navigate("/auth/sign-up");
            return;
        };
        console.log(p);
        
        if (!p) return;
        dispatch(addProductIntoWishList(p));
    }

    function decreaseProductQuantityInWishList(p) {
        if (!p) return;
        dispatch(decreaseProductQuantity(p));
    }

    function removeFromWishList(p) {
      if (!p) return;
      dispatch(removeProductFromWishlist(p));
  }

  function clearWishlist() {
      dispatch(removeAllProducts());
  }

  function getWishlistCount() {
      return products.reduce((acc, item) => acc+=item.quantity, 0);
  }

  function getWishListProducts() {
      return products;
  }

  function getWishListProductQuantity(id) {
      if (!id) return;
      return products.find(item => item.product_id === id)?.quantity ?? 0;
  }

  function getWishListSingleProduct(id) {
    if (!id) return;
    return products.find(item => item.product_id === id);
}


return {addToWishList, decreaseProductQuantityInWishList, removeFromWishList, clearWishlist, getWishlistCount, getWishListProducts, getWishListProductQuantity, getWishListSingleProduct};
}

export default useWishList
