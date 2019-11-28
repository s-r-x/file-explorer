import {connect, ConnectedProps} from 'react-redux';
import {
  canGoForward,
  canGoBack,
  canGoParent,
  getCurrentPath,
} from '@/store/path/selectors';
import {goTo, goHome, goForward, goBack, goParent} from '@/store/path/slice';
import {RootState} from '@/store/rootReducer';
import {
  getInputValue,
  getInputFocused,
  getInputAutocomplete,
} from '@/store/input/selectors';
import {
  updateInput,
  updateAutocomplete,
  updateFocus,
} from '@/store/input/slice';

const mSp = (state: RootState) => ({
  canGoForward: canGoForward(state),
  canGoBack: canGoBack(state),
  canGoParent: canGoParent(state),
  path: getCurrentPath(state),
  autocomplete: getInputAutocomplete(state),
  input: getInputValue(state),
  focused: getInputFocused(state),
});
const mDp = (dispatch: Function) => ({
  goTo: (path: string) => dispatch(goTo(path)),
  goHome: () => dispatch(goHome()),
  goForward: () => dispatch(goForward()),
  goBack: () => dispatch(goBack()),
  goParent: () => dispatch(goParent()),
  updateInput: (input: string) => dispatch(updateInput(input)),
  updateAutocomplete: (payload: []) => dispatch(updateAutocomplete(payload)),
  updateFocus: (payload: boolean) => dispatch(updateFocus(payload)),
});

const connector = connect(
  mSp,
  mDp,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
