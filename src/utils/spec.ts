import {getParentDir} from './';
describe('utils', () => {
  test('getParentDirectory', () => {
    const dirs = [['/home/petya/file.txt', '/home/petya'], ['/', '/']];
    dirs.forEach(dir => {
      expect(getParentDir(dir[0])).toBe(dir[1]);
    });
  });
});
