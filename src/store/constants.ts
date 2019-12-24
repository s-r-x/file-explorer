import {DOMAIN as PATH_DOMAIN} from './path/slice';
import {DOMAIN as TREE_DOMAIN, updateList} from './tree/slice';

export const CHANGE_PATH_ACTIONS = [
  `${PATH_DOMAIN}/goTo`,
  `${PATH_DOMAIN}/goForward`,
  `${PATH_DOMAIN}/goBack`,
  `${PATH_DOMAIN}/goHome`,
  `${PATH_DOMAIN}/goParent`,
];
