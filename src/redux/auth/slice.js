import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./operations.js";

const token = localStorage.getItem("jwtToken") || null;
const initialState = {
    token,
    isLoggedIn: token ? true : false,
    error: null,
    loading: false,
};

const handlePending = state => {
    state.loading = true;
};

const handleRejected = (state, { payload }) => {
    state.loading = false;
    state.error = payload;
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("jwtToken");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, handlePending)
        .addCase(registerUser.rejected, handleRejected)
        .addCase(registerUser.fulfilled, (state, {payload}) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.token = payload;
        })
        .addCase(loginUser.pending, handlePending)
        .addCase(loginUser.rejected, handleRejected)
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.token = payload;
        })
    },
});

export const { logout } = slice.actions;
export const authReducer = slice.reducer;