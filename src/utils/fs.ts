import { shell, remote } from "electron";
import fs from "fs-extra";
import path from "path";

export const openFile = (filePath: string) => {
  shell.openItem(filePath);
};

export const removeFile = (file: string) => {
  return fs.remove(file);
};
export const moveToTrash = (file: string) => {
  shell.moveItemToTrash(file);
};
export const getFileStats = async (filePath: string) => {
  const stats = await fs.stat(filePath);
  return {
    path: filePath,
    isDir: stats.isDirectory(),
    isFile: stats.isFile(),
    size: stats.size,
    modified: stats.mtimeMs,
    created: stats.birthtimeMs,
    base: path.basename(filePath)
  };
};
export const copyFile = (src: string, dst: string, overwrite = true) =>
  fs.copy(src, dst, { overwrite });
export const moveFile = (src: string, dst: string, overwrite = true) =>
  fs.move(src, dst, { overwrite });
export const renameFile = (src: string, dst: string) => fs.rename(src, dst);
export const createDir = (dir: string) => fs.ensureDir(dir);

export const getUserFolder = (
  type: "home" | "videos" | "music" | "desktop" | "pictures" | "downloads"
) => remote.app.getPath(type);
