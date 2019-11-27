import {combineReducers} from 'redux';
import view from './view/slice';
import path from './path/slice';

const rootReducer = combineReducers({
  view,
  path,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
