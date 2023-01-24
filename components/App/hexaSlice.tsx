import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  signedIn: boolean;
  fetchedMovies: any[];
  selectedMovie: number | null;
}

const initialState: authState = {
  signedIn: false,
  fetchedMovies: [],
  selectedMovie: null,
};

export const hexaSlice = createSlice({
  name: 'hexa',
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
    },
    updateFetchedMovies: (state, action: PayloadAction<[]>) => {
      state.fetchedMovies = [...action.payload];
    },
    updateSelectedMovie: (state, action: PayloadAction<number | null>) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setSignedIn, updateFetchedMovies, updateSelectedMovie } =
  hexaSlice.actions;

export default hexaSlice.reducer;
