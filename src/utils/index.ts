import path from 'path';
export const getParentDir = (_path: string): string => {
  return path.resolve(_path, '..');
};
