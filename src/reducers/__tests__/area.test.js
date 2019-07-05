import startArea from '../area';
import { GLOBALCONST } from '../../AppContext';
import { assertReducerFnHelper } from '../../Helper';

describe('startArea reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    currentState.areaInfo = {
      currentAreaId: 'test',
      nextAreaId: 'test',
      areaMap: [],
      areaEnemies: [],
      areaItems: [],
      areaEquipments: [],
      areaDoors: []
    };
    expectedNextState = { ...currentState };
  });

  test('restarting the game will update the areaInfo property only', () => {
    const actionPayload = {
      mode: GLOBALCONST.GET_NEXTAREA_MODE.RESTART_GAME,
      areaInfo: { ...currentState.areaInfo }
    };

    expectedNextState.areaInfo = Object.assign({}, currentState.areaInfo);

    assertReducerFnHelper(startArea, actionPayload, currentState, expectedNextState);
  });

  test('the default GET_NEXTAREA_MODE will update both areaInfo & playerProgress.explorationProgress properties', () => {
    const actionPayload = {
      mode: GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT,
      areaInfo: { ...currentState.areaInfo }
    };

    expectedNextState.areaInfo = Object.assign({}, currentState.areaInfo);
    expectedNextState.playerProgress.explorationProgress =
      GLOBALCONST.PRELOADED_STATE.playerProgress.explorationProgress;

    assertReducerFnHelper(startArea, actionPayload, currentState, expectedNextState);
  });
});
