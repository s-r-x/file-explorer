import path from 'path';
import _ from 'lodash';

const baseIcons = {
  default_file: 'default_file',
  default_folder: 'default_folder',
};
type IconsDict = typeof baseIcons;
const root = '/icons';
const ext = '.svg';
const icons: IconsDict = _.reduce(
  baseIcons,
  (acc: any, key: any, value: any) => {
    acc[key] = path.join(root, value + ext);
    return acc;
  },
  {},
);
type GetIconArgs = {
  isDir: boolean;
};
export const getIcon = ({isDir}: GetIconArgs) => {
  if (isDir) {
    return icons.default_folder;
  } else {
    return icons.default_file;
  }
};
