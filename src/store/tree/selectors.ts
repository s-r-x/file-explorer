import {RootState} from '@/store/rootReducer';
import {createSelector} from '@reduxjs/toolkit';
import {getShowHidden, getSortBy, getSortType} from '../view/selectors';
import _ from 'lodash';

export const getRawFilesList = (state: RootState) => state.tree.list;
export const getFilesWithHiddenOnes = createSelector(
  [getRawFilesList, getShowHidden],
  (files, showHidden) => {
    if (showHidden) return files;
    return files.filter(({base}) => base[0] !== '.');
  },
);
export const getFilesList = createSelector(
  [getFilesWithHiddenOnes, getSortBy, getSortType],
  (files, sortBy, sortType) => {
    return _.orderBy(files, sortBy, sortType);
  },
);
