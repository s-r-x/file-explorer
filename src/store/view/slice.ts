import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Mode, SortBy, SortType, State} from './types';

const DOMAIN = 'view';

const counterSlice = createSlice({
  name: DOMAIN,
  initialState: {
    hidden: false,
    mode: 'icons',
    sortBy: 'base',
    sortType: 'asc',
    zoom: 1,
  } as State,
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
    decZoom(state) {
      state.zoom = Math.max(1, state.zoom - 1);
    },
    incZoom(state) {
      state.zoom = Math.min(3, state.zoom + 1);
    },
    resetZoom(state) {
      state.zoom = 1;
    },
  },
});

export const {
  changeViewMode,
  changeShowHidden,
  changeSortType,
  changeSortBy,
  incZoom,
  decZoom,
  resetZoom,
} = counterSlice.actions;

export default counterSlice.reducer;
