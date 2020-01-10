import {take, put} from 'redux-saga/effects';
import {CHANGE_PATH_ACTIONS} from '../constants';
import {clearSelection} from './slice';

const WATCH_ACTIONS = CHANGE_PATH_ACTIONS;

export default function*() {
  while (true) {
    yield take(WATCH_ACTIONS);
    yield put(clearSelection());
  }
}
