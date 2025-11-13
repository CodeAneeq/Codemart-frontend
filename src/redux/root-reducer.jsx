import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './features/user-slice'
import cartReducer from './features/cart-slice'
import wishReducer from './features/wishlist-slice'

const rootReducer = combineReducers({
    user: userReducer,
    wish: wishReducer,
    cart: cartReducer
})

export default rootReducer