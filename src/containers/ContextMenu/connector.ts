import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/store/rootReducer';
import {getSelectedFilesExcerpt} from '@/store/selection/selectors';
import {goTo} from '@/store/path/slice';
import {copy, cut, paste} from '@/store/fileBuffer/slice';
import {isFileBufferEmpty} from '@/store/fileBuffer/selectors';
import {getCurrentPath} from '@/store/path/selectors';
import {removeFiles, renameFile} from '@/store/tree/slice';

const mSp = (state: RootState) => ({
  selected: getSelectedFilesExcerpt(state),
  isBufferEmpty: isFileBufferEmpty(state),
  currentPath: getCurrentPath(state),
});
const mDp = (dispatch: Function) => ({
  goTo: (path: string) => dispatch(goTo(path)),
  copy: () => dispatch(copy()),
  cut: () => dispatch(cut()),
  paste: (dest: string) => dispatch(paste(dest)),
  removeFiles: (permanent: boolean) => dispatch(removeFiles(permanent)),
  renameFile: () => dispatch(renameFile()),
});

const connector = connect(
  mSp,
  mDp,
);

export type Props = ConnectedProps<typeof connector>;
export default connector;
