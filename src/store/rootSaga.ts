import {all} from 'redux-saga/effects';
import inputSaga from './input/sagas';

export default function* rootSaga() {
  yield all([inputSaga()]);
}
