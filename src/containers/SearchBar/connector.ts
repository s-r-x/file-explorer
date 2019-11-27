import {connect, ConnectedProps} from 'react-redux';
import {
  canGoForward,
  canGoBack,
  canGoParent,
  getCurrentPath,
} from '@/store/path/selectors';
import {RootState} from '@/store/rootReducer';

const mSp = (state: RootState) => ({
  canGoForward: canGoForward(state),
  canGoBack: canGoBack(state),
  canGoParent: canGoParent(state),
  path: getCurrentPath(state),
});
//const mDp = (dispatch: Function) => ({});

const connector = connect(
  mSp,
  null,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
