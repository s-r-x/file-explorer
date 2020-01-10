import {all} from 'redux-saga/effects';
import inputSaga from './input/sagas';
import treeSaga from './tree/sagas';
import selectionSaga from './selection/sagas';
import fileBufferSaga from './fileBuffer/sagas';

export default function* rootSaga() {
  yield all([inputSaga(), treeSaga(), selectionSaga(), fileBufferSaga()]);
}
