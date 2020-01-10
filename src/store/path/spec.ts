import os from 'os';
import reducer, {
  goBack,
  goForward,
  goHome,
  goParent,
  goTo,
  initialState,
} from './slice';

const baseHistory = ['/', '/home', '/home/petya'];

describe('path reducer/actions', () => {
  test('goForward', () => {
    const state1 = reducer(initialState, goForward());
    expect(state1.current).toBe(0);
    const state2 = reducer(
      {...initialState, history: ['/', '/home']},
      goForward(),
    );
    expect(state2.current).toBe(1);
  });
  test('goBack', () => {
    const state1 = reducer(initialState, goBack());
    expect(state1.current).toBe(0);
    const state2 = reducer(
      {...initialState, history: ['/', '/home'], current: 1},
      goBack(),
    );
    expect(state2.current).toBe(0);
  });
  test('goHome', () => {
    const state1 = reducer(
      {...initialState, history: baseHistory, current: 0},
      goHome(),
    );
    expect(state1.current).toBe(1);
    expect(state1.history).toStrictEqual(['/', os.homedir()]);
    const state2 = reducer(
      {...initialState, history: baseHistory, current: 1},
      goHome(),
    );
    expect(state2.current).toBe(2);
    expect(state2.history).toStrictEqual(['/', '/home', os.homedir()]);
    const state3 = reducer(
      {...initialState, history: baseHistory, current: 2},
      goHome(),
    );
    expect(state3.current).toBe(3);
    expect(state3.history).toStrictEqual([...baseHistory, os.homedir()]);
  });
  test('goParent', () => {
    const state1 = reducer({...initialState, history: baseHistory}, goParent());
    expect(state1.current).toBe(0);
    expect(state1.history).toStrictEqual(baseHistory);
    const state2 = reducer(
      {...initialState, history: baseHistory, current: 1},
      goParent(),
    );
    expect(state2.current).toBe(2);
    expect(state2.history).toStrictEqual(['/', '/home', '/']);

    const state3 = reducer(
      {...initialState, history: baseHistory, current: 2},
      goParent(),
    );
    expect(state3.current).toBe(3);
    expect(state3.history).toStrictEqual([
      '/',
      '/home',
      '/home/petya',
      '/home',
    ]);
  });
  test('goTo', () => {
    const state1 = reducer({...initialState, history: baseHistory}, goTo('/'));
    expect(state1.current).toBe(0);
    expect(state1.history).toStrictEqual(baseHistory);
    const state2 = reducer(
      {...initialState, history: ['/', '/home']},
      goTo('/petya'),
    );
    expect(state2.current).toBe(2);
    expect(state2.history).toStrictEqual(['/', '/home', '/petya']);
  });
});
