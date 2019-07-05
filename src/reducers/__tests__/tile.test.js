import updateTileState from '../tile';
import { REVEAL_A_TILE, MARK_TILE_AS_EXPLORED } from '../../actions/tile';
import { GLOBALCONST } from '../../AppContext';
import { assertReducerFnHelper } from '../../Helper';

describe('updateTileState reducer', () => {
  let currentState;
  let expectedNextState;

  beforeEach(() => {
    currentState = { ...GLOBALCONST.PRELOADED_STATE };
    expectedNextState = { ...currentState };
  });

  test('return current state if actionPayload is not valid', () => {
    const actionPayloads = [
      {},
      { tileIdx: 0 },
      { newTileState: REVEAL_A_TILE },
      { tileIdx: 0, newTileState: 'whatever' },
      { tileIdx: -2, newTileState: REVEAL_A_TILE }
    ];

    actionPayloads.forEach(actionPayload => {
      assertReducerFnHelper(updateTileState, actionPayload, currentState, currentState);
    });
  });

  test('changing the state of a tile to any other than `fow` costs 1 stamina point', () => {
    // implementing the gameplay logic: changing the state of a tile from
    // 'fow' to either 'revealed' or 'exposed' costs 1 stamina point.
    let actionPayload = { tileIdx: 0, newTileState: REVEAL_A_TILE };
    let receivedState = updateTileState(currentState, actionPayload);
    expectedNextState.playerVitalStat.remainingST -= GLOBALCONST.STAMINA_COST;
    expectedNextState.playerProgress.explorationProgress[0] = 'revealed';
    expect(receivedState).toEqual(expectedNextState);

    actionPayload = { tileIdx: 0, newTileState: MARK_TILE_AS_EXPLORED };
    receivedState = updateTileState(currentState, actionPayload);
    expectedNextState.playerVitalStat.remainingST -= GLOBALCONST.STAMINA_COST;
    expectedNextState.playerProgress.explorationProgress[0] = 'explored';
    expect(receivedState).toEqual(expectedNextState);
  });
});
