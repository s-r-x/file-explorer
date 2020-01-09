import {shell} from 'electron';
import fs from 'fs-extra';

export const openFile = (filePath: string) => {
  shell.openItem(filePath);
};

export const removeFile = (file: string) => {
  return fs.remove(file);
};
export const moveToTrash = (file: string) => {
  shell.moveItemToTrash(file);
};
