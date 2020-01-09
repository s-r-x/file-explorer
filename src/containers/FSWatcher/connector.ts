import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/store/rootReducer';
import {getCurrentPath} from '@/store/path/selectors';
import {addToList, removeFromList} from '@/store/tree/slice';

const mSp = (state: RootState) => ({
  path: getCurrentPath(state),
});
const mDp = (dispatch: Function) => ({
  addToList: (path: FileExcerpt) => dispatch(addToList(path)),
  removeFromList: (path: string) => dispatch(removeFromList(path)),
});

const connector = connect(
  mSp,
  mDp,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
