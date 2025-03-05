import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arr: [],
}
const productSlice = createSlice({
    name: "productNameForDebug",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.arr = action.payload; // שמירת רשימת המוצרים
        },

        removeProduct: (state, action) => {
            state.arr = state.arr.filter(product => product._id !== action.payload);
        }

    }
})

export const {removeProduct ,setProducts} = productSlice.actions;
export default productSlice.reducer;