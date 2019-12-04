import {connect, ConnectedProps} from 'react-redux';
import {getFilesList} from '@/store/tree/selectors';
import {RootState} from '@/store/rootReducer';
import {getViewMode, getZoom} from '@/store/view/selectors';
import {getSelectedFiles} from '@/store/selection/selectors';
import {
  clearSelection,
  addToSelection,
  removeFromSelection,
} from '@/store/selection/slice';
import {goTo} from '@/store/path/slice';

const mSp = (state: RootState) => ({
  list: getFilesList(state),
  mode: getViewMode(state),
  zoom: getZoom(state),
  selected: getSelectedFiles(state),
});
const mDp = (dispatch: Function) => ({
  goTo: (path: string) => dispatch(goTo(path)),
  clearSelection: () => dispatch(clearSelection()),
  addToSelection: (path: string) => dispatch(addToSelection(path)),
  removeFromSelection: (path: string) => dispatch(removeFromSelection(path)),
});

const connector = connect(
  mSp,
  mDp,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
