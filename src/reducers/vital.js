import { GLOBALCONST } from '../AppContext';
import { checkReducerActionPayloadHelper } from '../Helper';

const getPayloadSanityCheckOutput = actionPayload => {
  const returnCurrentStateConditions = [
    typeof actionPayload !== 'object',
    actionPayload === {},
    Object.prototype.hasOwnProperty.call(actionPayload, 'point') === false,
    typeof actionPayload.point !== 'number'
  ];
  return checkReducerActionPayloadHelper(actionPayload, returnCurrentStateConditions);
};

export const setHP = (currentState, actionPayload = {}) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const modifier = actionPayload.point;
  const candidateRemainingHP = currentState.playerVitalStat.remainingHP + modifier;
  let newRemainingHP =
    candidateRemainingHP >= currentState.playerVitalStat.maxHP
      ? currentState.playerVitalStat.maxHP
      : candidateRemainingHP;
  newRemainingHP = candidateRemainingHP <= 0 ? 0 : newRemainingHP;

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: {
      remainingHP: newRemainingHP,
      maxHP: currentState.playerVitalStat.maxHP,
      remainingMP: currentState.playerVitalStat.remainingMP,
      maxMP: currentState.playerVitalStat.maxMP,
      remainingST: currentState.playerVitalStat.remainingST,
      maxST: currentState.playerVitalStat.maxST
    },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const setMP = (currentState, actionPayload = {}) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const modifier = actionPayload.point;
  const candidateRemainingMP = currentState.playerVitalStat.remainingMP + modifier;
  let newRemainingMP =
    candidateRemainingMP >= currentState.playerVitalStat.maxMP
      ? currentState.playerVitalStat.maxMP
      : candidateRemainingMP;
  newRemainingMP = candidateRemainingMP <= 0 ? 0 : newRemainingMP;

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: {
      remainingHP: currentState.playerVitalStat.remainingHP,
      maxHP: currentState.playerVitalStat.maxHP,
      remainingMP: newRemainingMP,
      maxMP: currentState.playerVitalStat.maxMP,
      remainingST: currentState.playerVitalStat.remainingST,
      maxST: currentState.playerVitalStat.maxST
    },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const setST = (currentState, actionPayload = {}) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const modifier = actionPayload.point;
  const candidateRemainingST = currentState.playerVitalStat.remainingST + modifier;
  let newRemainingST =
    candidateRemainingST >= currentState.playerVitalStat.maxST
      ? currentState.playerVitalStat.maxST
      : candidateRemainingST;
  newRemainingST = candidateRemainingST <= 0 ? 0 : newRemainingST;

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: {
      remainingHP: currentState.playerVitalStat.remainingHP,
      maxHP: currentState.playerVitalStat.maxHP,
      remainingMP: currentState.playerVitalStat.remainingMP,
      maxMP: currentState.playerVitalStat.maxMP,
      remainingST: newRemainingST,
      maxST: currentState.playerVitalStat.maxST
    },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};
