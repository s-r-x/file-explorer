import {take, put, select, call, all, takeEvery} from 'redux-saga/effects';
import {DOMAIN, replace as replaceBuffer, State as BufferState} from './slice';
import {Action, PayloadAction} from '@reduxjs/toolkit';
import {
  getSelectedFiles,
  getSelectedFilesExcerpt,
} from '@/store/selection/selectors';
import {getFileBuffer, getFileBufferType, isFileBufferEmpty} from './selectors';
import {copyFile, moveFile, getFileStats} from '@/utils/fs';
import _ from 'lodash';
import path from 'path';
import ee from '@/utils/ee';

const getPasteWorker = (type: string) => {
  switch (type) {
    case 'COPY':
      return copyFile;
    case 'CUT':
      return moveFile;
    default:
      return copyFile;
  }
};
function* updateBufferSaga(action: Action) {
  const selected = yield select(getSelectedFiles);
  yield put(
    replaceBuffer({
      items: selected,
      type: action.type === `${DOMAIN}/copy` ? 'COPY' : 'CUT',
    }),
  );
}
function* pasteSaga(action: PayloadAction<string>) {
  const dst = action.payload;
  const state = yield select();
  const [buffer, bufferType] = [getFileBuffer(state), getFileBufferType(state)];
  const normalizedBuffer = _.reduce(
    buffer,
    (acc, __, key) => [...acc, key],
    [],
  );
  const pasteWorker = getPasteWorker(bufferType);
  yield (async () => {
    for (const src of normalizedBuffer) {
      const realDst = path.join(dst, path.basename(src));
      try {
        const stats = await getFileStats(realDst);
        // file exists
        const shouldReplace = await ee.confirmFileReplace(realDst);
        if (shouldReplace) {
          await pasteWorker(src, realDst, shouldReplace);
        }
      } catch (e) {
        // not exists
        if (e.code === 'ENOENT') {
          await pasteWorker(src, realDst);
        }
      }
    }
  })();
}
function* watchPasteSaga() {
  yield takeEvery(`${DOMAIN}/paste`, pasteSaga);
}
function* watchUpdateBufferSaga() {
  while (true) {
    const action = yield take([`${DOMAIN}/copy`, `${DOMAIN}/cut`]);
    yield updateBufferSaga(action);
  }
}

export default function*() {
  yield all([watchUpdateBufferSaga(), watchPasteSaga()]);
}
