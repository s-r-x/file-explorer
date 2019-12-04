import {shell} from 'electron';
//import {exec} from 'child_process';

export const openFile = (filePath: string) => {
  const res = shell.openItem(filePath);
  console.log(res);
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
