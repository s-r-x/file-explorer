import {combineReducers} from 'redux';
import view from './view/slice';
import path from './path/slice';
import input from './input/slice';
import tree from './tree/slice';
import selection from './selection/slice';
import contextMenu from './contextMenu/slice';
import fileBuffer from './fileBuffer/slice';

const rootReducer = combineReducers({
  contextMenu,
  fileBuffer,
  input,
  path,
  selection,
  tree,
  view,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
