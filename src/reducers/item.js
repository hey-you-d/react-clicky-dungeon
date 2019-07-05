import { GLOBALCONST } from '../AppContext';
import { checkReducerActionPayloadHelper } from '../Helper';

// To be called by ObtainConsumableItem & ObtainEquipment
const getPayloadSanityChecklist = actionPayload => {
  return [
    typeof actionPayload !== 'object',
    actionPayload === {},
    Object.prototype.hasOwnProperty.call(actionPayload, 'item') === false,
    Object.prototype.hasOwnProperty.call(actionPayload, 'emptySlotMarker') === false,
    typeof actionPayload.item !== 'object',
    actionPayload.item === {},
    typeof actionPayload.item.id !== 'string',
    actionPayload.item.id === '',
    typeof actionPayload.item.name !== 'string',
    actionPayload.item.name === '',
    typeof actionPayload.item.img !== 'string',
    actionPayload.item.img === '',
    !Array.isArray(actionPayload.item.point),
    actionPayload.item.point.length === 0,
    actionPayload.emptySlotMarker !== GLOBALCONST.INVENTORY_EMPTY_SLOT
  ];
};

export const obtainCoin = (currentState, actionPayload = {}) => {
  const returnCurrentStateConditions = [
    typeof actionPayload !== 'object',
    actionPayload === {},
    Object.prototype.hasOwnProperty.call(actionPayload, 'itemValue') === false,
    typeof actionPayload.itemValue !== 'number'
  ];
  const payloadSanityCheckResult = checkReducerActionPayloadHelper(
    actionPayload,
    returnCurrentStateConditions
  );
  if (payloadSanityCheckResult !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const nextState = currentState.money + actionPayload.itemValue;

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: { ...currentState.playerInventory },
    money: nextState < 0 ? 0 : nextState
  };
};

export const obtainConsumableItem = (currentState, actionPayload = {}) => {
  const payloadSanityCheckResult = checkReducerActionPayloadHelper(
    actionPayload,
    getPayloadSanityChecklist(actionPayload)
  );
  if (payloadSanityCheckResult !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const nextConsumableItemsState = [...currentState.playerInventory.consumableItems];

  for (let i = 0; i < nextConsumableItemsState.length; i += 1) {
    if (nextConsumableItemsState[i] === actionPayload.emptySlotMarker) {
      nextConsumableItemsState[i] = actionPayload.item;
      break;
    }
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: {
      consumableItems: nextConsumableItemsState,
      equipments: currentState.playerInventory.equipments
    },
    money: currentState.money
  };
};

export const obtainEquipment = (currentState, actionPayload = {}) => {
  const payloadSanityCheckResult = checkReducerActionPayloadHelper(
    actionPayload,
    getPayloadSanityChecklist(actionPayload)
  );
  if (payloadSanityCheckResult !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const nextEquipmentsState = [...currentState.playerInventory.equipments];

  for (let i = 0; i < nextEquipmentsState.length; i += 1) {
    if (nextEquipmentsState[i] === actionPayload.emptySlotMarker) {
      nextEquipmentsState[i] = actionPayload.item;
      break;
    }
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: {
      consumableItems: currentState.playerInventory.consumableItems,
      equipments: nextEquipmentsState
    },
    money: currentState.money
  };
};
