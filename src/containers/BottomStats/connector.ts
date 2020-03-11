import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { getSelectedFiles } from "@/store/selection/selectors";
import { getFilesWithHiddenOnes } from "@/store/tree/selectors";

const mSp = (state: RootState) => ({
  files: getFilesWithHiddenOnes(state),
  selected: getSelectedFiles(state)
});

const connector = connect(mSp);

export type Props = ConnectedProps<typeof connector>;
export default connector;
