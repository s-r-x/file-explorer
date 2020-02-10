import {take, put, all, takeLatest, select} from 'redux-saga/effects';
import {CHANGE_PATH_ACTIONS as WATCH_ACTIONS} from '../constants';
import {clearSelection, replaceSelection, DOMAIN} from './slice';
import {getFirstSelectedFile} from './selectors';
import {getFilesList} from '../tree/selectors';
import {getViewMode, getZoom} from '../view/selectors';

import {getFilesViewSize, getGridItemSize} from '@/utils/view';

// left
function* moveSelectionLeftSaga() {
  const state = yield select();
  const [selected, list] = [getFirstSelectedFile(state), getFilesList(state)];
  const index = list.findIndex(({path}) => path === selected);
  const newSelected = list[index - 1];
  if (newSelected) {
    yield put(replaceSelection(newSelected.path));
  } else {
    yield put(replaceSelection(list[list.length - 1].path));
  }
}
function* watchMoveSelectionLeft() {
  yield takeLatest(`${DOMAIN}/moveLeft`, moveSelectionLeftSaga);
}

// right
function* moveSelectionRightSaga() {
  const state = yield select();
  const [selected, list] = [getFirstSelectedFile(state), getFilesList(state)];
  const index = list.findIndex(({path}) => path === selected);
  const newSelected = list[index + 1];
  if (newSelected) {
    yield put(replaceSelection(newSelected.path));
  } else {
    yield put(replaceSelection(list[0].path));
  }
}
function* watchMoveSelectionRight() {
  yield takeLatest(`${DOMAIN}/moveRight`, moveSelectionRightSaga);
}

// bottom
function* moveSelectionBottomSaga() {
  const state = yield select();
  const [selected, list, mode, zoom] = [
    getFirstSelectedFile(state),
    getFilesList(state),
    getViewMode(state),
    getZoom(state),
  ];
  if (mode === 'icons') {
    const itemSize = getGridItemSize(zoom);
    const perRow = Math.floor(getFilesViewSize() / itemSize.width);
    const pos = list.findIndex(file => file.path === selected);
    const next = list[pos + perRow];
    if (next) {
      yield put(replaceSelection(next.path));
    }
  }
}
function* watchMoveSelectionBottom() {
  yield takeLatest(`${DOMAIN}/moveBottom`, moveSelectionBottomSaga);
}

// top
function* moveSelectionTopSaga() {
  const state = yield select();
  const [selected, list, mode, zoom] = [
    getFirstSelectedFile(state),
    getFilesList(state),
    getViewMode(state),
    getZoom(state),
  ];
  if (mode === 'icons') {
    const itemSize = getGridItemSize(zoom);
    const perRow = Math.floor(getFilesViewSize() / itemSize.width);
    const pos = list.findIndex(file => file.path === selected);
    const prev = list[pos - perRow];
    if (prev) {
      yield put(replaceSelection(prev.path));
    }
  }
}
function* watchMoveSelectionTop() {
  yield takeLatest(`${DOMAIN}/moveTop`, moveSelectionTopSaga);
}

function* watchClearSelection() {
  while (true) {
    yield take(WATCH_ACTIONS);
    yield put(clearSelection());
  }
}
export default function*() {
  yield all([
    watchClearSelection(),
    watchMoveSelectionRight(),
    watchMoveSelectionLeft(),
    watchMoveSelectionBottom(),
    watchMoveSelectionTop(),
  ]);
}
