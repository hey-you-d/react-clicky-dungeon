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

export const gainExp = (currentState, actionPayload) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const currentPlayerProgress = currentState.playerProgress;

  let newPlayerLevel = currentPlayerProgress.level;
  let accumulatedPlayerExp = currentPlayerProgress.currentExp + actionPayload.point;
  let nextTgtExp = currentPlayerProgress.tgtExp;
  let accumulatedAvailableAttrPt = currentPlayerProgress.availableAttrPt;

  for (let idx = 0; idx < GLOBALCONST.LEVEL_UP_TGT_EXP_LIST.length; idx += 1) {
    if (nextTgtExp === GLOBALCONST.LEVEL_UP_TGT_EXP_LIST[idx]) {
      if (accumulatedPlayerExp >= GLOBALCONST.LEVEL_UP_TGT_EXP_LIST[idx]) {
        // level up!
        newPlayerLevel += 1;
        accumulatedAvailableAttrPt += GLOBALCONST.AVAIL_ATTR_POINT_PER_LEVEL;
        accumulatedPlayerExp -= GLOBALCONST.LEVEL_UP_TGT_EXP_LIST[idx];

        // [Level Up! label] ... [Level Indicator] ... [currentExp]/[nextTgtExp] exp
        if (idx === GLOBALCONST.LEVEL_UP_TGT_EXP_LIST.length - 1) {
          nextTgtExp = GLOBALCONST.LEVEL_UP_TGT_EXP_LIST[idx];
        } else {
          nextTgtExp = GLOBALCONST.LEVEL_UP_TGT_EXP_LIST[idx + 1];
        }
      }

      break;
    }
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: {
      explorationProgress: currentPlayerProgress.explorationProgress,
      level: newPlayerLevel,
      tgtExp: nextTgtExp,
      currentExp: accumulatedPlayerExp,
      availableAttrPt: accumulatedAvailableAttrPt,
      baseAtk: currentPlayerProgress.baseAtk,
      baseDef: currentPlayerProgress.baseDef
    },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const updateLvUpPoint = (currentState, actionPayload) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: {
      explorationProgress: currentState.playerProgress.explorationProgress,
      level: currentState.playerProgress.level,
      tgtExp: currentState.playerProgress.tgtExp,
      currentExp: currentState.playerProgress.currentExp,
      availableAttrPt: actionPayload.point,
      baseAtk: currentState.playerProgress.baseAtk,
      baseDef: currentState.playerProgress.baseDef
    },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const setBaseAtkAttr = (currentState, actionPayload) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: {
      explorationProgress: currentState.playerProgress.explorationProgress,
      level: currentState.playerProgress.level,
      tgtExp: currentState.playerProgress.tgtExp,
      currentExp: currentState.playerProgress.currentExp,
      availableAttrPt: currentState.playerProgress.availableAttrPt,
      baseAtk: actionPayload.point,
      baseDef: currentState.playerProgress.baseDef
    },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const setBaseDefAttr = (currentState, actionPayload) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: {
      explorationProgress: currentState.playerProgress.explorationProgress,
      level: currentState.playerProgress.level,
      tgtExp: currentState.playerProgress.tgtExp,
      currentExp: currentState.playerProgress.currentExp,
      availableAttrPt: currentState.playerProgress.availableAttrPt,
      baseAtk: currentState.playerProgress.baseAtk,
      baseDef: actionPayload.point
    },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const setBaseHPAttr = (currentState, actionPayload) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: {
      remainingHP: currentState.playerVitalStat.remainingHP,
      maxHP: actionPayload.point,
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

export const setBaseMPAttr = (currentState, actionPayload) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: {
      remainingHP: currentState.playerVitalStat.remainingHP,
      maxHP: currentState.playerVitalStat.maxHP,
      remainingMP: currentState.playerVitalStat.remainingMP,
      maxMP: actionPayload.point,
      remainingST: currentState.playerVitalStat.remainingST,
      maxST: currentState.playerVitalStat.maxST
    },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const setBaseSTAttr = (currentState, actionPayload) => {
  if (getPayloadSanityCheckOutput(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: {
      remainingHP: currentState.playerVitalStat.remainingHP,
      maxHP: currentState.playerVitalStat.maxHP,
      remainingMP: currentState.playerVitalStat.remainingMP,
      maxMP: currentState.playerVitalStat.maxMP,
      remainingST: currentState.playerVitalStat.remainingST,
      maxST: actionPayload.point
    },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};
