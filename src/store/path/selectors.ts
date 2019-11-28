import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@/store/rootReducer';
import {getParentDir} from '@/utils';

export const getPathIndex = (state: RootState) => state.path.current;
export const getPathHistory = (state: RootState) => state.path.history;
export const canGoBack = createSelector(
  [getPathIndex],
  index => index > 0,
);
export const canGoForward = createSelector(
  [getPathIndex, getPathHistory],
  (index, history) => history[index + 1] !== undefined,
);
export const getCurrentPath = createSelector(
  [getPathIndex, getPathHistory],
  (index, history) => history[index],
);
export const canGoParent = createSelector(
  [getCurrentPath],
  currentPath => {
    return getParentDir(currentPath) !== currentPath;
  },
);
