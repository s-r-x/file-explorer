import {all} from 'redux-saga/effects';
import inputSaga from './input/sagas';
import treeSaga from './tree/sagas';

export default function* rootSaga() {
  yield all([inputSaga(), treeSaga()]);
}
