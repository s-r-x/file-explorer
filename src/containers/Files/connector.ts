import {connect, ConnectedProps} from 'react-redux';
import {getFilesList} from '@/store/tree/selectors';
import {RootState} from '@/store/rootReducer';
import {getViewMode, getZoom} from '@/store/view/selectors';
import {getSelectedFiles} from '@/store/selection/selectors';

const mSp = (state: RootState) => ({
  list: getFilesList(state),
  mode: getViewMode(state),
  zoom: getZoom(state),
  selected: getSelectedFiles(state),
});

const connector = connect(mSp);

export type Props = ConnectedProps<typeof connector>;
export default connector;
