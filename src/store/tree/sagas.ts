import {
  take,
  put,
  fork,
  cancel,
  select,
  cancelled,
  call,
  takeEvery,
  all
} from "redux-saga/effects";
import { DOMAIN as TREE_DOMAIN, updateList } from "./slice";
import { CHANGE_PATH_ACTIONS } from "../constants";
import { getSelectedFiles, getFirstSelectedFile } from "../selection/selectors";
import { getCurrentPath } from "../path/selectors";
import { replaceSelection } from "../selection/slice";
import { spawnWorker } from "@/utils/workers";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeFile, moveToTrash, renameFile, createDir } from "@/utils/fs";
import _ from "lodash";
import ee from "@/utils/ee";
import path from "path";

const WATCH_ACTIONS = [...CHANGE_PATH_ACTIONS, `${TREE_DOMAIN}/refresh`];

function* updateTreeSaga() {
  const currentPath = yield select(getCurrentPath);
  let worker;
  try {
    worker = spawnWorker("readdir", [currentPath]);
    const list: FileExcerpt[] = yield call(worker.waitForMessage);
    yield put(updateList(list));
  } catch (e) {
    // TODO
    console.error(e);
  } finally {
    if (yield cancelled()) {
      worker.kill();
    }
  }
}

function* watchUpdateTree() {
  let task;
  while (true) {
    yield take(WATCH_ACTIONS);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(updateTreeSaga);
  }
}
function* renameSaga() {
  const selected = yield select(getFirstSelectedFile);
  if (!selected) return;
  const parsed = path.parse(selected);
  const newBasename = yield ee.poll({
    input: parsed.base,
    okText: "Rename",
    label: "Enter the new name:",
    title: `Rename ${parsed.base}`
  });
  if (!newBasename || parsed.base === newBasename) return;
  parsed.base = newBasename;
  const newPath = path.format(parsed);
  yield call(renameFile, selected, newPath);
}
function* watchRename() {
  yield takeEvery(`${TREE_DOMAIN}/rename`, renameSaga);
}

function* createFolderSaga() {
  // TODO:: check if exists / handle errors
  const currentPath = yield select(getCurrentPath);
  const folderName = yield ee.poll({
    input: "",
    okText: "Create",
    label: "Enter the folder name:",
    title: "Create new folder"
  });
  if (folderName) {
    const realPath = path.join(currentPath, folderName);
    yield call(createDir, realPath);
    yield put(replaceSelection(realPath));
  }
}
function* watchCreateFolder() {
  yield takeEvery(`${TREE_DOMAIN}/createFolder`, createFolderSaga);
}

export function* removeFileSaga(action: PayloadAction<boolean>) {
  const { payload: permanent } = action;
  const selectedO = yield select(getSelectedFiles);
  const selected = Object.keys(selectedO);
  if (_.isEmpty(selected)) return;

  const moreThan1 = selected.length > 1;
  const removeConfirmed = yield call(ee.confirm, {
    title: `Are you sure that you want to
      permanently delete ${
        moreThan1 ? selected.length + " selected items" : selected[0]
      }?`,
    content: "If you delete a file, it is permanently lost."
  });
  if (!removeConfirmed) return;

  for (const filePath of selected) {
    if (permanent) {
      try {
        yield call(removeFile, filePath);
      } catch (e) {
        if (e.code === "EACCES") {
          yield call(ee.notify, {
            type: "error",
            content: `Removing ${filePath} - permission denied`
          });
        } else {
          // TODO:: handle other errors
          console.error(e);
        }
      }
    } else {
      // TODO:: success or not ?
      yield call(moveToTrash, filePath);
    }
  }
}
function* watchRemoveFile() {
  yield takeEvery(`${TREE_DOMAIN}/remove`, removeFileSaga);
}

export default function*() {
  yield all([
    watchUpdateTree(),
    watchRemoveFile(),
    watchRename(),
    watchCreateFolder()
  ]);
}
