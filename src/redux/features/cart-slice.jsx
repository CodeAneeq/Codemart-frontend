import { createSlice } from "@reduxjs/toolkit";

// quantiy, product id, products dat

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductIntoCart: (state, action) => {
      const productExists = state.products.find(
        item => item.product_id === action.payload.id
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
        (item) => item.product_id === action.payload.id
      );
      if (productExists) {
        if (productExists.quantity > 1) {
            productExists.quantity--;
        } else {
            state.products = state.products.filter(
              item => item.product_id !== action.payload.id
            );
        }
      }
    },
    removeProductFromCart: (state, action) => {
        state.products = state.products.filter(
            item => item.product_id !== action.payload.id
          );
    },
    removeAllProducts: (state, action) => {
        state.products = [];
    },
  },
});

export const {addProductIntoCart, decreaseProductQuantity, removeProductFromCart, removeAllProducts} = cartSlice.actions
export default cartSlice.reducer;