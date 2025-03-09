import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const data = localStorage.getItem("cart");
    const parsedData = data ? JSON.parse(data) : { arr: [], sum: 0, count: 0 };

    parsedData.sum = parseFloat(parsedData.sum) || 0;
    return { ...parsedData, isCartOpen: false };
};

const initialState = loadCartFromLocalStorage();

const saveCartToLocalStorage = (cart) => {
    cart.sum = parseFloat(cart.sum);
    localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        reduce: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index === -1) return;
            if (state.arr[index].qty === 1) {
                state.arr.splice(index, 1);
            } else {
                state.arr[index].qty--;
            }
            state.count -= 1;
            state.sum -= action.payload.price;
            saveCartToLocalStorage(state);
        },
        remove: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index === -1) return;
            state.count -= state.arr[index].qty;
            state.sum -= state.arr[index].price * state.arr[index].qty;
            state.arr.splice(index, 1);
            saveCartToLocalStorage(state);
        },
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index === -1) {
                let copy = { ...action.payload, qty: 1 };
                state.arr.push(copy);
            } else {
                state.arr[index].qty++;
            }
            state.count += 1;
            state.sum = parseFloat(state.sum) || 0;
            state.sum += parseFloat(action.payload.price);
            saveCartToLocalStorage(state);
        },
        updateCartProduct: (state, action) => {
            const { id, updatedData } = action.payload;
            let index = state.arr.findIndex(item => item._id === id);
            if (index !== -1) {
                const oldPrice = state.arr[index].price;
                const oldQty = state.arr[index].qty;
                state.arr[index] = { ...state.arr[index], ...updatedData };
                const newPrice = state.arr[index].price;
                state.sum = parseFloat(state.sum) || 0;
                state.sum += (newPrice - oldPrice) * oldQty;
                saveCartToLocalStorage(state);
            }
        },
        openCart: (state) => {
            state.isCartOpen = true;
        },
        closeCart: (state) => {
            state.isCartOpen = false;
        },
        deledeCart: (state) => {
            state.arr = [];
            state.sum=0;
            state.count=0;
            localStorage.removeItem("cart");
        }
    }
});

export const { remove, reduce, addToCart, updateCartProduct, openCart, closeCart ,deledeCart} = cartSlice.actions;
export default cartSlice.reducer;
