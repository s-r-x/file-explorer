import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/store/rootReducer';
import {getCurrentPath} from '@/store/path/selectors';
import { getSelectedFiles } from '@/store/selection/selectors';
import { removeFromSelection } from '@/store/selection/slice';
import {addToList, removeFromList} from '@/store/tree/slice';

const mSp = (state: RootState) => ({
  path: getCurrentPath(state),
  selected: getSelectedFiles(state),
});
const mDp = {
  addToList,
  removeFromList,
  removeFromSelection,
};

const connector = connect(
  mSp,
  mDp,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
