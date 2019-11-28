import path from 'path';
import fs from 'fs-extra';

// fs
export const getParentDir = (_path: string): string => {
  return path.resolve(_path, '..');
};
export const readdir = async (baseDir: string) => {
  const dirs = await fs.readdir(baseDir);
  return dirs.map(dir => path.join(baseDir, dir));
};
