import {take, put, select, call, all, takeEvery} from 'redux-saga/effects';
import {DOMAIN, replace as replaceBuffer, State as BufferState} from './slice';
import {Action, PayloadAction} from '@reduxjs/toolkit';
import {
  getSelectedFiles,
  getSelectedFilesExcerpt,
} from '@/store/selection/selectors';
import {getFileBuffer, isFileBufferEmpty} from './selectors';
import {copyFile, getFileStats} from '@/utils/fs';
import _ from 'lodash';
import path from 'path';
import ee from '@/utils/ee';

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
  const buffer = getFileBuffer(state);
  const normalizedBuffer = _.reduce(
    buffer,
    (acc, __, key) => [...acc, key],
    [],
  );
  yield (async () => {
    for (const src of normalizedBuffer) {
      const realDst = path.join(dst, path.basename(src));
      try {
        const stats = await getFileStats(realDst);
        const shouldReplace = await ee.processFileReplaceConfirm(realDst);
        console.log(shouldReplace);
        // TODO:: file exists. need confirmation
      } catch (e) {
        if (e.code === 'ENOENT') {
          console.log('good');
        }
      }
      //await copyFile(src, realDst);
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
