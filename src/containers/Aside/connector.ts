import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { getPlatformFolders } from "@/store/platformFolders/selectors";
import { getCurrentPath } from "@/store/path/selectors";
import { goTo } from "@/store/path/slice";

const mSp = (state: RootState) => ({
  platformFolders: getPlatformFolders(state),
  currentPath: getCurrentPath(state)
});
const mDp = {
  goTo
};
const connector = connect(mSp, mDp);
export type Props = ConnectedProps<typeof connector>;
export default connector;
