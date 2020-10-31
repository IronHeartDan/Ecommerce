import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.cart = action.payload;
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});
export const { addItem, emptyCart } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export default cartSlice.reducer;
