import {take, put, select, call, all, takeEvery} from 'redux-saga/effects';
import {DOMAIN, replace as replaceBuffer, State as BufferState} from './slice';
import {Action, PayloadAction} from '@reduxjs/toolkit';
import {getSelectedFiles} from '@/store/selection/selectors';
import {getFileBuffer, isFileBufferEmpty} from './selectors';

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
  const state = yield select();
  const [selected, buffer] = [getSelectedFiles(state), getFileBuffer(state)];
  console.log(action.payload);
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
