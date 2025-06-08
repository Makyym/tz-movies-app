import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './movies/slice.js';
import { authReducer } from './auth/slice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
    },
});