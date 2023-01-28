import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  signedIn: boolean;
  fetchedMovies: Movie[];
  favoriteMovies: [];
  selectedMovie: Movie;
  modalOpened: boolean;
  isFavorite: boolean;
}

const initialState: authState = {
  signedIn: false,
  fetchedMovies: [],
  favoriteMovies: [],
  selectedMovie: {
    poster_path: '',
    title: '',
    release_date: '',
    overview: '',
    id: -1,
  },
  modalOpened: false,
  isFavorite: false,
};

export const hexaSlice = createSlice({
  name: 'hexa',
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
    },
    setFetchedMovies: (state, action: PayloadAction<[]>) => {
      state.fetchedMovies = [...state.fetchedMovies, ...action.payload];
    },
    setFavoriteMovies: (state, action: PayloadAction<[]>) => {
      state.favoriteMovies = [...action.payload];
    },
    setSelectedMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovie = { ...action.payload };
    },
    setModalOpened: (state, action: PayloadAction<boolean>) => {
      state.modalOpened = action.payload;
    },
    setIsFavorite: (state, action: PayloadAction<boolean>) => {
      state.isFavorite = action.payload;
    },
  },
});

export const {
  setSignedIn,
  setFetchedMovies,
  setFavoriteMovies,
  setSelectedMovie,
  setModalOpened,
  setIsFavorite,
} = hexaSlice.actions;

export default hexaSlice.reducer;
