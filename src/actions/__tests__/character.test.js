import configureStore from 'redux-mock-store';

import { GLOBALCONST } from '../../AppContext';

import {
  GAIN_EXP,
  SET_VITAL_HP,
  SET_VITAL_MP,
  SET_VITAL_ST,
  SET_ATTR_BASE_ATK,
  SET_ATTR_BASE_DEF,
  SET_ATTR_BASE_HP,
  SET_ATTR_BASE_MP,
  SET_ATTR_BASE_ST,
  UPDATE_ATTR_LVLUP_PT,
  UPDATE_COIN_PURSE,
  CHARACTER_ACTION_ERROR,
  setVitalStat,
  setAttributePoint,
  gainExp,
  updateCoinPurse
} from '../character';

const mockStore = configureStore();
const store = mockStore(GLOBALCONST.PRELOADED_STATE);

const assertSetVitalStatFn = (type, point, expectedAction) => {
  expect(setVitalStat(type, point)).toEqual(expectedAction);
  // alternatively
  store.dispatch(setVitalStat(type, point));
  expect(store.getActions()).toEqual([expectedAction]);
  store.clearActions();
};
const assertSetAttributePointFn = (type, point, expectedAction) => {
  expect(setAttributePoint(type, point)).toEqual(expectedAction);
  // alternatively
  store.dispatch(setAttributePoint(type, point));
  expect(store.getActions()).toEqual([expectedAction]);
  store.clearActions();
};

describe('setVitalStat action creator', () => {
  test('Dispatches the correct action and payload to the mockStore', () => {
    const point = 0;
    let expectedAction = {
      type: SET_VITAL_HP,
      payload: { point }
    };
    assertSetVitalStatFn(GLOBALCONST.VITAL_STAT_HP, point, expectedAction);

    expectedAction = {
      type: SET_VITAL_MP,
      payload: { point }
    };
    assertSetVitalStatFn(GLOBALCONST.VITAL_STAT_MP, point, expectedAction);

    expectedAction = {
      type: SET_VITAL_ST,
      payload: { point }
    };
    assertSetVitalStatFn(GLOBALCONST.VITAL_STAT_ST, point, expectedAction);
  });

  test('Dispatch the the ERROR action to the mockStore if unspecified `type` is given', () => {
    const point = 0;
    const expectedAction = {
      type: CHARACTER_ACTION_ERROR,
      payload: {}
    };
    assertSetVitalStatFn('WHATEVER', point, expectedAction);
  });
});

describe('setAttributePoint action creator', () => {
  test('Dispatches the correct action and payload to the mockStore', () => {
    const point = 0;
    let expectedAction = {
      type: SET_ATTR_BASE_ATK,
      payload: { point }
    };
    assertSetAttributePointFn(GLOBALCONST.PLAYER_ATTRIBUTE_ATK, point, expectedAction);

    expectedAction = {
      type: SET_ATTR_BASE_DEF,
      payload: { point }
    };
    assertSetAttributePointFn(GLOBALCONST.PLAYER_ATTRIBUTE_DEF, point, expectedAction);

    expectedAction = {
      type: SET_ATTR_BASE_HP,
      payload: { point }
    };
    assertSetAttributePointFn(GLOBALCONST.PLAYER_ATTRIBUTE_HP, point, expectedAction);

    expectedAction = {
      type: SET_ATTR_BASE_MP,
      payload: { point }
    };
    assertSetAttributePointFn(GLOBALCONST.PLAYER_ATTRIBUTE_MP, point, expectedAction);

    expectedAction = {
      type: SET_ATTR_BASE_ST,
      payload: { point }
    };
    assertSetAttributePointFn(GLOBALCONST.PLAYER_ATTRIBUTE_ST, point, expectedAction);

    expectedAction = {
      type: UPDATE_ATTR_LVLUP_PT,
      payload: { point }
    };
    assertSetAttributePointFn(GLOBALCONST.PLAYER_ATTRIBUTE_LVLUP_PT, point, expectedAction);
  });

  test('Dispatch the the ERROR action to the mockStore if unspecified `type` is given', () => {
    const point = 0;
    const expectedAction = {
      type: CHARACTER_ACTION_ERROR,
      payload: {}
    };
    assertSetAttributePointFn('WHATEVER', point, expectedAction);
  });
});

describe('gainExp action creator', () => {
  test('Dispatches the correct action and payload to the mockStore', () => {
    const point = 0;
    const expectedAction = {
      type: GAIN_EXP,
      payload: { point }
    };
    expect(gainExp(point)).toEqual(expectedAction);
    // alternatively
    store.dispatch(gainExp(point));
    expect(store.getActions()).toEqual([expectedAction]);
    store.clearActions();
  });
});

describe('updateCoinPurse action creator', () => {
  test('Dispatches the correct action and payload to the mockStore', () => {
    const point = 0;
    const expectedAction = {
      type: UPDATE_COIN_PURSE,
      payload: { itemValue: point }
    };
    expect(updateCoinPurse(point)).toEqual(expectedAction);
    // alternatively
    store.dispatch(updateCoinPurse(point));
    expect(store.getActions()).toEqual([expectedAction]);
    store.clearActions();
  });
});
