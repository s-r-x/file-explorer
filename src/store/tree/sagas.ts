import {
  take,
  put,
  fork,
  cancel,
  select,
  cancelled,
  call,
} from 'redux-saga/effects';
import {DOMAIN as PATH_DOMAIN} from '../path/slice';
import {DOMAIN as TREE_DOMAIN, updateList} from './slice';
import {getCurrentPath} from '../path/selectors';
import {spawnWorker} from '@/utils/workers';

const WATCH_ACTIONS = [
  `${PATH_DOMAIN}/goTo`,
  `${PATH_DOMAIN}/goForward`,
  `${PATH_DOMAIN}/goBack`,
  `${PATH_DOMAIN}/goHome`,
  `${PATH_DOMAIN}/goParent`,
  `${TREE_DOMAIN}/refresh`,
];

function* updateTreeSaga() {
  const currentPath = yield select(getCurrentPath);
  let worker;
  try {
    worker = spawnWorker('readdir', [currentPath]);
    const list: FileExcerpt[] = yield call(worker.waitForMessage);
    yield put(updateList(list));
  } catch (e) {
    console.error(e);
  } finally {
    if (yield cancelled()) {
      worker.kill();
    }
  }
}
export default function*() {
  let task;
  while (true) {
    yield take(WATCH_ACTIONS);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(updateTreeSaga);
  }
}
