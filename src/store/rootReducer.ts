import {combineReducers} from 'redux';
import view from './view/slice';
import path from './path/slice';
import input from './input/slice';
import tree from './tree/slice';
import selection from './selection/slice';

const rootReducer = combineReducers({
  input,
  path,
  tree,
  view,
  selection,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
