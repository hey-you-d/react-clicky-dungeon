import { GLOBALCONST } from '../AppContext';
import { checkReducerActionPayloadHelper } from '../Helper';

// Changing a tile's state will consume stamina because exploring the dungeon
// consumes energy.
const updateTileState = (currentState, actionPayload = {}) => {
  const returnCurrentStateConditions = [
    typeof actionPayload !== 'object',
    actionPayload === {},
    Object.prototype.hasOwnProperty.call(actionPayload, 'tileIdx') === false,
    actionPayload.tileIdx < 0,
    Object.prototype.hasOwnProperty.call(actionPayload, 'newTileState') === false,
    !['fow', 'revealed', 'explored'].includes(actionPayload.newTileState)
  ];
  const payloadSanityCheckOutput = checkReducerActionPayloadHelper(
    actionPayload,
    returnCurrentStateConditions
  );
  if (payloadSanityCheckOutput !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const currentPlayerProgressState = currentState.playerProgress.explorationProgress;
  const nextPlayerProgressState = [...currentPlayerProgressState];
  nextPlayerProgressState[actionPayload.tileIdx] = actionPayload.newTileState;

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: {
      explorationProgress: nextPlayerProgressState,
      level: currentState.playerProgress.level,
      tgtExp: currentState.playerProgress.tgtExp,
      currentExp: currentState.playerProgress.currentExp,
      availableAttrPt: currentState.playerProgress.availableAttrPt,
      baseAtk: currentState.playerProgress.baseAtk,
      baseDef: currentState.playerProgress.baseDef
    },
    playerVitalStat: {
      remainingHP: currentState.playerVitalStat.remainingHP,
      maxHP: currentState.playerVitalStat.maxHP,
      remainingMP: currentState.playerVitalStat.remainingMP,
      maxMP: currentState.playerVitalStat.maxMP,
      remainingST:
        actionPayload.newTileState !== 'fow'
          ? currentState.playerVitalStat.remainingST - GLOBALCONST.STAMINA_COST
          : currentState.playerVitalStat.remainingST,
      maxST: currentState.playerVitalStat.maxST
    },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export default updateTileState;
