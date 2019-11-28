import {PayloadAction} from '@reduxjs/toolkit';
import {put, debounce, call, select, takeLatest} from 'redux-saga/effects';
import {DOMAIN, updateAutocomplete} from './slice';
import {readdir, getParentDir} from '@/utils';
import {getInputFocused} from './selectors';
import fs from 'fs-extra';

const TIMEOUT = 150;

function* autocompleteSaga(action: PayloadAction<string>) {
  const isFocused = yield select(getInputFocused);
  if (!isFocused) return;
  const input = action.payload;
  let stat;
  try {
    stat = yield call(fs.lstat, input);
  } catch (e) {
    stat = null;
  }
  if (stat && stat.isDirectory()) {
    const dirs = yield call(readdir, input);
    yield put(updateAutocomplete(dirs));
  } else {
    const parent = getParentDir(input);
    if (parent) {
      const dirs: string[] = yield call(readdir, parent);
      const filtered = dirs.filter(dir => dir.startsWith(input));
      yield put(updateAutocomplete(filtered));
    } else {
      yield put(updateAutocomplete([]));
    }
  }
}

function* focusSaga (action: PayloadAction<boolean>) {
  // TODO
  if(action.payload) {
    //yield call(autocompleteSaga()); 
  }
}
export default function*() {
  yield debounce(TIMEOUT, `${DOMAIN}/updateInput`, autocompleteSaga);
  yield takeLatest(`${DOMAIN}/updateFocus`, focusSaga);
}
