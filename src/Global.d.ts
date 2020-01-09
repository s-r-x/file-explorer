declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare type FileExcerpt = {
  path: string;
  created: number;
  modified: number;
  isFile: boolean;
  isDir: boolean;
  size: number;
  base: string;
};

declare type NumbersDict = {[key: string]: number};
