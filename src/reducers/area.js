import { GLOBALCONST } from '../AppContext';
import { checkReducerActionPayloadHelper } from '../Helper';

const startArea = (currentState, actionPayload) => {
  const { areaInfo } = actionPayload;

  const returnCurrentStateConditions = [
    typeof actionPayload !== 'object',
    actionPayload === {},
    Object.prototype.hasOwnProperty.call(actionPayload, 'mode') === false,
    Object.prototype.hasOwnProperty.call(actionPayload, 'areaInfo') === false,
    Object.prototype.hasOwnProperty.call(areaInfo, 'id') === false,
    Object.prototype.hasOwnProperty.call(areaInfo, 'nextAreaId') === false,
    Object.prototype.hasOwnProperty.call(areaInfo, 'areaMap') === false,
    Object.prototype.hasOwnProperty.call(areaInfo, 'areaEnemies') === false,
    Object.prototype.hasOwnProperty.call(areaInfo, 'areaItems') === false,
    Object.prototype.hasOwnProperty.call(areaInfo, 'areaEquipments') === false,
    Object.prototype.hasOwnProperty.call(areaInfo, 'areaDoors') === false,
    ![GLOBALCONST.GET_NEXTAREA_MODE.RESTART_GAME, GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT].includes(
      actionPayload.mode
    ),
    typeof actionPayload.areaInfo.id !== 'string',
    typeof actionPayload.areaInfo.nextAreaId !== 'string',
    !Array.isArray(actionPayload.areaInfo.areaMap),
    !Array.isArray(actionPayload.areaInfo.areaEnemies),
    !Array.isArray(actionPayload.areaInfo.areaEquipments),
    !Array.isArray(actionPayload.areaInfo.areaDoors),
    actionPayload.areaInfo.id === '',
    actionPayload.areaInfo.nextAreaId === '',
    actionPayload.areaInfo.areaMap.length !== GLOBALCONST.PRELOADED_STATE.areaInfo.areaMap.length
  ];
  const sanityCheckResult = checkReducerActionPayloadHelper(
    actionPayload,
    returnCurrentStateConditions
  );
  if (sanityCheckResult !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  switch (actionPayload.mode) {
    case GLOBALCONST.GET_NEXTAREA_MODE.RESTART_GAME:
      return {
        turn: 0,
        areaInfo: {
          currentAreaId: actionPayload.areaInfo.id,
          nextAreaId: actionPayload.areaInfo.nextAreaId,
          areaMap: actionPayload.areaInfo.areaMap,
          areaEnemies: actionPayload.areaInfo.areaEnemies,
          areaItems: actionPayload.areaInfo.areaItems,
          areaEquipments: actionPayload.areaInfo.areaEquipments,
          areaDoors: actionPayload.areaInfo.areaDoors
        },
        playerProgress: GLOBALCONST.PRELOADED_STATE.playerProgress,
        playerVitalStat: GLOBALCONST.PRELOADED_STATE.playerVitalStat,
        playerEquipment: GLOBALCONST.PRELOADED_STATE.playerEquipment,
        playerInventory: GLOBALCONST.PRELOADED_STATE.playerInventory,
        money: 0
      };
    default:
      // GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT
      return {
        turn: 0,
        areaInfo: {
          currentAreaId: actionPayload.areaInfo.id,
          nextAreaId: actionPayload.areaInfo.nextAreaId,
          areaMap: actionPayload.areaInfo.areaMap,
          areaEnemies: actionPayload.areaInfo.areaEnemies,
          areaItems: actionPayload.areaInfo.areaItems,
          areaEquipments: actionPayload.areaInfo.areaEquipments,
          areaDoors: actionPayload.areaInfo.areaDoors
        },
        playerProgress: {
          explorationProgress: GLOBALCONST.PRELOADED_STATE.playerProgress.explorationProgress,
          level: currentState.playerProgress.level,
          tgtExp: currentState.playerProgress.tgtExp,
          currentExp: currentState.playerProgress.currentExp,
          availableAttrPt: currentState.playerProgress.availableAttrPt,
          baseAtk: currentState.playerProgress.baseAtk,
          baseDef: currentState.playerProgress.baseDef
        },
        playerVitalStat: { ...currentState.playerVitalStat },
        playerEquipment: { ...currentState.playerEquipment },
        playerInventory: { ...currentState.playerInventory },
        money: currentState.money
      };
  }
};

export default startArea;
