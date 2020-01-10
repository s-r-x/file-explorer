import {workers} from '@/constants/workers';
import cp from 'child_process';
import {ChildProcess as BaseChildProcess} from 'child_process';

type ChildProcess = BaseChildProcess & {
  waitForMessage(): Promise<any>;
};
export const spawnWorker = (name: string, args: string[] = []) => {
  let child = cp.fork(workers[name], args, {
    silent: true,
    detached: true,
    stdio: 'ignore',
  }) as ChildProcess;
  child.waitForMessage = () =>
    new Promise(res => {
      child.on('message', res);
    });
  child.on('exit', () => (child = undefined));
  child.unref();
  return child;
};
