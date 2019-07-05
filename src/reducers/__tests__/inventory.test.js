import { removeEquipmentItem, removeConsumableItem, expandInventory } from '../inventory';
import { GLOBALCONST } from '../../AppContext';
import { assertReducerFnHelper } from '../../Helper';

describe('removeEquipmentItem reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [
      {},
      { slotIdx: 0 },
      { emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT },
      { slotIdx: 'whatever', emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT },
      { slotIdx: 0, emptySlotMarker: 'whatever' }
    ];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(removeEquipmentItem, actionPayload, currentState, currentState);
    });
  });

  test('update the next state correctly given the right payload', () => {
    // set the current state: populating 2 slots in the inventory
    currentState.playerInventory.equipments[3] = {
      id: 'whatever',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
    currentState.playerInventory.equipments[7] = {
      id: 'whatever #2',
      type: 'whatever #2',
      name: 'whatever #2',
      img: 'whatever #2',
      point: [0]
    };
    // specify the action payload
    const actionPayload = {
      slotIdx: 0,
      emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT
    };
    expectedNextState.playerInventory.equipments[3] = GLOBALCONST.INVENTORY_EMPTY_SLOT;
    expectedNextState.playerInventory.equipments[7] = GLOBALCONST.INVENTORY_EMPTY_SLOT;
    assertReducerFnHelper(removeEquipmentItem, actionPayload, currentState, expectedNextState);
  });
});

describe('removeConsumableItem reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [
      {},
      { slotIdx: 0 },
      { emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT },
      { slotIdx: 'whatever', emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT },
      { slotIdx: 0, emptySlotMarker: 'whatever' }
    ];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(removeConsumableItem, actionPayload, currentState, currentState);
    });
  });

  test('update the next state correctly given the right payload', () => {
    const mockItem = {
      id: 'whatever',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
    // set the current state: populating 2 slots in the inventory
    currentState.playerInventory.consumableItems[3] = mockItem;
    currentState.playerInventory.consumableItems[7] = mockItem;

    let actionPayload = {
      slotIdx: 3,
      emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT
    };
    expectedNextState.playerInventory.consumableItems[3] = GLOBALCONST.INVENTORY_EMPTY_SLOT;
    assertReducerFnHelper(removeConsumableItem, actionPayload, currentState, expectedNextState);
    actionPayload = {
      slotIdx: 7,
      emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT
    };
    expectedNextState.playerInventory.consumableItems[7] = GLOBALCONST.INVENTORY_EMPTY_SLOT;
    assertReducerFnHelper(removeConsumableItem, actionPayload, currentState, expectedNextState);
  });
});

describe('expandInventory reducer', () => {
  let currentState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [
      {},
      { numSlots: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET },
      { emptySlotMarker: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET },
      { numSlots: 0, emptySlotMarker: 'whatever' },
      { numSlots: 'whatever', emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
    ];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(expandInventory, actionPayload, currentState, currentState);
    });
  });

  test('there should be 24 inventory slots after calling the reducer once from the default 12 slots', () => {
    const actionPayload = {
      numSlots: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET,
      emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT
    };

    expect(currentState.playerInventory.consumableItems.length).toEqual(12);
    expect(currentState.playerInventory.equipments.length).toEqual(12);

    let receivedNextState = expandInventory(currentState, actionPayload);
    expect(receivedNextState.playerInventory.consumableItems.length).toEqual(24);
    expect(receivedNextState.playerInventory.equipments.length).toEqual(24);

    // call the reducer again one more time
    currentState = receivedNextState;
    receivedNextState = expandInventory(currentState, actionPayload);
    expect(receivedNextState.playerInventory.consumableItems.length).toEqual(36);
    expect(receivedNextState.playerInventory.equipments.length).toEqual(36);
  });

  test('the inventory will not reset its content after calling the reducer', () => {
    const mockItem = {
      id: 'whatever',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };

    // set the current state: populating 2 slots in the inventory
    currentState.playerInventory.equipments[3] = mockItem;
    currentState.playerInventory.equipments[7] = mockItem;
    currentState.playerInventory.consumableItems[3] = mockItem;
    currentState.playerInventory.consumableItems[7] = mockItem;

    const actionPayload = {
      numSlots: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET,
      emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT
    };

    const receivedNextState = expandInventory(currentState, actionPayload);
    expect(receivedNextState.playerInventory.consumableItems[3]).toEqual(mockItem);
    expect(receivedNextState.playerInventory.consumableItems[7]).toEqual(mockItem);
    expect(receivedNextState.playerInventory.consumableItems.length).toEqual(24);
    expect(receivedNextState.playerInventory.equipments[3]).toEqual(mockItem);
    expect(receivedNextState.playerInventory.equipments[7]).toEqual(mockItem);
    expect(receivedNextState.playerInventory.equipments.length).toEqual(24);
  });
});
