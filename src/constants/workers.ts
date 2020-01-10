import path from 'path';
import electron from 'electron';

export const WORKERS_PATH = path.join(
  electron.remote.app.getAppPath(),
  'workers',
);

export const workers = ['readdir'].reduce(
  (acc, file) => {
    acc[file] = path.join(WORKERS_PATH, `${file}.js`);
    return acc;
  },
  {} as any,
);
