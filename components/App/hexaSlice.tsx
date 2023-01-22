import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  fetchedMovies: any[];
}

const initialState: authState = {
  fetchedMovies: [],
};

export const hexaSlice = createSlice({
  name: 'hexa',
  initialState,
  reducers: {
    updateFetchedMovies: (state, action: PayloadAction<[]>) => {
      state.fetchedMovies = [...action.payload];
    },
  },
});

export const { updateFetchedMovies } = hexaSlice.actions;

export default hexaSlice.reducer;
