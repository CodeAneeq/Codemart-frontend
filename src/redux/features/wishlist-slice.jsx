import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishProducts: [],
};

const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProductIntoWishList: (state, action) => {
      const productExists = state.wishProducts.find(
        item => item.product._id === action.payload._id
      );
      if (productExists) {
        productExists.quantity++;
      } else {
        state.wishProducts.push({
          quantity: 1,
          product_id: action.payload.id, 
          product: action.payload,
        });
      }
    },
    decreaseProductQuantity: (state, action) => {
      const productExists = state.wishProducts.find(
        (item) => item.product._id === action.payload._id
      );
      if (productExists) {
        if (productExists.quantity > 1) {
            productExists.quantity--;
        } else {
            state.wishProducts = state.wishProducts.filter(
              item => item.product._id !== action.payload.id
            );
        }
      }
    },
    removeProductFromWishlist: (state, action) => {
        state.wishProducts = state.wishProducts.filter(
            item => item.product._id !== action.payload._id
          );
    },
    removeAllProducts: (state) => {
        state.products = [];
    },
  },
});

// Selectors
export const getWishListProducts = (state) => state.wishlist.wishProducts;

export const getWishListTotalQuantity = (state) => 
  state.wishlist.wishProducts.reduce((total, item) => total + item.quantity, 0);

export const getWishListTotalPrice = (state) =>
  state.wishlist.wishProducts.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

export const getProductQuantity = (state, productId) => {
  const product = state.wishlist.wishProducts.find(
    item => item.product_id === productId
  );
  return product ? product.quantity : 0;
};

export const getWishItemCount = (state) => state.wishlist.wishProducts.length;

export const getWishListProductDetails = (state) => 
  state.wishlist.wishProducts.map(item => ({
    product: item.product,
    quantity: item.quantity,
    totalPrice: item.product.price * item.quantity
  }));

export const {
  addProductIntoWishList,
  decreaseProductQuantity,
  removeProductFromWishlist,
  removeAllProducts
} = wishSlice.actions;

export default wishSlice.reducer;