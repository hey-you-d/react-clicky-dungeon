import configureStore from 'redux-mock-store';

import { GLOBALCONST } from '../../AppContext';

import {
  obtainAnItem,
  removeInventoryItem,
  expandInventory,
  OBTAIN_COINS,
  OBTAIN_CONSUMABLE_ITEM,
  OBTAIN_EQUIPMENT,
  REMOVE_INVENTORY_CONSUMABLE_ITEM,
  REMOVE_INVENTORY_EQUIPMENT_ITEM,
  EXPAND_INVENTORY,
  INVENTORY_ACTION_ERROR
} from '../inventory';

const mockStore = configureStore();
const store = mockStore(GLOBALCONST.PRELOADED_STATE);

const assertObtainAnItemFn = (item, itemType, coinValue = 0, expectedAction) => {
  expect(obtainAnItem(item, itemType, coinValue)).toEqual(expectedAction);
  // alternatively
  store.dispatch(obtainAnItem(item, itemType, coinValue));
  expect(store.getActions()).toEqual([expectedAction]);
  store.clearActions();
};
const assertRemoveInventoryItemFn = (slotIdx, itemType, expectedAction) => {
  expect(removeInventoryItem(slotIdx, itemType)).toEqual(expectedAction);
  // alternatively
  store.dispatch(removeInventoryItem(slotIdx, itemType));
  expect(store.getActions()).toEqual([expectedAction]);
  store.clearActions();
};

describe('obtainAnItem action creator', () => {
  test('Dispatches the correct action and payload to the mockStore', () => {
    // the responsibility to check the structure of the `item` payload
    // is performed by the reducer. Hence its sufficient to simply pass
    // an empty object for testing.
    const item = {};
    let expectedAction = {
      type: OBTAIN_COINS,
      payload: { itemValue: 10 }
    };
    assertObtainAnItemFn(item, GLOBALCONST.ITEM_TYPE_COINS, 10, expectedAction);

    expectedAction = {
      type: OBTAIN_CONSUMABLE_ITEM,
      payload: { item, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
    };
    assertObtainAnItemFn(item, GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM, -1, expectedAction);

    expectedAction = {
      type: OBTAIN_EQUIPMENT,
      payload: { item, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
    };
    assertObtainAnItemFn(item, GLOBALCONST.ITEM_TYPE_EQUIPMENT, -1, expectedAction);
  });

  test('Dispatch the the ERROR action to the mockStore if unspecified `itemType` is given', () => {
    const expectedAction = {
      type: INVENTORY_ACTION_ERROR,
      payload: {}
    };
    assertObtainAnItemFn({}, 'WHATEVER', 10, expectedAction);
  });
});

describe('removeInventoryItem action creator', () => {
  test('Dispatches the correct action and payload to the mockStore', () => {
    // the responsibility to check the structure of the `slotIdx` payload
    // is performed by the reducer. Hence its fine to deliberately pass a
    // non valid value for slotIdx.
    const slotIdx = -1;
    let expectedAction = {
      type: REMOVE_INVENTORY_CONSUMABLE_ITEM,
      payload: { slotIdx, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
    };
    assertRemoveInventoryItemFn(slotIdx, GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM, expectedAction);

    expectedAction = {
      type: REMOVE_INVENTORY_EQUIPMENT_ITEM,
      payload: { slotIdx, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
    };
    assertRemoveInventoryItemFn(slotIdx, GLOBALCONST.ITEM_TYPE_EQUIPMENT, expectedAction);
  });
});

describe('expandInventory action creator', () => {
  test('Dispatches the correct action and payload', () => {
    const expectedAction = {
      type: EXPAND_INVENTORY,
      payload: {
        numSlots: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET,
        emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT
      }
    };
    expect(expandInventory()).toEqual(expectedAction);
    // alternatively
    store.dispatch(expandInventory());
    expect(store.getActions()).toEqual([expectedAction]);
    store.clearActions();
  });
});
