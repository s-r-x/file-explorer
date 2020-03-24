import { removeFileSaga } from "./sagas";
import { expectSaga } from "redux-saga-test-plan";
import ee from "@/utils/ee";
import * as matchers from "redux-saga-test-plan/matchers";
import { select, call } from "redux-saga/effects";
import * as selectionSelectors from "@/store/selection/selectors";
import { removeFile, moveToTrash } from "@/utils/fs";

const { getSelectedFiles } = selectionSelectors;
const oneSelected = { "/1": 1 },
  twoSelected = {
    "/2": 1,
    "/3": 1
  };
describe("Tree sagas", () => {
  describe("Remove file saga", () => {
    test("with empty selection", async () => {
      const { effects } = await expectSaga(removeFileSaga, {
        type: "",
        payload: true
      })
        .provide([
          [select(getSelectedFiles), {}],
          [matchers.call.fn(ee.confirm), true]
        ])
        .run();
      expect(effects.select).toHaveLength(1);
      expect(effects.call).toBeUndefined();
    });
    test("without confirmation", async () => {
      const { effects } = await expectSaga(removeFileSaga, {
        type: "",
        payload: true
      })
        .provide([
          [select(getSelectedFiles), oneSelected],
          [matchers.call.fn(ee.confirm), false]
        ])
        .run();
      expect(effects.call).toHaveLength(1);
    });
    test("permanent", async () => {
      const { effects } = await expectSaga(removeFileSaga, {
        type: "",
        payload: true
      })
        .provide([
          [select(getSelectedFiles), oneSelected],
          [matchers.call.fn(ee.confirm), true]
        ])
        .run();
      expect(effects.call).toHaveLength(2);
      expect(effects.call[1]).toEqual(call(removeFile, "/1"));
    });
    test("permanent with multiple files", async () => {
      const { effects } = await expectSaga(removeFileSaga, {
        type: "",
        payload: true
      })
        .provide([
          [select(getSelectedFiles), twoSelected],
          [matchers.call.fn(ee.confirm), true]
        ])
        .run();
      expect(effects.call).toHaveLength(3);
      expect(effects.call[1]).toEqual(call(removeFile, "/2"));
      expect(effects.call[2]).toEqual(call(removeFile, "/3"));
    });
    test("not permanent", async () => {
      const { effects } = await expectSaga(removeFileSaga, {
        type: "",
        payload: false
      })
        .provide([
          [select(getSelectedFiles), oneSelected],
          [matchers.call.fn(ee.confirm), true]
        ])
        .run();
      expect(effects.call).toHaveLength(2);
      expect(effects.call[1]).toEqual(call(moveToTrash, "/1"));
    });
    test("not permanent with multiple files", async () => {
      const { effects } = await expectSaga(removeFileSaga, {
        type: "",
        payload: false
      })
        .provide([
          [select(getSelectedFiles), twoSelected],
          [matchers.call.fn(ee.confirm), true]
        ])
        .run();
      expect(effects.call).toHaveLength(3);
      expect(effects.call[1]).toEqual(call(moveToTrash, "/2"));
      expect(effects.call[2]).toEqual(call(moveToTrash, "/3"));
    });
  });
});
