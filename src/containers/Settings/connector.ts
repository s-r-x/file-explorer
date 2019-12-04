import {connect, ConnectedProps} from 'react-redux';
import {
  getSortBy,
  getSortType,
  getShowHidden,
  getViewMode,
  getZoom,
} from '@/store/view/selectors';
import {
  changeShowHidden,
  changeSortBy,
  changeSortType,
  changeViewMode,
  incZoom,
  decZoom,
  resetZoom,
} from '@/store/view/slice';
import {SortBy, SortType, Mode} from '@/store/view/types';
import {RootState} from '@/store/rootReducer';

const mSp = (state: RootState) => ({
  mode: getViewMode(state),
  hidden: getShowHidden(state),
  sortBy: getSortBy(state),
  sortType: getSortType(state),
  zoom: getZoom(state),
});
const mDp = (dispatch: Function) => ({
  changeShowHidden: (hidden: boolean) => dispatch(changeShowHidden(hidden)),
  changeSortType: (type: SortType) => dispatch(changeSortType(type)),
  changeSortBy: (field: SortBy) => dispatch(changeSortBy(field)),
  changeViewMode: (mode: Mode) => dispatch(changeViewMode(mode)),
  incZoom: () => dispatch(incZoom()),
  decZoom: () => dispatch(decZoom()),
  resetZoom: () => dispatch(resetZoom()),
});

const connector = connect(
  mSp,
  mDp,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
