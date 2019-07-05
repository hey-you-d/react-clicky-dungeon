import configureStore from 'redux-mock-store';

import { GLOBALCONST } from '../../AppContext';

import {
  EQUIP_SWORD,
  EQUIP_SHIELD,
  EQUIP_ARMOUR,
  SWAP_SWORD,
  SWAP_SHIELD,
  SWAP_ARMOUR,
  EQUIPMENT_ACTION_ERROR,
  equip
} from '../equipments';

const mockStore = configureStore();
const store = mockStore(GLOBALCONST.PRELOADED_STATE);

const assertEquipFn = (type, action, equipment, slotIdx, expectedAction) => {
  expect(equip(type, action, equipment, slotIdx)).toEqual(expectedAction);
  // alternatively
  store.dispatch(equip(type, action, equipment, slotIdx));
  expect(store.getActions()).toEqual([expectedAction]);
  store.clearActions();
};

describe('equip action creator', () => {
  test('Dispatches the correct action and payload', () => {
    const slotIdx = -1;
    const equipment = {};

    // === Equip Sword ===
    let expectedAction = {
      type: EQUIP_SWORD,
      payload: { equipment }
    };
    assertEquipFn(
      GLOBALCONST.EQUIPMENT_TYPE_SWORD,
      GLOBALCONST.EQUIP_ACTION_DEFAULT,
      equipment,
      slotIdx,
      expectedAction
    );

    // === Swap Sword ===
    expectedAction = {
      type: SWAP_SWORD,
      payload: { equipment, slotIdx: -1 }
    };
    assertEquipFn(
      GLOBALCONST.EQUIPMENT_TYPE_SWORD,
      GLOBALCONST.EQUIP_ACTION_SWAP,
      equipment,
      slotIdx,
      expectedAction
    );

    // === Equip Shield ===
    expectedAction = {
      type: EQUIP_SHIELD,
      payload: { equipment }
    };
    assertEquipFn(
      GLOBALCONST.EQUIPMENT_TYPE_SHIELD,
      GLOBALCONST.EQUIP_ACTION_DEFAULT,
      equipment,
      slotIdx,
      expectedAction
    );

    // === Swap Shield ===
    expectedAction = {
      type: SWAP_SHIELD,
      payload: { equipment, slotIdx: -1 }
    };
    assertEquipFn(
      GLOBALCONST.EQUIPMENT_TYPE_SHIELD,
      GLOBALCONST.EQUIP_ACTION_SWAP,
      equipment,
      slotIdx,
      expectedAction
    );

    // === Equip Armour ===
    expectedAction = {
      type: EQUIP_ARMOUR,
      payload: { equipment }
    };
    assertEquipFn(
      GLOBALCONST.EQUIPMENT_TYPE_ARMOUR,
      GLOBALCONST.EQUIP_ACTION_DEFAULT,
      equipment,
      slotIdx,
      expectedAction
    );

    // === Swap Armour ===
    expectedAction = {
      type: SWAP_ARMOUR,
      payload: { equipment, slotIdx: -1 }
    };
    assertEquipFn(
      GLOBALCONST.EQUIPMENT_TYPE_ARMOUR,
      GLOBALCONST.EQUIP_ACTION_SWAP,
      equipment,
      slotIdx,
      expectedAction
    );

    // === Dispatch error action ===
    // The error action will handled in reducer's index.jsx
    expectedAction = {
      type: EQUIPMENT_ACTION_ERROR,
      payload: {}
    };
    assertEquipFn('Whatever', GLOBALCONST.EQUIP_ACTION_SWAP, equipment, slotIdx, expectedAction);
    assertEquipFn(
      GLOBALCONST.EQUIPMENT_TYPE_ARMOUR,
      'Whatever',
      equipment,
      slotIdx,
      expectedAction
    );
  });
});
