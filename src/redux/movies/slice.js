import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, deleteMovie, addMovie, importMovies, fetchMovieById } from "./operations.js";

const initialState = {
    movies: [],
    loading: false,
    error: null,
    movie: {},
    total: 0,
};

const handlePending = state => {
    state.loading = true;
};

const handleRejected = (state, { payload }) => {
    state.loading = false;
    state.error = payload;
}

const slice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearMovies: (state) => {
        state.movies = [];
        state.total = 0;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.pending, handlePending)
        .addCase(fetchMovies.rejected, handleRejected)
        .addCase(fetchMovies.fulfilled, (state, {payload}) => {
            state.movies.push(...payload.data);
            state.total = payload.meta.total;
            state.movies = state.movies.filter((movie, i, self) =>
                i === self.findIndex(m => m.id === movie.id)
            );
            state.loading = false;
        })
        .addCase(fetchMovieById.pending, handlePending)
        .addCase(fetchMovieById.rejected, handleRejected)
        .addCase(fetchMovieById.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.movie = payload;
        })
        .addCase(deleteMovie.pending, handlePending)
        .addCase(deleteMovie.rejected, handleRejected)
        .addCase(deleteMovie.fulfilled, (state, {payload}) => {
            state.loading = false;
            if (payload.status === 1 ) {
                state.movies = state.movies.filter(item => item.id !== payload.id);
                state.total -= 1;
            }
        })
        .addCase(addMovie.pending, handlePending)
        .addCase(addMovie.rejected, handleRejected)
        .addCase(addMovie.fulfilled, (state, {payload}) => {
            state.movies.push(payload.data);
            state.movie = payload.data;
            state.loading = false;
            state.total += 1;
        })
        .addCase(importMovies.pending, handlePending)
        .addCase(importMovies.rejected, handleRejected)
        .addCase(importMovies.fulfilled, (state, { payload }) => {
            const allMovies = [...state.movies, ...payload.data];
            state.movies = allMovies.filter((movie, i, self) =>
                i === self.findIndex(m => m.id === movie.id)
            );
            state.loading = false;
        })
    },
});

export const { clearMovies } = slice.actions;
export const moviesReducer = slice.reducer;