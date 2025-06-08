import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const API_URL = process.env.API_URL;

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (body, thunkAPI) => {
        try {
            if (body.searchValue) {
                const response = await axios.get(`${API_URL}/movies?sort=title&order=ASC&limit=10&search=${body.searchValue}&offset=${body.offset}`);
                return response.data;
            }
            const response = await axios.get(`${API_URL}/movies?sort=title&order=ASC&limit=10&offset=${body.offset}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchMovieById = createAsyncThunk(
    'movies/fetchMovieById',
    async (body, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/movies/${body}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addMovie = createAsyncThunk(
    'movies/addMovie',
    async (body, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/movies`, body);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteMovie = createAsyncThunk(
    'movies/deleteMovie',
    async (body, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/movies/${body}`);
            response.data.id = body;
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const importMovies = createAsyncThunk(
    "movies/importMovies",
    async (body, thunkAPI) => {
        try {
        const formData = new FormData();
        const blob = new Blob([body], { type: "text/plain" });
        formData.append("movies", blob, "sample_movies.txt");
        const response = await axios.post(`${API_URL}/movies/import`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
        } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);