import {
  equipSword,
  equipShield,
  equipArmour,
  swapSword,
  swapShield,
  swapArmour
} from '../equipment';
import { GLOBALCONST } from '../../AppContext';
import { assertReducerFnHelper } from '../../Helper';

const sharedActionPayloadNotValidTest1 = (tgtFn, currentState) => {
  const actionPayloads = [
    {},
    { equipment: {} },
    { equipment: { id: '', type: '', name: '', img: '' } },
    { equipment: { id: '', type: '', name: '', point: [0] } },
    { equipment: { id: '', type: '', img: '', point: [0] } },
    { equipment: { id: '', name: '', img: '', point: [0] } },
    { equipment: { type: '', name: '', img: '', point: [0] } },
    { equipment: { id: 0, type: '', name: '', img: '', point: [0] } },
    { equipment: { id: '', type: 0, name: '', img: '', point: [0] } },
    { equipment: { id: '', type: '', name: 0, img: '', point: [0] } },
    { equipment: { id: '', type: '', name: '', img: 0, point: [0] } },
    { equipment: { id: '', type: '', name: '', img: '', point: [] } },
    { equipment: { id: '', type: '', name: '', img: '', point: 0 } }
  ];

  actionPayloads.forEach(actionPayload => {
    assertReducerFnHelper(tgtFn, actionPayload, currentState, currentState);
  });
};

const sharedActionPayloadNotValidTest2 = (tgtFn, currentState) => {
  const actionPayloads = [
    {},
    { slotIdx: 0 },
    { equipment: {} },
    { slotIdx: 0, equipment: {} },
    { slotIdx: 0, equipment: { id: '', type: '', name: '', img: '' } },
    { slotIdx: 0, equipment: { id: '', type: '', name: '', point: [0] } },
    { slotIdx: 0, equipment: { id: '', type: '', img: '', point: [0] } },
    { slotIdx: 0, equipment: { id: '', name: '', img: '', point: [0] } },
    { slotIdx: 0, equipment: { type: '', name: '', img: '', point: [0] } },
    { slotIdx: 0, equipment: { id: 0, type: '', name: '', img: '', point: [0] } },
    { slotIdx: 0, equipment: { id: '', type: 0, name: '', img: '', point: [0] } },
    { slotIdx: 0, equipment: { id: '', type: '', name: 0, img: '', point: [0] } },
    { slotIdx: 0, equipment: { id: '', type: '', name: '', img: 0, point: [0] } },
    { slotIdx: 0, equipment: { id: '', type: '', name: '', img: '', point: [] } },
    { slotIdx: 0, equipment: { id: '', type: '', name: '', img: '', point: 0 } },
    { slotIdx: 'whatever', equipment: { id: '', type: '', name: '', img: '', point: [0] } }
  ];

  actionPayloads.forEach(actionPayload => {
    assertReducerFnHelper(tgtFn, actionPayload, currentState, currentState);
  });
};

describe('equipSword reducer', () => {
  let currentState;
  let expectedNextState;
  let mockItem;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    mockItem = { id: 'whatever', type: 'whatever', name: 'whatever', img: 'whatever', point: [0] };
  });

  test('return current state if actionPayload is not valid', () => {
    sharedActionPayloadNotValidTest1(equipSword, currentState);
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { equipment: mockItem };

    expectedNextState.playerEquipment.sword = mockItem;
    assertReducerFnHelper(equipSword, actionPayload, currentState, expectedNextState);
  });
});

describe('equipShield reducer', () => {
  let currentState;
  let expectedNextState;
  let mockItem;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    mockItem = { id: 'whatever', type: 'whatever', name: 'whatever', img: 'whatever', point: [0] };
  });

  test('return current state if actionPayload is not valid', () => {
    sharedActionPayloadNotValidTest1(equipShield, currentState);
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { equipment: mockItem };

    expectedNextState.playerEquipment.shield = mockItem;
    assertReducerFnHelper(equipShield, actionPayload, currentState, expectedNextState);
  });
});

describe('equipArmour reducer', () => {
  let currentState;
  let expectedNextState;
  let mockItem;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    mockItem = { id: 'whatever', type: 'whatever', name: 'whatever', img: 'whatever', point: [0] };
  });

  test('return current state if actionPayload is not valid', () => {
    sharedActionPayloadNotValidTest1(equipArmour, currentState);
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { equipment: mockItem };

    expectedNextState.playerEquipment.armour = mockItem;
    assertReducerFnHelper(equipArmour, actionPayload, currentState, expectedNextState);
  });
});

describe('swapSword reducer', () => {
  let currentState;
  let expectedNextState;
  let mockItem1;
  let mockItem2;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    mockItem1 = {
      id: 'mock item 1',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
    mockItem2 = {
      id: 'mock item 2',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
  });

  test('return current state if actionPayload is not valid', () => {
    sharedActionPayloadNotValidTest2(swapSword, currentState);
  });

  test('return the proper next state given a valid action payload', () => {
    currentState.playerEquipment.sword = mockItem1;
    currentState.playerInventory.equipments[2] = mockItem2;

    const actionPayload = { slotIdx: 2, equipment: mockItem2 };
    const receivedState = swapSword(currentState, actionPayload);

    // WARNING! expectedNextState must be assigned to the expected value after calling
    // the target function
    expectedNextState.playerEquipment.sword = mockItem2;
    expectedNextState.playerInventory.equipments[2] = mockItem1;

    expect(receivedState).toEqual(expectedNextState);
  });
});

describe('swapShield reducer', () => {
  let currentState;
  let expectedNextState;
  let mockItem1;
  let mockItem2;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    mockItem1 = {
      id: 'mock item 1',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
    mockItem2 = {
      id: 'mock item 2',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
  });

  test('return current state if actionPayload is not valid', () => {
    sharedActionPayloadNotValidTest2(swapShield, currentState);
  });

  test('return the proper next state given a valid action payload', () => {
    currentState.playerEquipment.shield = mockItem1;
    currentState.playerInventory.equipments[2] = mockItem2;

    const actionPayload = { slotIdx: 2, equipment: mockItem2 };
    const receivedState = swapShield(currentState, actionPayload);

    // WARNING! expectedNextState must be assigned to the expected value after calling
    // the target function
    expectedNextState.playerEquipment.shield = mockItem2;
    expectedNextState.playerInventory.equipments[2] = mockItem1;

    expect(receivedState).toEqual(expectedNextState);
  });
});

describe('swapArmour reducer', () => {
  let currentState;
  let expectedNextState;
  let mockItem1;
  let mockItem2;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    mockItem1 = {
      id: 'mock item 1',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
    mockItem2 = {
      id: 'mock item 2',
      type: 'whatever',
      name: 'whatever',
      img: 'whatever',
      point: [0]
    };
  });

  test('return current state if actionPayload is not valid', () => {
    sharedActionPayloadNotValidTest2(swapArmour, currentState);
  });

  test('return the proper next state given a valid action payload', () => {
    currentState.playerEquipment.armour = mockItem1;
    currentState.playerInventory.equipments[2] = mockItem2;
    const actionPayload = { slotIdx: 2, equipment: mockItem2 };
    const receivedState = swapArmour(currentState, actionPayload);
    expectedNextState = { ...GLOBALCONST.PRELOADED_STATE };
    // WARNING! expectedNextState must be assigned to the expected value after calling
    // the target function
    expectedNextState.playerEquipment.armour = mockItem2;
    expectedNextState.playerInventory.equipments[2] = mockItem1;

    expect(receivedState).toEqual(expectedNextState);
  });
});
