import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}
const userSlice = createSlice({
    name: "userNameForDebug",
    initialState,
    reducers: {

        userIn: (state, action) => {
            state.currentUser = action.payload;
        },
        userOut: (state) => {
            state.currentUser = null
        }

    }
})
export const {userIn, userOut} = userSlice.actions;
export default userSlice.reducer;

