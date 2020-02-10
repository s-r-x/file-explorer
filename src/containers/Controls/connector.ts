import {connect, ConnectedProps} from 'react-redux';
import {getFilesList} from '@/store/tree/selectors';
import {RootState} from '@/store/rootReducer';
import {getSelectedFiles} from '@/store/selection/selectors';
import {
  clearSelection,
  addToSelection,
  removeFromSelection,
  replaceSelection,
  moveSelectionRight,
  moveSelectionLeft,
  moveSelectionTop,
  moveSelectionBottom,
} from '@/store/selection/slice';
import {removeFiles} from '@/store/tree/slice';
import {goTo} from '@/store/path/slice';

const mSp = (state: RootState) => ({
  list: getFilesList(state),
  selected: getSelectedFiles(state),
});
const mDp = (dispatch: Function) => ({
  goTo: (path: string) => dispatch(goTo(path)),
  clearSelection: () => dispatch(clearSelection()),
  addToSelection: (path: string) => dispatch(addToSelection(path)),
  removeFromSelection: (path: string) => dispatch(removeFromSelection(path)),
  replaceSelection: (path: string) => dispatch(replaceSelection(path)),
  removeFiles: (permanent: boolean) => dispatch(removeFiles(permanent)),
  moveSelectionRight: () => dispatch(moveSelectionRight()),
  moveSelectionLeft: () => dispatch(moveSelectionLeft()),
  moveSelectionTop: () => dispatch(moveSelectionTop()),
  moveSelectionBottom: () => dispatch(moveSelectionBottom()),
});

const connector = connect(
  mSp,
  mDp,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
