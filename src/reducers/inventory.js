import { GLOBALCONST } from '../AppContext';
import { checkReducerActionPayloadHelper } from '../Helper';

const getItemSanityCheckingChecklist = actionPayload => {
  return [
    typeof actionPayload !== 'object',
    actionPayload === {},
    Object.prototype.hasOwnProperty.call(actionPayload, 'slotIdx') === false,
    Object.prototype.hasOwnProperty.call(actionPayload, 'emptySlotMarker') === false,
    typeof actionPayload.slotIdx !== 'number',
    actionPayload.emptySlotMarker !== GLOBALCONST.INVENTORY_EMPTY_SLOT
  ];
};

export const removeEquipmentItem = (currentState, actionPayload = {}) => {
  const payloadSanitaryCheck = checkReducerActionPayloadHelper(
    actionPayload,
    getItemSanityCheckingChecklist(actionPayload)
  );
  if (payloadSanitaryCheck !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const nextEquipmentsState = [...currentState.playerInventory.equipments];

  for (let i = 0; i < nextEquipmentsState.length; i += 1) {
    if (i === actionPayload.slotIdx) {
      nextEquipmentsState[i] = actionPayload.emptySlotMarker;
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

export const removeConsumableItem = (currentState, actionPayload = {}) => {
  const payloadSanitaryCheck = checkReducerActionPayloadHelper(
    actionPayload,
    getItemSanityCheckingChecklist(actionPayload)
  );
  if (payloadSanitaryCheck !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const nextConsumableItemsState = [...currentState.playerInventory.consumableItems];

  for (let i = 0; i < nextConsumableItemsState.length; i += 1) {
    if (i === actionPayload.slotIdx) {
      nextConsumableItemsState[i] = actionPayload.emptySlotMarker;
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

export const expandInventory = (currentState, actionPayload = {}) => {
  const returnCurrentStateConditions = [
    typeof actionPayload !== 'object',
    actionPayload === {},
    Object.prototype.hasOwnProperty.call(actionPayload, 'numSlots') === false,
    Object.prototype.hasOwnProperty.call(actionPayload, 'emptySlotMarker') === false,
    typeof actionPayload.numSlots !== 'number',
    actionPayload.numSlots !== GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET,
    actionPayload.emptySlotMarker !== GLOBALCONST.INVENTORY_EMPTY_SLOT
  ];
  const payloadSanitaryCheck = checkReducerActionPayloadHelper(
    actionPayload,
    returnCurrentStateConditions
  );
  if (payloadSanitaryCheck !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK) {
    return currentState;
  }

  const nextConsumableItemsState = [...currentState.playerInventory.consumableItems];
  const nextEquipmentsState = [...currentState.playerInventory.equipments];

  for (let i = 0; i < actionPayload.numSlots; i += 1) {
    nextConsumableItemsState.push(actionPayload.emptySlotMarker);
    nextEquipmentsState.push(actionPayload.emptySlotMarker);
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: { ...currentState.playerEquipment },
    playerInventory: {
      consumableItems: nextConsumableItemsState,
      equipments: nextEquipmentsState
    },
    money: currentState.money
  };
};
