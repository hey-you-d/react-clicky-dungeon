import configureStore from 'redux-mock-store';

import { GLOBALCONST } from '../../AppContext';

import { REVEAL_A_TILE, MARK_TILE_AS_EXPLORED, revealATile, markATileAsExplored } from '../tile';

const mockStore = configureStore();
const store = mockStore(GLOBALCONST.PRELOADED_STATE);

describe('revealATile action creator', () => {
  test('Dispatches the correct action and payload', () => {
    const tileIdx = -1;
    const expectedAction = {
      type: REVEAL_A_TILE,
      payload: { tileIdx, newTileState: 'revealed' }
    };

    expect(revealATile(tileIdx)).toEqual(expectedAction);
    // alternatively
    store.dispatch(revealATile(tileIdx));
    expect(store.getActions()).toEqual([expectedAction]);
    store.clearActions();
  });
});

describe('markATileAsExplored action creator', () => {
  test('Dispatches the correct action and payload', () => {
    const tileIdx = -1;
    const expectedAction = {
      type: MARK_TILE_AS_EXPLORED,
      payload: { tileIdx, newTileState: 'explored' }
    };

    expect(markATileAsExplored(tileIdx)).toEqual(expectedAction);
    // alternatively
    store.dispatch(markATileAsExplored(tileIdx));
    expect(store.getActions()).toEqual([expectedAction]);
    store.clearActions();
  });
});
