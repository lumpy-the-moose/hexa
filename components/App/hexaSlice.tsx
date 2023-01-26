import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  signedIn: boolean;
  fetchedMovies: any[];
  favoriteMovies: [];
  selectedMovie: Movie;
  modalOpened: boolean;
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
};

export const hexaSlice = createSlice({
  name: 'hexa',
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
    },
    setFetchedMovies: (state, action: PayloadAction<[]>) => {
      state.fetchedMovies = [...action.payload];
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
  },
});

export const {
  setSignedIn,
  setFetchedMovies,
  setFavoriteMovies,
  setSelectedMovie,
  setModalOpened,
} = hexaSlice.actions;

export default hexaSlice.reducer;
