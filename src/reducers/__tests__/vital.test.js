import { setHP, setMP, setST } from '../vital';
import { GLOBALCONST } from '../../AppContext';
import { assertReducerFnHelper } from '../../Helper';

describe('setHP reducer', () => {
  let currentState;
  let expectedNextState;
  let receivedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    receivedNextState = { ...currentState };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setHP, actionPayload, currentState, currentState);
    });
  });

  test('update the `remainingHP` correctly given the right payload #1', () => {
    receivedNextState = setHP(currentState, { point: 0 });
    expect(receivedNextState).toEqual(currentState);
  });

  test('update the `remainingHP` correctly given the right payload #2', () => {
    currentState.playerVitalStat.maxHP = 100;
    currentState.playerVitalStat.remainingHP = 100;
    receivedNextState = setHP(currentState, { point: -30 });
    expectedNextState.playerVitalStat.remainingHP = 70;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingHP` correctly given the right payload #3', () => {
    currentState.playerVitalStat.maxHP = 100;
    currentState.playerVitalStat.remainingHP = 70;
    receivedNextState = setHP(currentState, { point: 10 });
    expectedNextState.playerVitalStat.remainingHP = 80;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingHP` correctly given the right payload #4', () => {
    currentState.playerVitalStat.maxHP = 90;
    currentState.playerVitalStat.remainingHP = 90;
    expectedNextState.playerVitalStat.remainingHP = 0;
    receivedNextState = setHP(currentState, { point: -300 });
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingHP` correctly given the right payload #5', () => {
    currentState.playerVitalStat.maxHP = 90;
    currentState.playerVitalStat.remainingHP = 90;
    expectedNextState.playerVitalStat.remainingHP = 90;
    receivedNextState = setHP(currentState, { point: 100 });
    expect(receivedNextState).toEqual(expectedNextState);
  });
});

describe('setMP reducer', () => {
  let currentState;
  let expectedNextState;
  let receivedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    receivedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setMP, actionPayload, currentState, currentState);
    });
  });

  test('update the `remainingMP` correctly given the right payload #1', () => {
    receivedNextState = setMP(currentState, { point: 0 });
    expect(receivedNextState).toEqual(currentState);
  });

  test('update the `remainingMP` correctly given the right payload #2', () => {
    currentState.playerVitalStat.maxMP = 100;
    currentState.playerVitalStat.remainingMP = 100;
    receivedNextState = setMP(currentState, { point: -30 });
    expectedNextState.playerVitalStat.remainingMP = 70;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingMP` correctly given the right payload #3', () => {
    currentState.playerVitalStat.maxMP = 100;
    currentState.playerVitalStat.remainingMP = 70;
    receivedNextState = setMP(currentState, { point: 10 });
    expectedNextState.playerVitalStat.remainingMP = 80;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingMP` correctly given the right payload #4', () => {
    currentState.playerVitalStat.maxMP = 90;
    currentState.playerVitalStat.remainingMP = 90;
    receivedNextState = setMP(currentState, { point: -300 });
    expectedNextState.playerVitalStat.remainingMP = 0;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingMP` correctly given the right payload #5', () => {
    currentState.playerVitalStat.maxMP = 90;
    currentState.playerVitalStat.remainingMP = 0;
    receivedNextState = setMP(currentState, { point: 100 });
    expectedNextState.playerVitalStat.remainingMP = 90;
    expect(receivedNextState).toEqual(expectedNextState);
  });
});

describe('setST reducer', () => {
  let currentState;
  let expectedNextState;
  let receivedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
    receivedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [{}, { point: 'random string' }];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(setST, actionPayload, currentState, currentState);
    });
  });

  test('update the `remainingST` correctly given the right payload #1', () => {
    receivedNextState = setHP(currentState, { point: 0 });
    expect(receivedNextState).toEqual(currentState);
  });

  test('update the `remainingST` correctly given the right payload #2', () => {
    currentState.playerVitalStat.maxST = 100;
    currentState.playerVitalStat.remainingST = 100;
    receivedNextState = setST(currentState, { point: -30 });
    expectedNextState.playerVitalStat.remainingST = 70;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingST` correctly given the right payload #3', () => {
    currentState.playerVitalStat.maxST = 100;
    currentState.playerVitalStat.remainingST = 70;
    receivedNextState = setST(currentState, { point: 10 });
    expectedNextState.playerVitalStat.remainingST = 80;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingST` correctly given the right payload #4', () => {
    currentState.playerVitalStat.maxST = 100;
    currentState.playerVitalStat.remainingST = 100;
    receivedNextState = setST(currentState, { point: -300 });
    expectedNextState.playerVitalStat.remainingST = 0;
    expect(receivedNextState).toEqual(expectedNextState);
  });

  test('update the `remainingST` correctly given the right payload #5', () => {
    currentState.playerVitalStat.maxST = 90;
    currentState.playerVitalStat.remainingST = 0;
    receivedNextState = setST(currentState, { point: 100 });
    expectedNextState.playerVitalStat.remainingST = 90;
    expect(receivedNextState).toEqual(expectedNextState);
  });
});
