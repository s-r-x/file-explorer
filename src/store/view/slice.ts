import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Mode, SortBy, SortType} from './types';

const DOMAIN = 'view';

const counterSlice = createSlice({
  name: DOMAIN,
  initialState: {
    hidden: false,
    mode: 'icons',
    sortBy: 'name',
    sortType: 'ASC',
  },
  reducers: {
    changeViewMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
    changeShowHidden(state, action: PayloadAction<boolean>) {
      state.hidden = action.payload;
    },
    changeSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
    changeSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
  },
});

export const {
  changeViewMode,
  changeShowHidden,
  changeSortType,
  changeSortBy,
} = counterSlice.actions;

export default counterSlice.reducer;
