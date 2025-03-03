import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice.js"
import cartSlice from "../features/cartSlice.js"
import userSlice from "../features/userSlice.js"

export const store = configureStore({
   reducer: {
      product: productSlice,
      cart: cartSlice,
      user: userSlice,
   }

})