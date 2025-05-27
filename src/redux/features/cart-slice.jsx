import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductIntoCart: (state, action) => {
      const productExists = state.products.find(
        item => item.product._id === action.payload._id
      );
      if (productExists) {
        productExists.quantity++;
      } else {
        state.products.push({
          quantity: 1,
          product_id: action.payload.id, 
          product: action.payload,
        });
      }
    },
    decreaseProductQuantity: (state, action) => {
      const productExists = state.products.find(
        (item) => item.product._id === action.payload._id
      );
      if (productExists) {
        if (productExists.quantity > 1) {
            productExists.quantity--;
        } else {
            state.products = state.products.filter(
              item => item.product._id !== action.payload.id
            );
        }
      }
    },
    removeProductFromCart: (state, action) => {
        state.products = state.products.filter(
            item => item.product._id !== action.payload._id
          );
    },
    removeAllProducts: (state) => {
        state.products = [];
    },
  },
});

// Selectors
export const getCartProducts = (state) => state.cart.products;

export const getCartTotalQuantity = (state) => 
  state.cart.products.reduce((total, item) => total + item.quantity, 0);

export const getCartTotalPrice = (state) =>
  state.cart.products.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

export const getProductQuantity = (state, productId) => {
  const product = state.cart.products.find(
    item => item.product_id === productId
  );
  return product ? product.quantity : 0;
};

export const getCartItemCount = (state) => state.cart.products.length;

export const getCartProductDetails = (state) => 
  state.cart.products.map(item => ({
    product: item.product,
    quantity: item.quantity,
    totalPrice: item.product.price * item.quantity
  }));

export const {
  addProductIntoCart,
  decreaseProductQuantity,
  removeProductFromCart,
  removeAllProducts
} = cartSlice.actions;

export default cartSlice.reducer;