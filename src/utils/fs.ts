import {shell} from 'electron';
//import {exec} from 'child_process';

export const openFile = (filePath: string) => {
  shell.openItem(filePath);
};

//function getCommandLine() {
//  switch (process.platform) {
//    case 'darwin':
//      return 'open';
//    case 'win32':
//      return 'start';
//    default:
//      return 'xdg-open';
//  }
//}
//export const openFile = (filePath: string) => {
//  const cmd = getCommandLine();
//  exec(cmd + ' ' + filePath);
//};
