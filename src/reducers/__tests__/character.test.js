import {
  gainExp,
  updateLvUpPoint,
  setBaseAtkAttr,
  setBaseDefAttr,
  setBaseHPAttr,
  setBaseMPAttr,
  setBaseSTAttr
} from '../character';
import { GLOBALCONST } from '../../AppContext';
import { assertReducerFnHelper } from '../../Helper';

describe('setBaseAtkAttr reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setBaseAtkAttr, actionPayload, currentState, currentState);
    });
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { point: 1 };

    expectedNextState.playerProgress.baseAtk = 1;
    assertReducerFnHelper(setBaseAtkAttr, actionPayload, currentState, expectedNextState);
  });
});

describe('setBaseDefAttr reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setBaseDefAttr, actionPayload, currentState, currentState);
    });
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { point: 1 };

    expectedNextState.playerProgress.baseDef = 1;
    assertReducerFnHelper(setBaseDefAttr, actionPayload, currentState, expectedNextState);
  });
});

describe('setBaseHPAttr reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setBaseHPAttr, actionPayload, currentState, currentState);
    });
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { point: 1 };

    expectedNextState.playerVitalStat.maxHP = 1;
    assertReducerFnHelper(setBaseHPAttr, actionPayload, currentState, expectedNextState);
  });
});

describe('setBaseMPAttr reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setBaseMPAttr, actionPayload, currentState, currentState);
    });
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { point: 1 };

    expectedNextState.playerVitalStat.maxMP = 1;
    assertReducerFnHelper(setBaseMPAttr, actionPayload, currentState, expectedNextState);
  });
});

describe('setBaseSTAttr reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setBaseSTAttr, actionPayload, currentState, currentState);
    });
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { point: 1 };

    expectedNextState.playerVitalStat.maxST = 1;
    assertReducerFnHelper(setBaseSTAttr, actionPayload, currentState, expectedNextState);
  });
});

describe('updateLvUpPoint reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(updateLvUpPoint, actionPayload, currentState, currentState);
    });
  });

  test('return the proper next state given a valid action payload', () => {
    const actionPayload = { point: 1 };

    expectedNextState.playerProgress.availableAttrPt = 1;
    assertReducerFnHelper(updateLvUpPoint, actionPayload, currentState, expectedNextState);
  });
});

describe('gainExp reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(gainExp, actionPayload, currentState, currentState);
    });
  });

  test('return the proper next state given a valid action payload #1', () => {
    const actionPayload = { point: 10 };
    currentState.playerProgress.currentExp = 100;
    currentState.playerProgress.tgtExp = 200;

    const receivedState = gainExp(currentState, actionPayload);

    expectedNextState.playerProgress.currentExp = 110;
    currentState.playerProgress.tgtExp = 200;

    expect(receivedState).toEqual(expectedNextState);
  });

  test('return the proper next state given a valid action payload #2', () => {
    const actionPayload = { point: 10 };

    currentState.playerProgress.currentExp = 90;
    currentState.playerProgress.tgtExp = 100;
    currentState.playerProgress.level = 1;
    currentState.playerProgress.availableAttrPt = 0;

    const receivedState = gainExp(currentState, actionPayload);

    expectedNextState.playerProgress.currentExp = 0;
    expectedNextState.playerProgress.tgtExp = 200;
    expectedNextState.playerProgress.level = 2;
    expectedNextState.playerProgress.availableAttrPt += GLOBALCONST.AVAIL_ATTR_POINT_PER_LEVEL;

    expect(receivedState).toEqual(expectedNextState);
  });

  test('return the proper next state given a valid action payload #3', () => {
    const actionPayload = { point: 20 };

    currentState.playerProgress.currentExp = 90;
    currentState.playerProgress.tgtExp = 100;
    currentState.playerProgress.level = 1;
    currentState.playerProgress.availableAttrPt = 0;

    const receivedState = gainExp(currentState, actionPayload);

    expectedNextState.playerProgress.currentExp = 10; // currentExp + actionPayload.point - tgtExp
    expectedNextState.playerProgress.tgtExp = 200;
    expectedNextState.playerProgress.level = 2;
    expectedNextState.playerProgress.availableAttrPt += GLOBALCONST.AVAIL_ATTR_POINT_PER_LEVEL;

    expect(receivedState).toEqual(expectedNextState);
  });

  test('return the proper next state given a valid action payload #4', () => {
    const actionPayload = { point: 350 };

    currentState.playerProgress.currentExp = 90;

    const receivedState = gainExp(currentState, actionPayload);

    expectedNextState.playerProgress.currentExp = 240;
    expectedNextState.playerProgress.tgtExp = 300;
    expectedNextState.playerProgress.level = 3;
    expectedNextState.playerProgress.availableAttrPt = GLOBALCONST.AVAIL_ATTR_POINT_PER_LEVEL * 2;

    expect(receivedState).toEqual(expectedNextState);
  });

  test('return the proper next state given a valid action payload #5', () => {
    const actionPayload = { point: 750 };

    currentState.playerProgress.currentExp = 90;

    const receivedState = gainExp(currentState, actionPayload);
    expectedNextState.playerProgress.currentExp = 540;
    expectedNextState.playerProgress.tgtExp = 400;
    expectedNextState.playerProgress.level = 4;
    expectedNextState.playerProgress.availableAttrPt = GLOBALCONST.AVAIL_ATTR_POINT_PER_LEVEL * 3;

    expect(receivedState).toEqual(expectedNextState);
  });
});
