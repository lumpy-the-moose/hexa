import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  signedIn: boolean;
  searchQuery: string;
  searchActivated: boolean;
  page: number;
  fetchedMovies: Movie[];
  favoriteMovies: [];
  selectedMovie: Movie;
  modalOpened: boolean;
  isFavorite: boolean;
}

const initialState: authState = {
  signedIn: false,
  searchQuery: '',
  searchActivated: false,
  page: 1,
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchActivated: (state, action: PayloadAction<boolean>) => {
      state.searchActivated = action.payload;
    },
    incrementPage: state => {
      state.page += 1;
    },
    resetPage: state => {
      state.page = 0;
    },
    setFetchedMovies: (state, action: PayloadAction<[]>) => {
      state.fetchedMovies = [...state.fetchedMovies, ...action.payload];
    },
    clearFetchedMovies: state => {
      state.fetchedMovies = [];
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
  setSearchQuery,
  setSearchActivated,
  incrementPage,
  resetPage,
  setFetchedMovies,
  clearFetchedMovies,
  setFavoriteMovies,
  setSelectedMovie,
  setModalOpened,
  setIsFavorite,
} = hexaSlice.actions;

export default hexaSlice.reducer;
