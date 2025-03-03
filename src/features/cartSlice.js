import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const data = localStorage.getItem("cart");
    const parsedData = data ? JSON.parse(data) : { arr: [], sum: 0, count: 0 };
    return { ...parsedData, isCartOpen: false }; 
};


const initialState = loadCartFromLocalStorage();

const saveCartToLocalStorage = (cart) => {
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
            console.log(JSON.parse(JSON.stringify(state.arr)));;

        },
        remove: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index === -1) return;
            state.count -= state.arr[index].qty;
            state.sum -= state.arr[index].price * state.arr[index].qty;
            state.arr.splice(index, 1);
            saveCartToLocalStorage(state); 
            console.log(JSON.parse(JSON.stringify(state.arr)));;

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
            state.sum += action.payload.price;
            saveCartToLocalStorage(state); 
            console.log(JSON.parse(JSON.stringify(state.arr)));;

        },
        openCart: (state) => {
            state.isCartOpen = true;
        },
        closeCart: (state) => {
            state.isCartOpen = false;
        }
    }
});

export const { remove, reduce, addToCart,openCart, closeCart} = cartSlice.actions;
export default cartSlice.reducer;