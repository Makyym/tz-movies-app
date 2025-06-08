import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../movies/operations.js";

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
        config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (body, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/users`, body);
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            return token;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (body, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/sessions`, body);
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            return token;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);
