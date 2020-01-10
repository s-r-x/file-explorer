import {
  take,
  put,
  fork,
  cancel,
  select,
  cancelled,
  call,
  takeEvery,
  all,
} from 'redux-saga/effects';
import {DOMAIN as TREE_DOMAIN, updateList} from './slice';
import {CHANGE_PATH_ACTIONS} from '../constants';
import {getCurrentPath} from '../path/selectors';
import {spawnWorker} from '@/utils/workers';
import {PayloadAction} from '@reduxjs/toolkit';
import {getSelectedFiles} from '../selection/selectors';
import {removeFile, moveToTrash} from '@/utils/fs';

const WATCH_ACTIONS = [...CHANGE_PATH_ACTIONS, `${TREE_DOMAIN}/refresh`];

function* updateTreeSaga() {
  const currentPath = yield select(getCurrentPath);
  let worker;
  try {
    worker = spawnWorker('readdir', [currentPath]);
    const list: FileExcerpt[] = yield call(worker.waitForMessage);
    yield put(updateList(list));
  } catch (e) {
    // TODO
    console.error(e);
  } finally {
    if (yield cancelled()) {
      worker.kill();
    }
  }
}

function* watchUpdateTreeSaga() {
  let task;
  while (true) {
    yield take(WATCH_ACTIONS);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(updateTreeSaga);
  }
}
function* removeFileSaga(action: PayloadAction<boolean>) {
  const {payload: permanent} = action;
  const selectedO = yield select(getSelectedFiles);
  const selected = Object.keys(selectedO);
  yield all(
    selected.map(async filePath => {
      if (permanent) {
        // TODO
      } else {
        moveToTrash(filePath);
      }
    }),
  );
}
function* watchRemoveFileSaga() {
  yield takeEvery(`${TREE_DOMAIN}/remove`, removeFileSaga);
}

export default function*() {
  yield all([watchUpdateTreeSaga(), watchRemoveFileSaga()]);
}
