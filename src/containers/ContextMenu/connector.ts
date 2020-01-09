import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/store/rootReducer';
import {getSelectedFilesExcerpt} from '@/store/selection/selectors';
import {goTo} from '@/store/path/slice';

const mSp = (state: RootState) => ({selected: getSelectedFilesExcerpt(state)});
const mDp = (dispatch: Function) => ({
  goTo: (path: string) => dispatch(goTo(path)),
});

const connector = connect(mSp, mDp);

export type Props = ConnectedProps<typeof connector>;
export default connector;
