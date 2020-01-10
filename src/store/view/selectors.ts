import {RootState} from '@/store/rootReducer';

export const getSortType = (state: RootState) => state.view.sortType;
export const getSortBy = (state: RootState) => state.view.sortBy;
export const getViewMode = (state: RootState) => state.view.mode;
export const getShowHidden = (state: RootState) => state.view.hidden;
export const getZoom = (state: RootState) => state.view.zoom;
