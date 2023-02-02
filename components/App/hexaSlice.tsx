import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  signedIn: boolean;
  searchQuery: string;
  page: number;
  isLoading: boolean;
  hasMore: boolean;
  fetchedMovies: Movie[];
  favoriteMovies: [];
  selectedMovie: Movie;
  modalOpened: boolean;
  isFavorite: boolean;
}

const initialState: authState = {
  signedIn: false,
  searchQuery: '',
  page: 1,
  isLoading: false,
  hasMore: false,
  fetchedMovies: [],
  favoriteMovies: [],
  selectedMovie: {
    poster_path: '',
    title: '',
    release_date: '',
    overview: '',
    id: 0,
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
    incrementPage: state => {
      state.page += 1;
    },
    resetPage: state => {
      state.page = 1;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
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
  incrementPage,
  resetPage,
  setIsLoading,
  setHasMore,
  setFetchedMovies,
  clearFetchedMovies,
  setFavoriteMovies,
  setSelectedMovie,
  setModalOpened,
  setIsFavorite,
} = hexaSlice.actions;

export default hexaSlice.reducer;
