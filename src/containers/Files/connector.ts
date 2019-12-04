import {connect, ConnectedProps} from 'react-redux';
import {getFilesList} from '@/store/tree/selectors';
import {RootState} from '@/store/rootReducer';
import {getViewMode, getZoom} from '@/store/view/selectors';

const mSp = (state: RootState) => ({
  list: getFilesList(state),
  mode: getViewMode(state),
  zoom: getZoom(state),
});

const connector = connect(
  mSp,
  null,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
