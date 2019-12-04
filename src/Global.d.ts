declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare type FileExcerpt = {
  path: string;
  created: string;
  modified: string;
  isFile: boolean;
  isDir: boolean;
  size: number;
};
