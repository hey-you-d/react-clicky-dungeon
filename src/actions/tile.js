export const REVEAL_A_TILE = 'REVEAL_A_TILE';
export const MARK_TILE_AS_EXPLORED = 'MARK_TILE_AS_EXPLORED';

export const revealATile = tileIdx => {
  return {
    type: REVEAL_A_TILE,
    payload: { tileIdx, newTileState: 'revealed' }
  };
};
export const markATileAsExplored = tileIdx => {
  return {
    type: MARK_TILE_AS_EXPLORED,
    payload: { tileIdx, newTileState: 'explored' }
  };
};
